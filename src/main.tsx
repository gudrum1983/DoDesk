import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/app.tsx'
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import {BrowserRouter} from "react-router-dom";
import "./styles.scss"


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);