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


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const email = document.getElementById('mail-tolog').value; 
    const password = document.getElementById('password_login').value; 

    // Validate form inputs
    if (!email || !password) {
        alert('Lütfen tüm alanları doldurun!'); 
        return;
    }

    // Send login request to the server
    try {
        const response = await fetch('/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), 
        });

        const result = await response.json();

        if (response.ok) {
            alert('Giriş başarılı! Yönlendiriliyorsunuz...');
            window.location.href = '/ikinciarayuz/index.html'; 
        } else {
            alert(result.message || 'Hatalı email veya şifre!'); 
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Bir hata oluştu! Lütfen daha sonra tekrar deneyin.');
    }
});

