"use client";

interface TaskListProps {
  tasks: any[];
  loading: boolean;
  onToggle: (task: any) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({
  tasks,
  loading,
  onToggle,
  onDelete,
}: TaskListProps) {
  if (loading) {
    return <p className="text-gray-900">Loading...</p>;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-700 py-12">
        <p className="text-lg">No tasks found </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300"
        >
          <h2
            className={`text-lg font-semibold mb-2 ${
              task.completed
                ? "line-through text-gray-400"
                : "text-gray-900"
            }`}
          >
            {task.title}
          </h2>

          <p className="text-gray-700 mb-4">
            {task.description}
          </p>

          <div className="flex justify-between items-center">
            <span
              className={`text-xs px-4 py-1 rounded-full font-medium ${
                task.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>

            <div className="flex gap-3">
              <button
                onClick={() => onToggle(task)}
                className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition"
              >
                {task.completed
                  ? "Mark Pending"
                  : "Mark Complete"}
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}