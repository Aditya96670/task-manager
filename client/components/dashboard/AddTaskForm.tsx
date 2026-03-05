"use client";

interface AddTaskFormProps {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setPriority: (value: string) => void;
  setDueDate: (value: string) => void;
  onAdd: () => void;
}

export default function AddTaskForm({
  title,
  description,
  priority,
  dueDate,
  setTitle,
  setDescription,
  setPriority,
  setDueDate,
  onAdd,
}: AddTaskFormProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-5">
        Add New Task
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          className="w-full p-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task description"
          className="w-full p-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-400 outline-none transition"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={onAdd}
          className="w-full md:w-auto bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md font-semibold"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}