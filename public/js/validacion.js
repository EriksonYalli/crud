document.getElementById('togglePassword').addEventListener('click', function (e) {
    const password = document.getElementById('password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.textContent = this.textContent === '👁️' ? '🙈' : '👁️';
});

document.getElementById('registroForm').addEventListener('submit', function (e) {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (nombre === '' || email === '' || password === '') {
        alert('Todos los campos son obligatorios');
        e.preventDefault();
    } else if (!validateEmail(email)) {
        alert('Correo electrónico no válido');
        e.preventDefault();
    } else if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        e.preventDefault();
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.querySelectorAll('.edit').forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('id').value = this.dataset.id;
        document.getElementById('nombre').value = this.dataset.nombre;
        document.getElementById('email').value = this.dataset.email;
        document.getElementById('password').value = ''; // Deja el campo de contraseña vacío para que el usuario ingrese una nueva si desea cambiarla
    });
});
