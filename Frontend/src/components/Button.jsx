const Button = ({ children, className = '', ...props }) => {
    return (
        <button
            className={`px-4 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold tracking-wide text-sm transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 active:scale-[0.98] ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;