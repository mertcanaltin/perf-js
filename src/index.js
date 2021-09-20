const api = "https://perfanalyticsx-api.herokuapp.com/analytics";
const url = window.location.href;

// TODO
const performanceTiming = window.performance.toJSON().timing;
const currentTime = new Date().valueOf();
let fcp, ttfb, windowLoad, domLoad;
let resources = window.performance.getEntriesByType("resource");

window.addEventListener("load", () => {
    startObserver();
    getPerformanceTiming();
    sendRequest();
});

const convertMsToSecond = (ms) => {
    return ms / 1000;
};

const startObserver = () => {
    if (typeof PerformanceObserver !== "function") {
        console.error("PerfanalyticsJS Error : PerformanceObserver NOT supported!");
        return;
    }

    let observer = new PerformanceObserver((entryList) => {
        fcp = convertMsToSecond(
            entryList.getEntriesByName("first-contentful-paint")[0].startTime
        );
    });

    observer.observe({ type: "paint", buffered: true });
};

let resourcesData = resources
    .filter(function (resourcesData) {
        return resourcesData.initiatorType !== "xmlhttprequest";
    })
    .map(function (resourcesData) {
        return {
            name: resourcesData.name,
            initiatorType: resourcesData.initiatorType,
            transferSize: resourcesData.transferSize,
            duration: resourcesData.duration,
        };
    });
console.log(resourcesData, "tatlı :)");

const sendRequest = () => {
    const request = setInterval(() => {
        let data = {
            url: url,
            date: performance.timeOrigin,
            timeToFirstByte: ttfb,
            firstContentfulPaint: fcp,
            domLoad: domLoad,
            windowLoad: windowLoad,
            resources: resourcesData,
        };

        console.log("PerfanalyticsJS Request Object : ", data);

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        fetch(api, options).then((response) => console.debug(response));

        clearInterval(request);
    }, 500);
};

const getPerformanceTiming = () => {
    if (!performanceTiming) {
        console.error("PerfanalyticsJS Error : Performance NOT supported!");
        return;
    }

    ttfb = convertMsToSecond(
        performanceTiming.responseStart - performanceTiming.navigationStart
    );
    domLoad = convertMsToSecond(
        performanceTiming.domContentLoadedEventEnd -
        performanceTiming.navigationStart
    );
    windowLoad = convertMsToSecond(
        currentTime - performanceTiming.navigationStart
    );
};
