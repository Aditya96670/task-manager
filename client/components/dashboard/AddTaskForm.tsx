"use client";

interface AddTaskFormProps {
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  onAdd: () => void;
}

export default function AddTaskForm({
  title,
  description,
  setTitle,
  setDescription,
  onAdd,
}: AddTaskFormProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-5">
        Add New Task
      </h2>

      <input
        type="text"
        placeholder="Task title"
        className="w-full mb-4 p-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none transition"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task description"
        className="w-full mb-4 p-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none transition"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={onAdd}
        className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md"
      >
        Add Task
      </button>
    </div>
  );
}