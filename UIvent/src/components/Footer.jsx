import { useNavigate } from "react-router-dom";

const Footer = ({ refs }) => {
    const navigate = useNavigate();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xl">
                                UI
                            </div>
                            <span className="text-2xl font-bold text-yellow-500">UIvent</span>
                        </div>
                        <p className="text-gray-400 max-w-md">
                            Making student events at Universitas Indonesia more accessible and organized.
                            Connect, participate, and never miss out on campus activities.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-yellow-500 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {refs && (
                                <>
                                    <li>
                                        <button onClick={() => refs.aboutRef.current.scrollIntoView({ behavior: 'smooth' })} 
                                            className="text-gray-400 hover:text-yellow-500 transition-colors">
                                            About
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => refs.featuresRef.current.scrollIntoView({ behavior: 'smooth' })}
                                            className="text-gray-400 hover:text-yellow-500 transition-colors">
                                            Features
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => refs.contactRef.current.scrollIntoView({ behavior: 'smooth' })}
                                            className="text-gray-400 hover:text-yellow-500 transition-colors">
                                            Contact
                                        </button>
                                    </li>
                                </>
                            )}
                            <li>
                                <button onClick={() => navigate('/events')}
                                    className="text-gray-400 hover:text-yellow-500 transition-colors">
                                    Events
                                </button>
                            </li>
                            <li>
                                <button onClick={() => navigate('/auth')}
                                    className="text-gray-400 hover:text-yellow-500 transition-colors">
                                    Sign In
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-yellow-500 mb-4">Contact Info</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-400">
                                <span className="block">Email:</span>
                                <a href="mailto:support@uivent.com" className="text-yellow-500 hover:text-yellow-400">
                                    support@uivent.com
                                </a>
                            </li>
                            <li className="text-gray-400">
                                <span className="block">Location:</span>
                                <span className="text-gray-300">Universitas Indonesia, Depok</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <p className="text-center text-gray-500">
                        © {new Date().getFullYear()} UIvent. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;