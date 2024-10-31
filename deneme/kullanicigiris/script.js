const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const loginForm = document.getElementById('loginForm'); 

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const CORRECT_EMAIL = 'admin@gmail.com';
const CORRECT_PASSWORD = '123456';

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(email === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
        alert('Giriş başarılı! Yönlendiriliyorsunuz...');
        window.location.href ='/ikinciarayuz/index.html';
    } else {
        alert('Hatalı email veya şifre!');
    }
});