import React from 'react';
import ReactDOM from 'react-dom/client';
import {createGlobalStyle} from "styled-components";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./Redux/store";

let GlobalStyle = createGlobalStyle`
  *, body {
    padding: 0;
    margin: 0;
    text-decoration: none;
    list-style-type: none;
    font-family: "Exo 2", sans-serif;
    box-sizing: border-box;
  }

  body {
    //background-color: #2d2d2d;
    //background: linear-gradient(90deg, rgba(34,9,62,1) 0%, rgba(19,17,28,1) 35%, rgba(19,17,28,1) 65%, rgba(48,17,41,1) 100%);
    background: linear-gradient(90deg, rgba(38,13,32,1) 0%, rgba(15,12,29,1) 25%, rgba(11,0,61,1) 50%, rgba(15,12,29,1) 75%, rgba(38,13,32,1) 100%);
    //background: linear-gradient(90deg, rgba(19,17,28,1) 0%, rgba(39,10,73,1) 35%, rgba(19,17,28,1) 65%, rgba(48,17,41,1) 100%);
    color: #ABA8AC;
  }

  p, div {
    line-height: 1.7;
    word-spacing: 0.5em;
    letter-spacing: 0.5px;
  }

  *::before, *::after {
    box-sizing: border-box;
  }

  div::selection {
    background-color: #1FFFBC;
  }

  body, html {
    height: 100%;
    scroll-behavior: smooth;
  }

  a {
    text-decoration: none;

    :hover {
      color: black;
    }
  }

  ol, ul {
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar {
    width: 5px;
    background-color: #260D20;
  }
  
  ::-webkit-scrollbar-track {
    width: 5px;
    background-color: #260D20;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #a100ff;
    border-radius: 6px;
  }

`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <GlobalStyle/>
            <App />
        </Provider>
    </BrowserRouter>
);
