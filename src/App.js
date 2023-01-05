import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/messenger/login" element={<Login />} />
                <Route path="/messenger/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
