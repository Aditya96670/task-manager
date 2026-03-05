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
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-700 py-12 bg-white rounded-2xl border border-dashed border-gray-300">
        <p className="text-lg">No tasks found. Add a task to get started!</p>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-700 border-red-200";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "LOW":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="grid gap-6">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2
                  className={`text-xl font-bold ${task.completed ? "line-through text-gray-400" : "text-gray-900"
                    }`}
                >
                  {task.title}
                </h2>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority || "MEDIUM"}
                </span>
              </div>

              <p className={`text-gray-600 mb-4 ${task.completed ? "text-gray-400" : ""}`}>
                {task.description || "No description provided."}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold border ${task.completed
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-orange-50 text-orange-700 border-orange-200"
                    }`}
                >
                  {task.completed ? "✓ Completed" : "○ In Progress"}
                </span>

                {task.dueDate && (
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    📅 Due: {formatDate(task.dueDate)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 self-end md:self-start">
              <button
                onClick={() => onToggle(task)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${task.completed
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-green-600 text-white hover:bg-green-700"
                  }`}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="bg-red-50 text-red-600 p-2 rounded-xl hover:bg-red-100 transition border border-red-100"
                title="Delete Task"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}