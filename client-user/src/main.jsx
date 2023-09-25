import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider,} from "react-router-dom";
import router from "./routers"
import { Provider } from 'react-redux';
import store from "../stores"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
    <App />
  
  </React.StrictMode>,
)
