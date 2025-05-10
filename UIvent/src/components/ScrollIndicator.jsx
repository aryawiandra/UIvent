export default function ScrollIndicator({ refs, active }) {
    const sections = [refs.aboutRef, refs.featuresRef, refs.contactRef];

    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50">
            {sections.map((ref, i) => (
                <button
                    key={i}
                    onClick={() => ref.current.scrollIntoView({ behavior: "smooth" })}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        active === ["about", "features", "contact"][i]
                            ? "bg-yellow-400 scale-125"
                            : "bg-gray-500 hover:bg-yellow-300"
                    }`}
                ></button>
            ))}
        </div>
    );
}
