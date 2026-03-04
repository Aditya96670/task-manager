"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/dashboard/Header";
import AddTaskForm from "@/components/dashboard/AddTaskForm";
import SearchFilter from "@/components/dashboard/SearchFilter";
import TaskList from "@/components/dashboard/TaskList";
import Pagination from "@/components/dashboard/Pagination";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "@/services/task.service";

export default function Dashboard() {
  const router = useRouter();

  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchTasks();
  }, [search, filter, currentPage]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks(search, filter, currentPage);
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!title) {
      toast.error("Title is required");
      return;
    }

    try {
      await createTask({ title, description });
      toast.success("Task created successfully");
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleToggle = async (task: any) => {
    try {
      await updateTask(task.id, {
        completed: !task.completed,
      });
      toast.success("Task status updated");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-100 p-6 md:p-10">

      <Header onLogout={handleLogout} />

      <AddTaskForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        onAdd={handleAddTask}
      />

      <SearchFilter
        search={search}
        filter={filter}
        setSearch={setSearch}
        setFilter={setFilter}
        resetPage={() => setCurrentPage(1)}
      />

      <TaskList
        tasks={tasks}
        loading={loading}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

    </div>
  );
}