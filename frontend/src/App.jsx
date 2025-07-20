import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserPage from "./pages/UserPage/UserPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/user/:id' element={<UserPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
