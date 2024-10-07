import { createContext, useState } from "react";

export const FuncionariosContext = createContext();

export const FuncionariosProvider = ({ children }) => {
  const [acaoFuncionarios, setAcaoFuncionarios] = useState(false); // inicializando como false

  const toggleAcaoFuncionarios = () => {
    setAcaoFuncionarios((prev) => !prev); // Inverte o estado
  };

  return (
    <FuncionariosContext.Provider
      value={{ acaoFuncionarios, toggleAcaoFuncionarios }}
    >
      {children}
    </FuncionariosContext.Provider>
  );
};
