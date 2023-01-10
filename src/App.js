import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Messenger from './components/Messenger';
import ProtectRoute from './components/ProtectRoute';
import Register from './components/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/messenger/login" element={<Login />} />
                <Route path="/messenger/register" element={<Register />} />
                <Route path="/" element={<ProtectRoute />}>
                    <Route path="/" element={<Messenger />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
