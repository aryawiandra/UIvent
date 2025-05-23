import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AuthPage from '../pages/AuthPage';
import Events from '../pages/Events';
import EventDetails from '../pages/EventDetails';
import AdminDashboard from '../pages/AdminDashboard';
import Profile from "../pages/Profile";
import Bookmarks from "../pages/Bookmarks";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/bookmarks" element={<Bookmarks />} /> 
            </Routes>
        </Router>
    );
}