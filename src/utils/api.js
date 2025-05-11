import apiClient from "./axios";

export const login = async (payload) => {
  const {
    data: { data },
  } = await apiClient.post("/auth/login", payload);

  localStorage.setItem("accessToken", data.accessToken);
};
