import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";
import { ReactQueryDemo } from "./ReactQueryDemo";
import { ReactQueryDemoUseMutation } from "./ReactQueryDemoUseMutation";
import { RTKquery } from "./RTKquery/RTKquery";
import { InvalidationUsers } from "./optimisticInvalidation/invalidationUsers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <InvalidationUsers />
    </Provider>
  </React.StrictMode>)