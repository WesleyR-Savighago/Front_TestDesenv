import axios from "axios";

export async function addFuncionario(funcionario) {
  axios
    .post("http://localhost:8080/newFuncionario", funcionario)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Erro ao enviar os dados:", error);
    });
}

export const atualizarFuncionario = async (funcionario) => {
  await axios
    .put("http://localhost:8080/atualizaFuncionario", funcionario)
    .then((response) => {
      console.log("Sucesso:", response.data);
    })
    .catch((error) => {
      console.error("Erro ao atualizar os dados:", error);
    });
};

export const deletarFuncionario = (id) => {
  axios
    .delete("http://localhost:8080/deletaFuncionario", {
      params: { id },
    })
    .then((response) => {})
    .catch((error) => {});
};

export function getFuncionarios() {
  return axios
    .get("http://localhost:8080/listarFuncionarios")
    .then((response) => response.data)
    .catch((err) => {
      console.error("Erro ao buscar funcionários:", err);
      return [];
    });
}
