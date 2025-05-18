import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/InHeader";
import Footer from "../components/Footer";
import {
  User,
  GraduationCap,
  Building2,
  Users,
  Mail,
  Check,
} from "lucide-react";

export default function Profile() {
  // State untuk form profile
  const [profile, setProfile] = useState({
    name: "Peter Parker",
    email: "peter.parker@ui.ac.id",
    major: "Physics",
    faculty: "FMIPA",
    organizations: "Stark Industries, Avengers",
    batch: "2022",
    phone: "+62 812-3456-7890",
    bio: "With great power comes great responsibility.",
    photo:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/03/spider-man-in-his-iron-spider-costume-in-spider-man-no-way-home.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <Header />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center"
            onSubmit={handleSave}
          >
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-yellow-200 shadow mb-6 object-cover"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8">
              {/* ...input fields... */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500 flex items-center gap-1">
                  <User className="w-5 h-5 text-yellow-500" /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500 flex items-center gap-1">
                  <GraduationCap className="w-5 h-5 text-yellow-500" /> Major
                </label>
                <input
                  type="text"
                  name="major"
                  value={profile.major}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500 flex items-center gap-1">
                  <Building2 className="w-5 h-5 text-yellow-500" /> Faculty
                </label>
                <input
                  type="text"
                  name="faculty"
                  value={profile.faculty}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-sm text-gray-500 flex items-center gap-1">
                  <Users className="w-5 h-5 text-yellow-500" /> Organizations
                </label>
                <input
                  type="text"
                  name="organizations"
                  value={profile.organizations}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                  placeholder="Pisahkan dengan koma, contoh: BEM, Himpunan"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Batch</label>
                <input
                  type="text"
                  name="batch"
                  value={profile.batch}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500 flex items-center gap-1">
                  <Mail className="w-5 h-5 text-yellow-500" /> Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-sm text-gray-500">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 resize-none"
                  rows={3}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md w-full max-w-xs flex items-center justify-center gap-2"
              disabled={saving}
            >
              {saving ? (
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                  }}
                  className="inline-block"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                </motion.span>
              ) : (
                "Save"
              )}
            </button>
          </motion.form>
        </div>
        {/* Notification */}
        <AnimatePresence>
          {(saving || saved) && (
            <motion.div
              initial={{ y: -40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -40, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed inset-x-0 top-8 z-50 flex justify-center"
            >
              <motion.div
                className="bg-white border border-yellow-200 shadow-lg rounded-xl px-6 py-4 flex items-center gap-3"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {saving ? (
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: "linear",
                    }}
                    className="inline-block"
                  >
                    <svg
                      className="w-6 h-6 text-yellow-500"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="bg-yellow-100 text-yellow-600 rounded-full p-2"
                  >
                    <Check className="w-6 h-6" />
                  </motion.span>
                )}
                <span className="font-semibold text-yellow-700 text-base">
                  {saving ? "Saving profile..." : "Profile saved!"}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
