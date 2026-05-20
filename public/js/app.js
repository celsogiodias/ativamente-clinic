// ====== VARIÁVEIS GLOBAIS ======
let currentUser = null;

// ====== INICIALIZAÇÃO ======
document.addEventListener('DOMContentLoaded', function() {
setTimeout(() => {
document.getElementById('LS').style.display = 'none';
document.getElementById('LG').style.display = 'flex';
}, 2000);

// Event listeners para login/signup
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('signUpForm').addEventListener('submit', handleSignUp);
});

// ====== AUTENTICAÇÃO ======
function handleLogin(e) {
e.preventDefault();
const email = document.getElementById('loginEmail').value;
const password = document.getElementById('loginPassword').value;

firebase.auth().signInWithEmailAndPassword(email, password)
.then((userCredential) => {
currentUser = userCredential.user;
showApp();
})
.catch((error) => {
alert('Erro ao fazer login: ' + error.message);
});
}

function handleSignUp(e) {
e.preventDefault();
const name = document.getElementById('signUpName').value;
const email = document.getElementById('signUpEmail').value;
const password = document.getElementById('signUpPassword').value;

if (password.length < 6) {
alert('Senha deve ter no mínimo 6 caracteres');
return;
}

firebase.auth().createUserWithEmailAndPassword(email, password)
.then((userCredential) => {
currentUser = userCredential.user;
// Salvar nome do usuário no Firestore
firebase.firestore().collection('users').doc(currentUser.uid).set({
name: name,
email: email,
createdAt: new Date()
});
showApp();
})
.catch((error) => {
alert('Erro ao criar conta: ' + error.message);
});
}

function logout() {
firebase.auth().signOut()
.then(() => {
currentUser = null;
document.getElementById('APP').style.display = 'none';
document.getElementById('LG').style.display = 'flex';
document.getElementById('loginForm').reset();
document.getElementById('signUpForm').reset();
})
.catch((error) => {
alert('Erro ao sair: ' + error.message);
});
}

// ====== NAVEGAÇÃO ======
function showApp() {
document.getElementById('LG').style.display = 'none';
document.getElementById('APP').style.display = 'flex';
showPage('dashboard');
}

function showPage(pageId) {
// Esconder todas as páginas
const pages = document.querySelectorAll('.page');
pages.forEach(page => page.classList.remove('active'));

// Mostrar página selecionada
const selectedPage = document.getElementById('page-' + pageId);
if (selectedPage) {
selectedPage.classList.add('active');
}

// Atualizar sidebar
const sidebar_items = document.querySelectorAll('#sidebar li');
sidebar_items.forEach(item => item.classList.remove('active'));

// Marcar item ativo (aproximado)
const itemIndex = Array.from(sidebar_items).findIndex(item =>
item.textContent.toLowerCase().includes(pageId)
);
if (itemIndex !== -1) {
sidebar_items[itemIndex].classList.add('active');
}

// Carregar dados específicos
if (pageId === 'pacientes') {
carregarPacientes();
} else if (pageId === 'agenda') {
carregarAgenda();
}
}

// ====== LOGIN/SIGNUP UI ======
function showSignUp() {
document.getElementById('loginForm').style.display = 'none';
document.getElementById('signUpForm').style.display = 'block';
}

function showLogin() {
document.getElementById('signUpForm').style.display = 'none';
document.getElementById('loginForm').style.display = 'block';
}

// ====== PACIENTES ======
function abrirModalPaciente() {
document.getElementById('modal-paciente').classList.add('active');
}

function fecharModal(modalId) {
document.getElementById(modalId).classList.remove('active');
}

function carregarPacientes() {
if (!currentUser) return;

const db = firebase.firestore();
db.collection('users').doc(currentUser.uid).collection('pacientes').get()
.then((querySnapshot) => {
const list = document.getElementById('pacientes-list');
list.innerHTML = '';

if (querySnapshot.empty) {
list.innerHTML = '<p>Nenhum paciente cadastrado ainda.</p>';
return;
}

querySnapshot.forEach((doc) => {
const paciente = doc.data();
const div = document.createElement('div');
div.style.cssText = 'padding: 15px; border: 1px solid #ddd; border-radius: 5px; margin-bottom: 10px;';
div.innerHTML = `
<strong>${paciente.nome}</strong><br>
E-mail: ${paciente.email || 'N/A'}<br>
Telefone: ${paciente.telefone || 'N/A'}<br>
<small>${paciente.observacoes || ''}</small>
`;
list.appendChild(div);
});
})
.catch((error) => {
console.error('Erro ao carregar pacientes:', error);
});
}

document.addEventListener('DOMContentLoaded', function() {
const formPaciente = document.getElementById('form-paciente');
if (formPaciente) {
formPaciente.addEventListener('submit', function(e) {
e.preventDefault();

if (!currentUser) {
alert('Usuário não autenticado');
return;
}

const paciente = {
nome: document.getElementById('pac-nome').value,
cpf: document.getElementById('pac-cpf').value,
telefone: document.getElementById('pac-telefone').value,
email: document.getElementById('pac-email').value,
observacoes: document.getElementById('pac-observacoes').value,
dataCriacao: new Date()
};

const db = firebase.firestore();
db.collection('users').doc(currentUser.uid).collection('pacientes').add(paciente)
.then(() => {
alert('Paciente cadastrado com sucesso!');
fecharModal('modal-paciente');
document.getElementById('form-paciente').reset();
carregarPacientes();
})
.catch((error) => {
alert('Erro ao cadastrar paciente: ' + error.message);
});
});
}
});

// ====== AGENDA ======
function carregarAgenda() {
const container = document.getElementById('agenda-container');
container.innerHTML = '<p>Agenda será implementada em breve.</p>';
}

// ====== PRONTUÁRIO ======
function carregarProntuario() {
const container = document.getElementById('prontuario-container');
container.innerHTML = '<p>Prontuário será implementado em breve.</p>';
}

// ====== FINANCEIRO ======
function carregarFinanceiro() {
const container = document.getElementById('financeiro-container');
container.innerHTML = '<p>Financeiro será implementado em breve.</p>';
}

// ====== FECHAR MODAIS AO CLICAR FORA ======
window.addEventListener('click', function(e) {
const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
if (e.target === modal) {
modal.classList.remove('active');
}
});
});
