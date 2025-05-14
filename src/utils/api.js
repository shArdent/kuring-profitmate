import apiClient from "./axios";

export const login = async (payload) => {
  const {
    data: { data },
  } = await apiClient.post("/auth/login", payload);

  localStorage.setItem("accessToken", data.accessToken);
};

export const logout = async () => {
  const {
    data: { data },
  } = await apiClient.post("/auth/logout");

  localStorage.removeItem("accessToken");
};

export const getPeriod = async () => {
  try {
    const {
      data: { data },
    } = await apiClient.get("/period");

    return data;
  } catch (error) {
    return error;
  }
};

export const getReport = async (periodId) => {
  const {
    data: { data },
  } = await apiClient.get(`/report/${periodId}`);

  return data;
};
