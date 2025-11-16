import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import MainPage from "./pages/main";

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
