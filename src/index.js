import React from "react";
import ReactDOM from "react-dom";
import "./App/layout/Style.css";
import App from "./App/layout/App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { configuration } from "./App/store/ConfigureStore";
import ScrollToTop from "./App/layout/ScrollToTop";
import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

const rootEl = document.getElementById("root");
const store = configuration();

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="bottom-right"
          getState={(state) => state.toastr}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
        <App />
      </BrowserRouter>
    </Provider>,
    rootEl
  );
}

if (module.hot) {
  module.hot.accept("./App/layout/App", function () {
    setTimeout(render);
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
