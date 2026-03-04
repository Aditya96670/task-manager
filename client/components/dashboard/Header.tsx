"use client";

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        Task Dashboard 
      </h1>

      <button
        onClick={onLogout}
        className="bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition duration-300 shadow-md"
      >
        Logout
      </button>
    </div>
  );
}