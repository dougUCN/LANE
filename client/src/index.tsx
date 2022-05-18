import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Provider, Client, defaultExchanges, subscriptionExchange } from "urql";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createClient as createWSClient } from "graphql-ws";

import {
  EMSPage,
  RunSchedulerPage,
  ControlPanelPage,
  LoginPage,
} from "./pages";
import Navbar from "./components/Navbar";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const wsClient = createWSClient({
  url: "ws://localhost:8000/graphql/",
});

const client = new Client({
  url: "http://localhost:8000/graphql/",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => ({
        subscribe: sink => ({
          unsubscribe: wsClient.subscribe(operation, sink),
        }),
      }),
    }),
  ],
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider value={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Navigate replace to="/ems" />} />
            <Route path="ems" element={<EMSPage />} />
            <Route path="run-scheduler" element={<RunSchedulerPage />} />
            <Route path="control-panel" element={<ControlPanelPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
