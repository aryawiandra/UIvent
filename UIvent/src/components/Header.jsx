import { useNavigate } from 'react-router-dom';

export default function Header({ refs }) {
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
                    onClick={() => refs?.aboutRef?.current?.scrollIntoView({ behavior: "smooth" })} 
                    className="text-gray-600 hover:text-yellow-600 transition-colors text-sm font-medium tracking-wide"
                >
                    About
                </button>
                <button 
                    onClick={() => refs?.featuresRef?.current?.scrollIntoView({ behavior: "smooth" })} 
                    className="text-gray-600 hover:text-yellow-600 transition-colors text-sm font-medium tracking-wide"
                >
                    Features
                </button>
                <button 
                    onClick={() => refs?.contactRef?.current?.scrollIntoView({ behavior: "smooth" })} 
                    className="text-gray-600 hover:text-yellow-600 transition-colors text-sm font-medium tracking-wide"
                >
                    Contact
                </button>
                <button
                    onClick={() => navigate('/events')}
                    className="text-gray-600 hover:text-yellow-600 transition-colors text-sm font-medium tracking-wide"
                >
                    Events
                </button>
                <button 
                    onClick={() => navigate('/auth')}
                    className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition-all text-sm font-semibold tracking-wide shadow-sm hover:shadow active:scale-[0.98]"
                >
                    Sign in
                </button>
            </nav>
        </header>
    );
}
