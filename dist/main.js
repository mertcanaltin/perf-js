/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Variables\nvar api = \"https://perfanalyticsx-api.herokuapp.com/analytics\";\nvar url = window.location.href;\nvar performanceTiming = window.performance.toJSON().timing;\nvar currentTime = new Date().valueOf();\nvar createdDate = moment(now).format('YYYY-MM-DD');\nvar fcp, ttfb, windowLoad, domLoad; // Converting ms to seconds\n\nvar convertMsToSecond = function convertMsToSecond(ms) {\n  return ms / 1000;\n}; // FCP metric to observe (https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)\n\n\nvar startObserver = function startObserver() {\n  if (typeof PerformanceObserver !== \"function\") {\n    console.error(\"PerfanalyticsJS Error : PerformanceObserver NOT supported!\");\n    return;\n  }\n\n  var observer = new PerformanceObserver(function (entryList) {\n    fcp = convertMsToSecond(entryList.getEntriesByName(\"first-contentful-paint\")[0].startTime);\n  });\n  observer.observe({\n    type: \"paint\",\n    buffered: true\n  });\n};\n\nvar sendRequest = function sendRequest() {\n  var request = setInterval(function () {\n    var data = {\n      createDate: createdDate,\n      //first created date\n      url: url,\n      date: performance.timeOrigin,\n      ttfb: ttfb,\n      // Time to first byte\n      fcp: fcp,\n      // First contentful paint\n      domLoad: domLoad,\n      windowLoad: windowLoad\n    };\n    console.log(\"PerfanalyticsJS Request Object : \", data);\n    var options = {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n      },\n      body: JSON.stringify(data)\n    };\n    fetch(api, options).then(function (response) {\n      return console.debug(response);\n    });\n    clearInterval(request);\n  }, 500); // This interval has been set because the PerformanceObserver runs after the window is loaded\n}; // Retrieving and analysing of detailed network timing data regarding the loading of an application's resources\n\n\nvar displayResources = function displayResources() {\n  if (!window.performance) {\n    console.error(\"PerfanalyticsJS Error : Performance NOT supported!\");\n    return;\n  }\n\n  var resources = window.performance.getEntriesByType(\"resource\");\n  console.log(\"PerfanalyticsJS Resource Data : \");\n  resources.forEach(function (resource) {\n    console.log(\"Resource - Name : \" + resource.name + \" | Type : \" + resource.initiatorType);\n    console.log(\"-- Response time = \" + convertMsToSecond(resource.responseEnd - resource.responseStart));\n    console.log(\"-- Request start until response end time = \" + convertMsToSecond(resource.requestStart > 0 ? resource.responseEnd - resource.requestStart : \"0\"));\n    console.log(\"-- Fetch until response end time = \" + convertMsToSecond(resource.fetchStart > 0 ? resource.responseEnd - resource.fetchStart : \"0\"));\n    console.log(\"-- Start until response end time = \" + convertMsToSecond(resource.startTime > 0 ? resource.responseEnd - resource.startTime : \"0\"));\n  });\n}; // Calculating performance-related information for the current page\n\n\nvar getPerformanceTiming = function getPerformanceTiming() {\n  if (!performanceTiming) {\n    console.error(\"PerfanalyticsJS Error : Performance NOT supported!\");\n    return;\n  }\n\n  ttfb = convertMsToSecond(performanceTiming.responseStart - performanceTiming.navigationStart);\n  domLoad = convertMsToSecond(performanceTiming.domContentLoadedEventEnd - performanceTiming.navigationStart);\n  windowLoad = convertMsToSecond(currentTime - performanceTiming.navigationStart);\n};\n\nwindow.addEventListener(\"load\", function () {\n  startObserver();\n  getPerformanceTiming();\n  displayResources();\n  sendRequest();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });