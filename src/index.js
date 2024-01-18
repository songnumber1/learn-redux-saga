import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer, { rootSaga } from "./modules";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";

const customHistory = createBrowserHistory({
  forceRefresh: true,
});
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
}); // 사가 미들웨어를 만듭니다.

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware, logger))
); // 여러개의 미들웨어를 적용 할 수 있습니다.

sagaMiddleware.run(rootSaga); // 루트 사가를 실행해줍니다.

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
