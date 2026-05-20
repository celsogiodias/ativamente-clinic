// ====== VALIDATION FUNCTIONS ======
// Validar email
function validarEmail(email) {
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regex.test(email);
}
// Validar senha (mínimo 6 caracteres)
function validarSenha(senha) {
return senha.length >= 6;
}
// Validar CPF
function validarCPF(cpf) {
cpf = cpf.replace(/\D/g, '');
if (cpf.length !== 11) return false;
if (/^(\d)\1{10}$/.test(cpf)) return false;
let soma = 0;
let resto;
for (let i = 1; i <= 9; i++) {
soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
}
resto = (soma * 10) % 11;
if (resto === 10 || resto === 11) resto = 0;
if (resto !== parseInt(cpf.substring(9, 10))) return false;
soma = 0;
for (let i = 1; i <= 10; i++) {
soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
}
resto = (soma * 10) % 11;
if (resto === 10 || resto === 11) resto = 0;
if (resto !== parseInt(cpf.substring(10, 11))) return false;
return true;
}
// Validar telefone
function validarTelefone(telefone) {
const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
return regex.test(telefone);
}
// Validar nome
function validarNome(nome) {
return nome.trim().length >= 3;
}
// Validar campo não vazio
function validarCampoNaoVazio(valor) {
return valor.trim().length > 0;
}
// Validar data
function validarData(data) {
const regex = /^\d{2}\/\d{2}\/\d{4}$/;
if (!regex.test(data)) return false;
const [dia, mes, ano] = data.split('/');
const data_obj = new Date(ano, mes - 1, dia);
return data_obj.getFullYear() == ano &&
data_obj.getMonth() == mes - 1 &&
data_obj.getDate() == dia;
}
// Validar URL
function validarURL(url) {
try {
new URL(url);
return true;
} catch (error) {
return false;
}
}
// Validar se é número
function validarNumero(numero) {
return !isNaN(numero) && numero !== '';
}
// Validar formulário de login
function validarFormularioLogin(email, senha) {
if (!validarCampoNaoVazio(email)) {
return { valido: false, mensagem: 'E-mail é obrigatório.' };
}
if (!validarEmail(email)) {
return { valido: false, mensagem: 'E-mail inválido.' };
}
if (!validarCampoNaoVazio(senha)) {
return { valido: false, mensagem: 'Senha é obrigatória.' };
}
if (!validarSenha(senha)) {
return { valido: false, mensagem: 'Senha deve ter no mínimo 6 caracteres.' };
}
return { valido: true, mensagem: '' };
}
// Validar formulário de cadastro
function validarFormularioCadastro(nome, email, senha, senhaConfirm) {
if (!validarCampoNaoVazio(nome)) {
return { valido: false, mensagem: 'Nome é obrigatório.' };
}
if (!validarNome(nome)) {
return { valido: false, mensagem: 'Nome deve ter no mínimo 3 caracteres.' };
}
if (!validarCampoNaoVazio(email)) {
return { valido: false, mensagem: 'E-mail é obrigatório.' };
}
if (!validarEmail(email)) {
return { valido: false, mensagem: 'E-mail inválido.' };
}
if (!validarCampoNaoVazio(senha)) {
return { valido: false, mensagem: 'Senha é obrigatória.' };
}
if (!validarSenha(senha)) {
return { valido: false, mensagem: 'Senha deve ter no mínimo 6 caracteres.' };
}
if (senha !== senhaConfirm) {
return { valido: false, mensagem: 'As senhas não coincidem.' };
}
return { valido: true, mensagem: '' };
}
// Validar formulário de paciente
function validarFormularioPaciente(nome, cpf, telefone, email) {
if (!validarCampoNaoVazio(nome)) {
return { valido: false, mensagem: 'Nome do paciente é obrigatório.' };
}
if (!validarNome(nome)) {
return { valido: false, mensagem: 'Nome deve ter no mínimo 3 caracteres.' };
}
if (!validarCPF(cpf)) {
return { valido: false, mensagem: 'CPF inválido.' };
}
if (email && !validarEmail(email)) {
return { valido: false, mensagem: 'E-mail inválido.' };
}
if (telefone && !validarTelefone(telefone)) {
return { valido: false, mensagem: 'Telefone inválido. Formato: (XX)XXXX-XXXX' };
}
return { valido: true, mensagem: '' };
}
