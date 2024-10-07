import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletarFuncionario } from "../../service/funcionariosService";
import style from "./style.css";
import ButtonComponent from "../button";
import { useContext } from "react";
import { FuncionariosContext } from "../../context/FuncionariosContext";

const CardFuncionario = ({ funcionario }) => {
  const { acaoFuncionarios, toggleAcaoFuncionarios } =
    useContext(FuncionariosContext);
  const navigate = useNavigate();
  const gotoEditar = (id) => {
    navigate("/editar/" + id);
  };

  function deletar() {
    toggleAcaoFuncionarios();
    deletarFuncionario(funcionario.id);
  }

  function editar() {
    toggleAcaoFuncionarios();
    gotoEditar(funcionario.id);
  }

  return (
    <div class="containerbackG">
      <div class="containerCard">
        <div class="containerCard">
          <div className="containerCard2">
            <div className="containerValues">
              <span class="spanLabel">Id:</span>
              <span class="spanText">{funcionario.id}</span>
            </div>
            <div className="containerValues">
              <span class="spanLabel">Nome:</span>
              <span class="spanText">{funcionario.nome}</span>
            </div>
            <div className="containerValues">
              <span class="spanLabel">Sobrenome:</span>
              <span class="spanText">{funcionario.sobrenome}</span>
            </div>
          </div>
          <div class="containerCard2">
            <div className="containerValues">
              <span class="spanLabel">Email:</span>
              <span class="spanText">{funcionario.email}</span>
            </div>
            <div className="containerValues">
              <span class="spanLabel">NIS:</span>
              <span class="spanText">{funcionario.nis}</span>
            </div>
            <div className="containerValues">
              <span class="spanLabel">Salário:</span>
              <span class="spanText">{funcionario.salario}</span>
            </div>
          </div>
        </div>
      </div>
      <ButtonComponent
        children={"Editar"}
        styleClass="buttonEditar"
        type="button"
        onClick={() => editar()}
      />
      <ButtonComponent
        children={"Excluir"}
        styleClass="buttonExcluir"
        type="button"
        onClick={() => deletar()}
      />
    </div>
  );
};

export default CardFuncionario;
