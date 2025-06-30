import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout.jsx";
import Home from "./pages/Home.jsx";
import {Toaster} from "sonner";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import CollectionPage from "./pages/CollectionPage.js";

const App = () => {
    return (
        <BrowserRouter>
            <Toaster position={"top-right"}/>
            <Routes>
                <Route path="/" element={<UserLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path ="login" element={<Login/>}/>
                    <Route path ="register" element={<Register/>}/>
                    <Route path ="profile" element={<Profile/>}/>
                    <Route path ="collections/:collection" element={<CollectionPage/>}/>
                </Route>
                <Route>{/*Admin Layout*/}</Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App
