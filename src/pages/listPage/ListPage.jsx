import style from "./style.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFuncionarios } from "../../service/funcionariosService";
import ButtonComponent from "../../components/button";

import CardFuncionario from "../../components/cardFuncionario";

const ListPage = ({ data }) => {
  const [funcionarios, setFuncionarios] = useState([]);

  const navigate = useNavigate();

  const gotoCadastrar = () => {
    navigate("/");
  };

  function atualizarPagina() {
    window.location.reload();
  }

  useEffect(() => {
    const buscarFuncionarios = async () => {
      try {
        const data = await getFuncionarios();
        setFuncionarios(data);
      } catch (error) {
      } finally {
      }
    };

    buscarFuncionarios();
  }, []);

  return (
    <div>
      <div class="containerTitle">
        <h2>Lista de Funcionarios</h2>
      </div>
      <div class="containerListCard">
        {funcionarios.length > 0 ? (
          funcionarios.map((funcionario) => (
            <div key={funcionario.id}>
              <CardFuncionario funcionario={funcionario} />
            </div>
          ))
        ) : (
          <p>Nenhum funcionário encontrado.</p>
        )}
        <ButtonComponent
          type="button"
          children={"Novo"}
          styleClass="buttonCadastro"
          onClick={() => gotoCadastrar()}
        />
        <ButtonComponent
          type="button"
          children={"Atualizar"}
          styleClass="buttonListar"
          onClick={() => atualizarPagina()}
        />
      </div>
    </div>
  );
};

export default ListPage;
