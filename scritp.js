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

    p = document.getElementById('P').value = '';
    et = document.getElementById('ET').value = '';
    r = document.getElementById('R').value = '';
    d = document.getElementById('D').value = '';
    t = document.getElementById('t').value = '';
});

// Función para calcular ET0(t) en función de t, usando los valores base y pendiente proporcionados por el usuario
function ET0(t, base, slope) {
    return base + slope * t; // Evapotranspiración de referencia en mm/hora
}

// Función para calcular la demanda de agua del cultivo (ETc) y mostrar el resultado en el modal
function calcularETc() {
    // Obtener valores ingresados por el usuario
    const Kc = parseFloat(document.getElementById("Kc").value);
    const ET0Base = parseFloat(document.getElementById("ET0Base").value);
    const ET0Slope = parseFloat(document.getElementById("ET0Slope").value);
    const hours = parseInt(document.getElementById("T").value);

    // Validar que los valores sean números válidos
    if (isNaN(Kc) || isNaN(ET0Base) || isNaN(ET0Slope) || isNaN(hours)) {
        document.getElementById("resultado-ds").textContent = "Por favor, ingrese todos los valores correctamente.";
        $('#resultadoModal').modal('show');
        return;
    }

    let totalDemand = 0; // Inicializar demanda total
    const timeStep = 1; // Paso de tiempo en horas (se puede ajustar para mayor precisión)

    // Calcular la demanda de agua usando integración numérica (suma de Riemann)
    for (let t = 0; t < hours; t += timeStep) {
        totalDemand += Kc * ET0(t, ET0Base, ET0Slope) * timeStep; // Aproximación de la integral
    }

    // Mostrar el resultado en el modal
    document.getElementById("resultado-ds").textContent = "La demanda total de agua del cultivo es: " + totalDemand.toFixed(2) + " mm";

    // Agregar consejos de riego basados en el resultado calculado
    const consejos = document.getElementById("consejos");
    if (totalDemand < 5) {
        consejos.textContent = "Consejo: La demanda de agua es baja. Puedes reducir la frecuencia de riego para ahorrar agua.";
    } else if (totalDemand >= 5 && totalDemand <= 10) {
        consejos.textContent = "Consejo: La demanda de agua es moderada. Mantén un riego regular para evitar estrés hídrico.";
    } else {
        consejos.textContent = "Consejo: La demanda de agua es alta. Asegúrate de proporcionar suficiente agua, especialmente en las horas más cálidas del día.";
    }

    // Mostrar el modal con el resultado y los consejos
    $('#resultadoModal').modal('show');

    // Limpiar los campos de entrada
    document.getElementById("Kc").value = "";
    document.getElementById("ET0Base").value = "";
    document.getElementById("ET0Slope").value = "";
    document.getElementById("T").value = "";
}

document.getElementById('contacto-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario
    
    // Mostrar el modal de confirmación
    $('#confirmacionModal').modal('show');
    
    // Limpiar los campos del formulario
    document.getElementById('contacto-form').reset();
});
