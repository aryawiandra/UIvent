import { motion, AnimatePresence } from "framer-motion";

export default function ScrollIndicator({ refs, active, show = true }) {
    const sections = [refs.aboutRef, refs.featuresRef, refs.contactRef];
    const labels = ["About", "Features", "Contact"];

    return (
        <AnimatePresence>
            {show && (
                <motion.div 
                    className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {sections.map((ref, i) => (
                        <div key={i} className="relative group">
                            <button
                                onClick={() => ref.current.scrollIntoView({ behavior: "smooth" })}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    active === ["about", "features", "contact"][i]
                                        ? "bg-yellow-500 scale-125"
                                        : "bg-gray-300 hover:bg-yellow-400"
                                }`}
                            />
                            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-white/90 rounded-lg text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
                                {labels[i]}
                            </span>
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
