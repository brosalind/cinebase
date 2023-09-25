import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider,} from "react-router-dom";
import router from "./routers"
import store from './stores/index.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Provider store={store}>
   <RouterProvider router={router} />
   </Provider>
    <App />
  </React.StrictMode>,
)
