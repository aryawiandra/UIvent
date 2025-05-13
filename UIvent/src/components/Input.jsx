const Input = ({ label, className = '', ...props }) => {
    return (
        <div>
            <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 mb-1.5 tracking-wide">
                {label}
            </label>
            <input
                className={`block w-full px-3.5 py-2.5 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all font-medium ${className}`}
                {...props}
            />
        </div>
    );
};

export default Input;