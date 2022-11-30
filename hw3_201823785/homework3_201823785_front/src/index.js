import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {HashRouter} from "react-router-dom";
import {legacy_createStore as createStore} from "redux";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

function reducer(state={count:0}, action){
    let newState = {...state};
    switch(action.type){
        case "/add":
            newState.count++;
            break;
        case "/minus":
            newState.count--;
            break;
        default:
            break;
    }
    return newState;
}

const store = createStore(reducer);

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <HashRouter>
              <App />
          </HashRouter>
      </Provider>
  </React.StrictMode>
);
