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
  const {
    data: { data },
  } = await apiClient.get("/period");

  return data;
};

export const getReport = async (periodId) => {
  const {
    data: { data },
  } = await apiClient.get(`/report/a/${periodId}`);

  return data;
};

export const postTransaction = async (trxData) => {
  const {
    data: { data },
  } = await apiClient.post("/transaction", trxData);

  return data;
};

export const getTransactions = async (periodId) => {
  const {
    data: { data },
  } = await apiClient.get(`/transaction/a/${periodId}`);

  return data;
};
