import api from "@/lib/axios";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/api/auth/login", data);

  localStorage.setItem("accessToken", res.data.accessToken);

  return res.data;
};