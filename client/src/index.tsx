import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider, Client, defaultExchanges, gql } from "urql";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const client = new Client({
  url: "http://localhost:8000/graphql/",
  exchanges: defaultExchanges,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Test query to make sure connection with graphql endpoint works
// TODO: Remove this block once we have a working integration test
client
  .query(
    gql`
      query {
        listHistograms
      }
    `,
  )
  .toPromise()
  // eslint-disable-next-line no-console
  .then(result => console.log(result));
