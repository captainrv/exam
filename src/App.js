import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainComponents from "./components/mainComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
        <Provider store={store}>
          <MainComponents />
        </Provider>
    </>
  );
}

export default App;
