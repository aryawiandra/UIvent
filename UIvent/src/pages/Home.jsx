import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/OutHeader";
import Footer from "../components/Footer";
import ScrollIndicator from "../components/ScrollIndicator";

export default function Home() {
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("about");
  const [showIndicators, setShowIndicators] = useState(true);

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

    // Footer visibility observer
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setShowIndicators(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      footerObserver.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Header refs={{ aboutRef, featuresRef, contactRef }} />
      <ScrollIndicator
        refs={{ aboutRef, featuresRef, contactRef }}
        active={activeSection}
        show={showIndicators}
      />

      {/* Main content with snap scrolling */}
      <div
        className="flex-1 overflow-y-auto no-scrollbar snap-y snap-mandatory"
        style={{ scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {/* About Section */}
        <section
          ref={aboutRef}
          id="about"
          className="min-h-screen snap-start flex flex-col justify-center items-center px-6 bg-gradient-to-br from-yellow-50 to-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-extrabold text-yellow-600 mb-4 tracking-tight"
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
            <p className="text-lg max-w-2xl text-gray-700 mb-8 leading-relaxed text-center">
              UIvent is your go-to platform for discovering and giving exposure student for your events at Universitas Indonesia. Connect with organizations, discover exciting opportunities, and never miss out on campus activities.
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="bg-yellow-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-yellow-600 transition-all shadow-lg hover:shadow-yellow-200 transform hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </motion.div>
        </section>

        {/* Features Section */}
        <section
          ref={featuresRef}
          id="features"
          className="min-h-screen snap-start flex flex-col justify-center px-6 py-16 bg-gradient-to-br from-yellow-100/70 to-white"
        >
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center text-yellow-600 mb-16"
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
              {
                title: "Event Discovery",
                description:
                  "Find and join campus events that match your interests. Stay updated with the latest activities.",
                icon: "🎯",
              },
              {
                title: "Easy Registration",
                description:
                  "Register for events with just a few clicks. Manage your event calendar effortlessly.",
                icon: "📝",
              },
              {
                title: "Community Connect",
                description:
                  "Connect with student organizations and fellow participants. Build your campus network.",
                icon: "🤝",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all group hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-yellow-600 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Contact Section */}
        <section
          ref={contactRef}
          id="contact"
          className="min-h-screen snap-start flex flex-col justify-center bg-gradient-to-br from-white to-yellow-50/50"
        >
          <div className="w-full max-w-7xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-5xl font-bold text-yellow-600 tracking-tight">
                  Contact Us
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Have questions about UIvent? We'd love to hear from you. Send
                  us a message and we'll respond as soon as possible.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Email Us
                      </h3>
                      <p className="text-gray-600">support@uivent.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Location
                      </h3>
                      <p className="text-gray-600">
                        Universitas Indonesia, Depok
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right side - Contact form */}
              <motion.form
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 text-white font-semibold px-6 py-4 rounded-xl hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Send Message
                  </button>
                </div>
              </motion.form>
            </div>
          </div>
        </section>
        {/* Footer as last snap section */}
        <section
          ref={footerRef}
          className="snap-end flex flex-col justify-end"
          style={{
            scrollSnapAlign: "end",
            minHeight: "200px",
            background: "linear-gradient(to top, #fffbe8, #fff0)",
          }}
        >
          <Footer refs={{ aboutRef, featuresRef, contactRef }} />
        </section>
      </div>
    </div>
  );
}