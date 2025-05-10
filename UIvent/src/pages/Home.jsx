import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ScrollIndicator from "../components/ScrollIndicator";


export default function Home() {
    const aboutRef = useRef(null);
    const featuresRef = useRef(null);
    const contactRef = useRef(null);
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("about");

    useEffect(() => {
        const sections = [
            { ref: aboutRef, name: "about" },
            { ref: featuresRef, name: "features" },
            { ref: contactRef, name: "contact" },
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const matched = sections.find(
                            (s) => s.ref.current === entry.target
                        );
                        if (matched) setActiveSection(matched.name);
                    }
                });
            },
            { threshold: 0.6 }
        );

        sections.forEach(({ ref }) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    // Background color transition logic
    const bgColor =
        activeSection === "about"
            ? "bg-[#000080]" // navy
            : activeSection === "features"
            ? "bg-[#000060]" // darker navy
            : "bg-[#000040]"; // darkest navy

    return (
        <div
            className={`h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth text-white transition-colors duration-700 ${bgColor}`}
        >
            <Header refs={{ aboutRef, featuresRef, contactRef }} />
            <ScrollIndicator refs={{ aboutRef, featuresRef, contactRef }} active={activeSection} />

            {/* About Section */}
            <section
                ref={aboutRef}
                id="about"
                className="h-screen snap-start flex flex-col justify-center items-center px-6 text-center"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-extrabold text-[#FFD700] mb-4"
                >
                    What is UIvent?
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <p className="text-lg max-w-2xl text-gray-200 mb-6">
                        UIvent is a platform designed to help student organizations at
                        Universitas Indonesia get more participants for their events.
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                        className="bg-[#FFD700] text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition-all shadow-md"
                    >
                        Get Started
                    </button>
                </motion.div>
            </section>

            {/* Features Section */}
            <section
                ref={featuresRef}
                id="features"
                className="h-screen snap-start px-6 py-20 flex flex-col justify-center"
            >
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold text-center text-white mb-12"
                >
                    Features
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
                >
                    {[
                        "Task Management",
                        "Event Scheduler",
                        "Member Coordination"
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="bg-[#001060] p-6 rounded-2xl shadow-xl hover:shadow-yellow-500/20 transition-all"
                        >
                            <h3 className="text-xl font-semibold text-[#FFD700] mb-2">
                                {feature}
                            </h3>
                            <p className="text-gray-200 text-sm">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Dolores, accusantium.
                            </p>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Contact Section */}
            <section
                ref={contactRef}
                id="contact"
                className="h-screen snap-start px-6 py-20 flex flex-col justify-center"
            >
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold text-center text-white mb-12"
                >
                    Contact Us
                </motion.h2>

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto bg-[#001060] p-8 rounded-2xl shadow-lg"
                >
                    <input type="text" placeholder="Your Name" className="input-style" />
                    <input type="email" placeholder="Email" className="input-style" />
                    <textarea
                        placeholder="Your Message"
                        rows="5"
                        className="input-style"
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-[#FFD700] text-black font-semibold px-6 py-2 rounded hover:bg-yellow-300 transition"
                    >
                        Send
                    </button>
                </motion.form>
            </section>

        </div>
    );
}
