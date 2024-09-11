export function validaEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarPisPasep(pis) {
  if (pis === undefined || pis === null) {
    return false;
  }

  const pisString = pis.toString().replace(/[^\d]+/g, "");

  if (pisString.length !== 11) {
    return false;
  }

  const multiplicadores = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma = 0;

  for (let i = 0; i < 10; i++) {
    soma += parseInt(pisString[i]) * multiplicadores[i];
  }

  const resto = soma % 11;
  const digitoVerificador = resto < 2 ? 0 : 11 - resto;
  return digitoVerificador === parseInt(pisString[10]);
}
