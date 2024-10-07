import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeView.css";
import { addFuncionario } from "../../service/funcionariosService";
import ButtonComponent from "../../components/button";
import { validaEmail, validarPisPasep } from "../../Utils/validações";
import { useContext } from "react";
import { FuncionariosContext } from "../../context/FuncionariosContext";

function HomeView() {
  const { acaoFuncionarios, toggleAcaoFuncionarios } =
    useContext(FuncionariosContext);
  const navigate = useNavigate();

  const gotoList = () => {
    navigate("/listar");
  };

  const [funcionario, setFuncionario] = useState({
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

  const [loading, setLeading] = useState(false);

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

  const submitFuncionario = async (e) => {
    e.preventDefault();
    if (validate(funcionario)) {
      setLeading(true);
      await addFuncionario(funcionario).then((response) => {
        setLeading(false);
        toggleAcaoFuncionarios();
        gotoList();
      });
    } else {
      return;
    }
  };

  const valueInput = (e) =>
    setFuncionario({ ...funcionario, [e.target.name]: e.target.value });

  return (
    <>
      <div class="containerTitle">
        <h2>CADASTRO DE FUNCIONÁRIO</h2>
      </div>
      <div class="container">
        <form onSubmit={submitFuncionario} class="containerForm">
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
                value={funcionario.sobreme}
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
              styleClass="button2"
              children={"Listar Funcionarios"}
              onClick={() => gotoList()}
            />
          </div>
        </form>
        {loading ? (
          <div class="containerAgd">
            <h2>AGUARDE...</h2>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default HomeView;
