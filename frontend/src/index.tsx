import ReactDOM  from "react-dom/client";
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