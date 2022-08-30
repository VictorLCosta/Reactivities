import ReactDOM  from "react-dom/client";
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import App from "./app/layout/App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import ScrollToTop from "./app/layout/ScrollToTop";

import { store, StoreContext } from "./app/stores/store";

export const history = createBrowserHistory()

const root = ReactDOM.createRoot(
    document.getElementById('app')!
)

root.render(
    <StoreContext.Provider value={store}>
        <Router history={history}>
            <ScrollToTop />
            <App/>
        </Router>
    </StoreContext.Provider>
)