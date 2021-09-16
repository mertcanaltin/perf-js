// Variables
const api = "http://localhost:3000/analytics";
const url = window.location.href;
const performanceTiming = window.performance.toJSON().timing;
const currentTime = new Date().valueOf();
const createdDate = new Date().toISOString();
var fcp, ttfb, windowLoad, domLoad;
var resources = window.performance.getEntriesByType("resource");
var resourcesData;

window.addEventListener("load", () => {
  startObserver();
  getPerformanceTiming();
  resource();
  displayResources();
  sendRequest();
});


// Converting ms to seconds
const convertMsToSecond = (ms) => {
  return ms / 1000;
};

// FCP metric to observe (https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)
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

const resource = () => {
  resources.forEach((resource) => {
    (resourcesData = {
      fileName: resource.name,
      initiatorType: resource.initiatorType,
      transferSize: resource.transferSize,
      duration: resource.duration,
    }),
      console.log(resourcesData);
  });
};

const sendRequest = () => {
  const request = setInterval(() => {
    let data = {
      url: url,
      date: performance.timeOrigin, //first created date
      createdDate: createdDate,
      timeToFirstByte: ttfb, // Time to first byte
      firstContentfulPaint: fcp, // First contentful paint
      domLoad: domLoad,
      windowLoad: windowLoad,
      resources: [resourcesData],
    };

    console.log("PerfanalyticsJS Request Object : ", data);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(api, options).then((response) => console.debug(response));

    clearInterval(request);
  }, 500); // This interval has been set because the PerformanceObserver runs after the window is loaded
};

//console
// Retrieving and analysing of detailed network timing data regarding the loading of an application's resources
const displayResources = () => {
  if (!window.performance) {
    console.error("PerfanalyticsJS Error : Performance NOT supported!");
    return;
  }
  console.log("PerfanalyticsJS Resource Data : ");

  resources.forEach((resource) => {
    console.log(
      "Resource - Name : " +
        resource.name +
        " | Type : " +
        resource.initiatorType
    );
    console.log(
      "Response time = " +
        convertMsToSecond(resource.responseEnd - resource.responseStart)
    );
    console.log(
      "Request start until response end time = " +
        convertMsToSecond(
          resource.requestStart > 0
            ? resource.responseEnd - resource.requestStart
            : "0"
        )
    );
    console.log(
      "Fetch until response end time = " +
        convertMsToSecond(
          resource.fetchStart > 0
            ? resource.responseEnd - resource.fetchStart
            : "0"
        )
    );
    console.log(
      "Start until response end time = " +
        convertMsToSecond(
          resource.startTime > 0
            ? resource.responseEnd - resource.startTime
            : "0"
        )
    );
  });
};

// Calculating performance-related information for the current page
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