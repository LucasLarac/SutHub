
export function capitalizeFirstLetter(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function validateFullName(nome) {
  if (!nome) return false;

  const partes = nome.trim().split(' ');
  const palavrasValidas = partes.filter(palavra => palavra.length >= 2);

  return palavrasValidas.length >= 2;
}


export function formatCpf(valor) {
  return valor
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function formatPhone(value) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/^(\(\d{2}\)\s\d)(\d{4})(\d{0,4}).*/, '$1 $2 $3')
    .trim()
    .slice(0, 17); 
}

export function formatCep(value) {
  return value
    .replace(/\D/g, '') 
    .replace(/^(\d{5})(\d)/, '$1-$2') 
    .slice(0, 9); 
}

export function formatCurrency(value) {
  const numeric = value
    .toString()
    .replace(/\D/g, '') 
    .replace(/^0+/, '') 

  const number = parseFloat(numeric) / 100

  if (isNaN(number)) return ''

  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
}




export function validateCpf(cpf) {
  if (!cpf) return false;
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}

export function validateBirthDate(dateString) {
  if (!dateString) return false;

  const birthDate = new Date(dateString);
  if (isNaN(birthDate.getTime())) return false;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }

  return age >= 18 && age <= 65;
}

