import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/OutHeader";
import axios from "axios";

const tabList = [
  { value: "login", label: "Sign In" },
  { value: "register", label: "Create Account" },
];

const AuthPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [prevTab, setPrevTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: false,
    terms: false,
  });

  // Untuk animasi underline
  const tabIndex = tabList.findIndex((t) => t.value === tab);

  // Untuk animasi isi form
  const direction = tab === "login" && prevTab === "register" ? -1 : 1;

  const handleTabChange = (value) => {
    setPrevTab(tab);
    setTab(value);
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === "login") {
      navigate("/events");
    }
  };

  // Animasi untuk underline selector
  const underlineMotion = {
    left: `${tabIndex * 50}%`,
  };

  // Animasi isi form (vertical)
  const verticalMotion = {
    initial: (direction) => ({
      opacity: 0,
      y: direction > 0 ? 40 : -40,
      filter: "blur(4px)",
    }),
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
    },
    exit: (direction) => ({
      opacity: 0,
      y: direction > 0 ? -40 : 40,
      filter: "blur(4px)",
      transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  return (
    <div className="min-h-screen w-screen overflow-y-auto no-scrollbar bg-gradient-to-br from-yellow-50 to-white flex flex-col items-center justify-center p-4">
      <Header />
      <div className="w-full max-w-md">
        {/* Logo & Tabs (fixed height, no movement) */}
        <div className="bg-white rounded-t-2xl shadow-lg overflow-hidden">
          <div
            className="flex flex-col items-center pt-8"
            style={{ minHeight: 110 }}
          >
            <div
              className="flex justify-center items-center cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xl tracking-tight mr-2 group-hover:bg-yellow-600 transition-colors">
                UI
              </div>
              <span className="text-2xl font-extrabold text-yellow-600 tracking-tight group-hover:text-yellow-700 transition-colors">
                UIvent
              </span>
            </div>
            <div className="w-full mt-6 relative">
              <Tabs.Root value={tab} onValueChange={handleTabChange}>
                <Tabs.List className="flex border-b relative">
                  {tabList.map((t) => (
                    <Tabs.Trigger
                      key={t.value}
                      value={t.value}
                      className={`flex-1 py-4 text-sm tracking-wide transition-colors relative z-10 ${
                        tab === t.value
                          ? "text-yellow-600 font-semibold"
                          : "text-gray-500 hover:text-yellow-500 font-medium"
                      }`}
                      style={{ background: "transparent" }}
                    >
                      {t.label}
                    </Tabs.Trigger>
                  ))}
                  {/* Animated underline */}
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-yellow-500 rounded z-0"
                    style={underlineMotion}
                  />
                </Tabs.List>
              </Tabs.Root>
            </div>
          </div>
        </div>
        {/* Form content, only expands downward */}
        <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden">
          <Tabs.Root value={tab} onValueChange={handleTabChange}>
            <div className="p-8 min-h-[340px]">
              <AnimatePresence mode="wait" custom={direction}>
                {tab === "login" && (
                  <Tabs.Content value="login" forceMount>
                    <motion.form
                      key="login"
                      custom={direction}
                      variants={verticalMotion}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        id="login-email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Password"
                        name="password"
                        type="password"
                        id="login-password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="rememberMe"
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-gray-600 font-medium"
                          >
                            Remember me
                          </label>
                        </div>
                        <a
                          href="#"
                          className="text-sm text-yellow-600 hover:text-yellow-500 font-medium"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <Button type="submit" className="w-full">
                        Sign in
                      </Button>
                    </motion.form>
                  </Tabs.Content>
                )}
                {tab === "register" && (
                  <Tabs.Content value="register" forceMount>
                    <motion.form
                      key="register"
                      custom={direction}
                      variants={verticalMotion}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <Input
                        label="Full Name"
                        name="name"
                        type="text"
                        id="register-name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        id="register-email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Password"
                        name="password"
                        type="password"
                        id="register-password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <div className="flex items-center">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          checked={formData.terms}
                          onChange={handleChange}
                          className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                          required
                        />
                        <label
                          htmlFor="terms"
                          className="ml-2 block text-sm text-gray-600 font-medium"
                        >
                          I agree to the terms
                        </label>
                      </div>
                      <Button type="submit" className="w-full">
                        Create Account
                      </Button>
                    </motion.form>
                  </Tabs.Content>
                )}
              </AnimatePresence>
            </div>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;