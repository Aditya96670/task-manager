import api from "@/lib/axios";

export const getTasks = async (
  search: string = "",
  completed: string = "",
  page: number = 1,
  limit: number = 5
) => {
  const res = await api.get("/api/tasks", {
    params: {
      search,
      completed,
      page,
      limit,
    },
  });

  return res.data;
};

export const createTask = async (data: {
  title: string;
  description?: string;
}) => {
  const res = await api.post("/api/tasks", data);
  return res.data;
};

export const updateTask = async (
  id: number,
  data: any
) => {
  const res = await api.put(`/api/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await api.delete(`/api/tasks/${id}`);
  return res.data;
};