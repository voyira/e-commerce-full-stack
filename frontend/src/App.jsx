import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserLayout/>}></Route>
                {/*User Layout*/}
                <Route>{/*Admin Layout*/}</Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App
