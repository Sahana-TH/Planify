import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getUserProfile();
        setProfile(data);
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border p-8 text-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {profile?.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {profile?.email}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Member since{" "}
            {new Date(profile?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
            {[
              { label: "Total Tasks", value: "📋" },
              { label: "Completed", value: "✅" },
              { label: "Pending", value: "⏳" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-2xl">{item.value}</p>
                <p className="text-gray-500 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="mt-8 text-left space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span>👤</span>
              <div>
                <p className="text-xs text-gray-400">Full Name</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {profile?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span>📧</span>
              <div>
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {profile?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <span>🆔</span>
              <div>
                <p className="text-xs text-gray-400">User ID</p>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {profile?._id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
