```javascript
// ====== ENCRYPTION FUNCTIONS ======
// Função para criptografar dados usando uma chave simples
function criptografar(dados, chave) {
  let resultado = '';
  for (let i = 0; i < dados.length; i++) {
    const charCode = dados.charCodeAt(i);
    const chaveCode = chave.charCodeAt(i % chave.length);
    resultado += String.fromCharCode(charCode ^ chaveCode);
  }
  return btoa(resultado); // Codificar em Base64
}

// Função para descriptografar dados
function descriptografar(dadosCriptografados, chave) {
  let resultado = '';
  const dados = atob(dadosCriptografados); // Decodificar de Base64
  for (let i = 0; i < dados.length; i++) {
    const charCode = dados.charCodeAt(i);
    const chaveCode = chave.charCodeAt(i % chave.length);
    resultado += String.fromCharCode(charCode ^ chaveCode);
  }
  return resultado;
}

// Função para gerar hash SHA-256 (simulado com crypto)
async function gerarHashSHA256(dados) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(dados);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Função para validar integridade de dados
async function validarIntegridade(dados, hash) {
  const hashCalculado = await gerarHashSHA256(dados);
  return hashCalculado === hash;
}

// Função para criptografar CPF
function criptografarCPF(cpf, chave) {
  const cpfLimpo = cpf.replace(/\D/g, '');
  return criptografar(cpfLimpo, chave);
}

// Função para descriptografar CPF
function descriptografarCPF(cpfCriptografado, chave) {
  return descriptografar(cpfCriptografado, chave);
}

// Função para criptografar dados sensíveis do paciente
function criptografarDadosPaciente(paciente, chave) {
  const pacienteCriptografado = {
    nome: paciente.nome, // Nome não é sensível
    cpf: criptografarCPF(paciente.cpf, chave),
    telefone: criptografar(paciente.telefone, chave),
    email: criptografar(paciente.email, chave),
    observacoes: paciente.observacoes
  };
  return pacienteCriptografado;
}

// Função para descriptografar dados do paciente
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

// Função para gerar chave de criptografia aleatória
function gerarChaveAleatoria(tamanho = 32) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let chave = '';
  for (let i = 0; i < tamanho; i++) {
    chave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return chave;
}

// Função para armazenar chave no localStorage (apenas para desenvolvimento)
function armazenarChave(chave) {
  localStorage.setItem('encryptionKey', chave);
}

// Função para recuperar chave do localStorage
function recuperarChave() {
  return localStorage.getItem('encryptionKey');
}

// Função para limpar chave do localStorage
function limparChave() {
  localStorage.removeItem('encryptionKey');
}
```
