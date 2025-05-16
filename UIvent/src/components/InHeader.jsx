import { useNavigate } from 'react-router-dom';

export default function InHeader({ refs, user }) {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-lg tracking-tight">
                    UI
                </div>
                <div className="text-yellow-600 font-extrabold tracking-tight text-xl">UIvent</div>
            </div>
            <nav className="flex gap-6 items-center">
                <button
                    onClick={() => navigate('/profile')}
                    className="text-yellow-600 font-semibold hover:underline text-sm tracking-wide"
                >
                    Profile
                </button>
                <button
                    onClick={() => navigate('/events')}
                    className="text-yellow-600 font-semibold hover:underline text-sm tracking-wide"
                >
                    Events
                </button>
                <button
                    onClick={() => navigate('/bookmarks')}
                    className="text-yellow-600 font-semibold hover:underline text-sm tracking-wide"
                >
                    Bookmarks
                </button>
                <div
                    onClick={() => navigate('/')}
                    className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold text-sm tracking-wide px-4 py-2 rounded-lg cursor-pointer transition"
                >
                    Sign Out
                </div>
            </nav>
        </header>
    );
}