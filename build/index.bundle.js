/*!
 * 
 *   Copyright (c) mertcanaltin and project contributors.
 *
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.PerfJs=t():e.PerfJs=t()}(self,(function(){return(()=>{var e,t,n,r,o=window.location.href,i=window.performance.toJSON().timing,a=(new Date).valueOf(),f=window.performance.getEntriesByType("resource");window.addEventListener("load",(function(){c(),d(),p()}));var s=function(e){return e/1e3},c=function(){"function"==typeof PerformanceObserver?new PerformanceObserver((function(t){e=s(t.getEntriesByName("first-contentful-paint")[0].startTime)})).observe({type:"paint",buffered:!0}):console.error("PerfanalyticsJS Error : PerformanceObserver NOT supported!")},u=f.filter((function(e){return"xmlhttprequest"!==e.initiatorType})).map((function(e){return{name:e.name,initiatorType:e.initiatorType,transferSize:e.transferSize,duration:e.duration}}));console.log(u,"tatlı :)");var p=function(){var i=setInterval((function(){var a={url:o,date:performance.timeOrigin,timeToFirstByte:t,firstContentfulPaint:e,domLoad:r,windowLoad:n,resources:u};console.log("PerfanalyticsJS Request Object : ",a);var f={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)};fetch("https://perfanalyticsx-api.herokuapp.com/analytics",f).then((function(e){return console.debug(e)})),clearInterval(i)}),500)},d=function(){i?(t=s(i.responseStart-i.navigationStart),r=s(i.domContentLoadedEventEnd-i.navigationStart),n=s(a-i.navigationStart)):console.error("PerfanalyticsJS Error : Performance NOT supported!")};return{}})()}));