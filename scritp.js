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

document.getElementById('calculo-ds-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores ingresados
    const P = parseFloat(document.getElementById('P').value);
    const ET = parseFloat(document.getElementById('ET').value);
    const R = parseFloat(document.getElementById('R').value);
    const D = parseFloat(document.getElementById('D').value);
    const t = parseFloat(document.getElementById('t').value);

    // Calcular ΔS usando la fórmula ΔS = ∫ (P(t) - ET(t) - R(t) - D(t)) dt
    const deltaS = (P - ET - R - D) * t;

    // Consejos según el resultado
    let consejos = '';

    if (deltaS > 20) {
        consejos = `El balance hídrico es muy positivo, indicando un exceso significativo de agua en el suelo. Se recomienda reducir considerablemente el riego para evitar encharcamientos y posibles daños a las plantas.`;
    } else if (deltaS >= 0) {
        consejos = `El balance hídrico es normal. El riego actual parece estar bien balanceado para las condiciones actuales.`;
    } else if (deltaS > -20) {
        consejos = `El balance hídrico es negativo, lo que sugiere que el suelo está un poco seco. Se recomienda aumentar un poco el riego para mejorar las condiciones del suelo.`;
    } else if (deltaS <= -20) {
        consejos = `El balance hídrico es muy negativo, lo que sugiere una gran escasez de agua en el suelo. Se sugiere aumentar considerablemente el riego o aplicar métodos de retención de agua.`;
    }
    
    document.getElementById('resultado-ds').innerText = "Resultado: " + deltaS + " mm";
    document.getElementById('consejos').innerText = consejos;

    $('#resultadoModal').modal('show');
});


