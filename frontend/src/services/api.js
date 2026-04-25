import axios from "axios";

const api = axios.create({
  baseUrl: "http://localhost:8080",
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg =
      error.response?.data?.message ||
      error.response?.data ||
      "Erro desonhecido";

    alert(
      `Erro na requisição\nCódigo: ${error.response?.status}\nMensagem: ${msg}`,
    );

    return Promise.reject(error);
  },
);

export default api;
