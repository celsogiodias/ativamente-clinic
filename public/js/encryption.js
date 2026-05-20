// ====== ENCRYPTION FUNCTIONS ======
function criptografar(dados, chave) {
  let resultado = '';
  for (let i = 0; i < dados.length; i++) {
    const charCode = dados.charCodeAt(i);
    const chaveCode = chave.charCodeAt(i % chave.length);
    resultado += String.fromCharCode(charCode ^ chaveCode);
  }
  return btoa(resultado);
}

function descriptografar(dadosCriptografados, chave) {
  let resultado = '';
  const dados = atob(dadosCriptografados);
  for (let i = 0; i < dados.length; i++) {
    const charCode = dados.charCodeAt(i);
    const chaveCode = chave.charCodeAt(i % chave.length);
    resultado += String.fromCharCode(charCode ^ chaveCode);
  }
  return resultado;
}

async function gerarHashSHA256(dados) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(dados);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function validarIntegridade(dados, hash) {
  const hashCalculado = await gerarHashSHA256(dados);
  return hashCalculado === hash;
}

function criptografarCPF(cpf, chave) {
  const cpfLimpo = cpf.replace(/\D/g, '');
  return criptografar(cpfLimpo, chave);
}

function descriptografarCPF(cpfCriptografado, chave) {
  return descriptografar(cpfCriptografado, chave);
}

function criptografarDadosPaciente(paciente, chave) {
  const pacienteCriptografado = {
    nome: paciente.nome,
    cpf: criptografarCPF(paciente.cpf, chave),
    telefone: criptografar(paciente.telefone, chave),
    email: criptografar(paciente.email, chave),
    observacoes: paciente.observacoes
  };
  return pacienteCriptografado;
}

function descriptografarDadosPaciente(pacienteCriptografado, chave) {
  const paciente = {
    nome: pacienteCriptografado.nome,
    cpf: descriptografarCPF(pacienteCriptografado.cpf, chave),
    telefone: descriptografar(pacienteCriptografado.telefone, chave),
    email: descriptografar(pacienteCriptografado.email, chave),
    observacoes: pacienteCriptografado.observacoes
  };
  return paciente;
}

function gerarChaveAleatoria(tamanho = 32) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let chave = '';
  for (let i = 0; i < tamanho; i++) {
    chave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return chave;
}

function armazenarChave(chave) {
  localStorage.setItem('encryptionKey', chave);
}

function recuperarChave() {
  return localStorage.getItem('encryptionKey');
}

function limparChave() {
  localStorage.removeItem('encryptionKey');
}
