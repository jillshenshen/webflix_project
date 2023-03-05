import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {store} from './store'
import { Provider } from 'react-redux';
import { StyleSheetManager } from 'styled-components';



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StyleSheetManager disableCSSOMInjection={true}>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </StyleSheetManager>
);



  