// Lógica para mostrar y ocultar secciones
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(targetId).classList.remove('hidden');
    });
});

// Inicialmente mostrar la sección de Introducción y ocultar las demás
document.querySelector('#introduccion').classList.remove('hidden');
document.querySelectorAll('section:not(#introduccion)').forEach(section => {
    section.classList.add('hidden');
});

// Lógica para los formularios de cálculo
document.getElementById('calculo-ds-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const P = parseFloat(document.getElementById('P').value);
    const ET = parseFloat(document.getElementById('ET').value);
    const R = parseFloat(document.getElementById('R').value);
    const D = parseFloat(document.getElementById('D').value);
    const resultado = P - ET - R - D; // Aquí puedes hacer el cálculo que necesites
    document.getElementById('resultado-ds').textContent = `ΔS = ${resultado.toFixed(2)} mm`;
});

document.getElementById('calculo-etc-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const Kc = parseFloat(document.getElementById('Kc').value);
    const ET0 = parseFloat(document.getElementById('ET0').value);
    const T = parseFloat(document.getElementById('T').value);
    const resultado = Kc * ET0 * T; // Aquí puedes hacer el cálculo que necesites
    document.getElementById('resultado-etc').textContent = `ETc = ${resultado.toFixed(2)} mm`;
});
