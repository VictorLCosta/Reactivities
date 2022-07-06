import ReactDOM  from "react-dom/client";
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css'
import App from "./app/layout/App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

import { store, StoreContext } from "./app/stores/store";

export const history = createBrowserHistory()

const root = ReactDOM.createRoot(
    document.getElementById('app')!
)

root.render(
    <StoreContext.Provider value={store}>
        <Router history={history}>
            <App/>
        </Router>
    </StoreContext.Provider>
)