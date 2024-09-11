import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonComponent from "../../components/button";
import { validaEmail, validarPisPasep } from "../../Utils/validações";
import { atualizarFuncionario } from "../../service/funcionariosService";

const EditPage = ({ data }) => {
  const { id } = useParams();
  const [funcionario, setfuncionario] = useState({
    id: "",
    nome: "",
    sobrenome: "",
    email: "",
    nis: 0,
    salario: 0,
  });

  const [status, setStatus] = useState({
    status: "",
    field: "",
    mensagem: "",
  });

  const [loading, setLeading] = useState(true);

  useEffect(() => {
    setLeading(false);
    buscarFuncionario();
  }, []);

  const navigate = useNavigate();

  const gotoList = (id) => {
    navigate("/listar");
  };

  const valueInput = (e) =>
    setfuncionario({ ...funcionario, [e.target.name]: e.target.value });

  const buscarFuncionario = (Id) => {
    axios
      .get("http://localhost:8080/Funcionario", {
        params: { id },
      })
      .then((response) => {
        setfuncionario(response.data);
      })
      .catch((error) => {});
  };

  function validate(funcionario) {
    if (status.mensagem != "") {
      setStatus({
        field: "",
        status: "",
        mensagem: "",
      });
    }
    if (!validaEmail(funcionario.email)) {
      setStatus({
        field: "email",
        status: "error",
        mensagem: "Insira um Email válido",
      });

      return false;
    } else if (!validarPisPasep(funcionario.nis)) {
      setStatus({
        field: "nis",
        status: "error",
        mensagem: "Insira um PIS inválido",
      });
      return false;
    } else {
      return true;
    }
  }

  const submitAtualiza = async (e) => {
    e.preventDefault();
    if (validate(funcionario)) {
      setLeading(true);
      await atualizarFuncionario(funcionario).then((response) => {
        setLeading(false);
        gotoList();
      });
    } else {
      return;
    }
  };

  return (
    <>
      <div class="containerTitle">
        <h2>EDITAR FUNCIONÁRIO</h2>
      </div>
      <div class="container">
        <form onSubmit={submitAtualiza} class="containerForm">
          <div class="InputTextDiv">
            <label className="formLabel">
              Nome:
              <input
                class="formInput"
                type="text"
                name="nome"
                placeholder="Digite o nome"
                onChange={valueInput}
                value={funcionario.nome}
                required
              />
            </label>

            <label className="formLabelSbrn">
              Sobrenome:
              <input
                class="formInput"
                type="text"
                name="sobrenome"
                placeholder="Digite o sobrenome"
                onChange={valueInput}
                value={funcionario.sobrenome}
                required
              />
            </label>
          </div>
          <div class="InputEmailDiv">
            <label className="formLabel">
              Email:
              <input
                class="formInput"
                type="text"
                name="email"
                placeholder="Digite o Email"
                onChange={valueInput}
                value={funcionario.email}
                required
              />
            </label>
            {status.field === "email" ? <p>{status.mensagem}</p> : ""}
          </div>
          <div class="InputNumberDiv">
            <label className="formLabel">
              NIS:
              <input
                class="formInput"
                type="number"
                name="nis"
                placeholder="Digite o NIS(PES)"
                onChange={valueInput}
                value={funcionario.nis}
              />
            </label>

            <label className="formLabel">
              Salário:
              <input
                class="formInput"
                type="number"
                name="salario"
                placeholder="Digite o Salário"
                onChange={valueInput}
                value={funcionario.salario}
              />
            </label>
          </div>
          {status.field === "nis" ? <p>{status.mensagem}</p> : ""}
          <div class="container2">
            <ButtonComponent
              styleClass="button1"
              children={"Salvar"}
              type="submit"
            />
            <ButtonComponent
              type="button"
              styleClass="button1"
              children={"Cancelar"}
              onClick={() => gotoList()}
            />
          </div>
        </form>
      </div>

      {loading ? (
        <div class="containerAgd">
          <h2>AGUARDE...</h2>{" "}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default EditPage;
