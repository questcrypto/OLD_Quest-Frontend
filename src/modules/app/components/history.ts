// import { createBrowserHistory } from 'history'

// export default createBrowserHistory()

// import { createBrowserHistory } from "history";
// import ReactGA from "react-ga";
// ReactGA.initialize("G-9WWD66Z78C");
// const history = createBrowserHistory();
// history.listen((location) => {
//   const loc = location.pathname;
//   const query = location.search;
//   let queryStr = query.replace("?", "");
//   const str = loc + '?' + queryStr;
//   let strNew = str.replace("=", "");
//   // console.log(":rocket: ~ file: history.ts ~ line 14 ~ history.listen ~ strNew", queryStr)
//   ReactGA.pageview(strNew);
// });
// // workaround for initial visit
// if (
//   window.performance &&
//   performance.navigation.type === performance.navigation.TYPE_NAVIGATE
// ) {
//   ReactGA.pageview("/");
// }
// export default history;

import { createBrowserHistory } from "history";
import GA4React from "ga-4-react";

const ga4react = new GA4React('G-9WWD66Z78C');
const history = createBrowserHistory();

ga4react.initialize().then((ga4) => {
  // history.listen((location) => {
  //   const loc = location.pathname;
  //   const query = location.search;
  //   let queryStr = query.replace("?", "");
  //   const str = loc + '?' + queryStr;
  //   let strNew = str.replace("=", "");
  //   ga4.pageview(strNew);
  // });
  // // workaround for initial visit
  // if (
  //   window.performance &&
  //   performance.navigation.type === performance.navigation.TYPE_NAVIGATE
  // ) {
  //   ga4.pageview("/");
  // }

  ga4.pageview(window.location.pathname + window.location.search)
}, (err) => {
  console.error(err)
})

export default history;