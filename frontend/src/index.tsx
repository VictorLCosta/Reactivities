import ReactDOM  from "react-dom/client";
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css'
import App from "./app/layout/App";
import { BrowserRouter } from "react-router-dom";

import { store, StoreContext } from "./app/stores/store";

const root = ReactDOM.createRoot(
    document.getElementById('app')!
)

root.render(
    <StoreContext.Provider value={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StoreContext.Provider>
)