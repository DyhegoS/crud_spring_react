import api from "./api";

export const findAll = async () => {
  const { data } = await api.get("/select");
  return data;
};

export const insert = async (person) => {
  const formData = new FormData();
  formData.append("name", person.name);
  formData.append("city", person.city);
  formData.append("img", person.img);

  const { data } = await api.post("/insert", formData);
  return data;
};

export const update = async (id, person) => {
  const { data } = await api.put(`/update/${id}`, person);
  return data;
};

export const remove = async (id) => {
  await api.delete(`/remove/${id}`);
};
