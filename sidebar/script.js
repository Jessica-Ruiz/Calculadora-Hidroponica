

// URL del proyecto en Supabase
const supabaseUrl = "https://cerqtenlbhcigfmolavd.supabase.co";

// Clave pública (anon key) generada por Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcnF0ZW5sYmhjaWdmbW9sYXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNzY1NjUsImV4cCI6MjA3MjY1MjU2NX0.a4A-ua5xAKZx6ewc_t60ZHoD0AsoOA9CG6O4EzzcPWE";

// Cliente de Supabase (permite usar autenticación y base de datos)
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);



// Elementos
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");

// Mostrar overlay al presionar botón login
btnPopup.addEventListener("click", () => { document.getElementById("overlay-login").style.display="flex"; });

// Cambiar entre login y registro
registerLink.addEventListener("click", e=>{ e.preventDefault(); wrapper.classList.add("active"); });
loginLink.addEventListener("click", e=>{ e.preventDefault(); wrapper.classList.remove("active"); });

// Cerrar overlay
iconClose.addEventListener("click", ()=>{ document.getElementById("overlay-login").style.display="none"; });

// Validar sesión al cargar
window.addEventListener("DOMContentLoaded", async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        document.getElementById("overlay-login").style.display = "none";
        document.querySelector(".sidebar").style.display = "flex";
        document.querySelector(".content").style.display = "block";
    } else {
        document.getElementById("overlay-login").style.display = "flex";
        document.querySelector(".sidebar").style.display = "none";
        document.querySelector(".content").style.display = "none";
    }
});

// LOGIN
document.querySelector(".form-box.login form").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if(error){ alert("❌ "+error.message); }
    else{
        alert("👋 Bienvenido " + email);
        document.getElementById("overlay-login").style.display="none";
        document.querySelector(".sidebar").style.display="flex";
        document.querySelector(".content").style.display="block";
    }
});

// REGISTRO



// REGISTRO DE USUARIOS


document
.querySelector(".form-box.register form") // Seleccionamos el formulario de registro
.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página al enviar

    // Obtenemos valores ingresados
    const nombre = e.target.nombre.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirm_password.value;

    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    //  Uso de Supabase para registrar un nuevo usuario
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: { nombre }, // Guardamos el nombre como "metadata(informacion que describe los datos)" en Supabase
        },
    });

    // Manejo de la respuesta
    if (error) {
        alert("Error al registrar: " + error.message);
    } else {
        alert("✅ Registro exitoso. Revisa tu correo para confirmar la cuenta.");
        wrapper.classList.remove("active"); // Volvemos a login después del registro
    }
});



// INICIO DE SESIÓN


document
.querySelector(".form-box.login form") // Seleccionamos el formulario de login
.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    //  Obtiene valores ingresados
    const email = e.target.email.value;
    const password = e.target.password.value;

    //  Uso Supabase para autenticar al usuario
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    });

    // Manejo de la respuesta
    if (error) {
        alert("❌ Error al iniciar sesión: " + error.message);
    } else {
        alert("👋 Bienvenido " + email);
        wrapper.style.display = "none"; // Ocultamos el formulario al iniciar sesión
    }
});

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("overlay-login").style.display = "flex"; // muestra overlay
    wrapper.style.display = "block"; // muestra formulario
});


document.addEventListener("DOMContentLoaded", () => {
  const dropdownItems = document.querySelectorAll(".menu-items-dropdown > .menu-link");
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector(".menu-btn");

  // Toggle sidebar
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");

    // cerrar todos los submenús cuando se colapsa
    if (sidebar.classList.contains("collapsed")) {
      document.querySelectorAll(".sub_menu").forEach(sm => {
        sm.style.height = "0";
        sm.style.padding = "0";
        sm.parentElement.classList.remove("open");
      });
    }
  });

  // Manejo de submenús
  dropdownItems.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const parent = link.parentElement;
      const subMenu = parent.querySelector(":scope > .sub_menu");
      if (!subMenu) return;

      parent.classList.toggle("open");

      if (parent.classList.contains("open")) {
        subMenu.style.height = subMenu.scrollHeight + "px";
        subMenu.style.padding = "0.2rem 0";
      } else {
        subMenu.style.height = "0";
        subMenu.style.padding = "0";
      }
    });
  });

  // Recalcular alturas al redimensionar
  window.addEventListener("resize", () => {
    document.querySelectorAll(".menu-items-dropdown.open > .sub_menu").forEach(sm => {
      sm.style.height = sm.scrollHeight + "px";
    });
  });
});

const etapas ={
    1: [
    { nombre: "Germinación", inicio: 0, fin: 10 },
    { nombre: "Plántula", inicio: 11, fin: 30 },
    { nombre: "Desarrollo vegetativo", inicio: 31, fin: 60 },
    { nombre: "Floración", inicio: 61, fin: 100 },
    { nombre: "Cosecha", inicio: 90, fin: 150 },
  ],
    2: [
    { nombre: "Germinación", inicio: 0, fin: 21 },
    { nombre: "Plántula", inicio: 22, fin: 42},
    { nombre: "Desarrollo vegetativo", inicio: 43, fin: 84 },
    { nombre: "Floración", inicio: 85, fin: 126 },
    { nombre: "Cosecha", inicio: 127, fin: 168 },
    ],
    3: [
    { nombre: "Germinación", inicio: 0, fin: 14 },
    { nombre: "Plántula", inicio: 15, fin: 28 },
    { nombre: "Desarrollo vegetativo", inicio: 29, fin: 56 },
    { nombre: "Floración", inicio: 57, fin: 84 },
    { nombre: "Cosecha", inicio: 85, fin: 112 },
    ],
    4: [
    { nombre: "Germinación", inicio: 0, fin: 14 },
    { nombre: "Plántula", inicio: 15, fin: 35 },
    { nombre: "Desarrollo vegetativo", inicio: 36, fin: 70 },
    { nombre: "Floración", inicio: 71, fin: 112 },
    { nombre: "Cosecha", inicio: 113, fin: 140 },
    ],
    5: [
    { nombre: "Germinación", inicio: 0, fin: 7 },
    { nombre: "Plántula", inicio: 8, fin: 14},
    { nombre: "Desarrollo vegetativo", inicio: 15, fin: 28 },
    { nombre: "Floración",inicio:"No da futos",fin:"No da frutos"},
    { nombre: "Cosecha", inicio: 29, fin: 42 },
    ],
    6: [
    { nombre: "Germinación", inicio: 0, fin: 7 },
    { nombre: "Plántula", inicio: 8, fin: 14 },
    { nombre: "Desarrollo vegetativo", inicio: 15, fin: 28 },
    { nombre: "Floración", inicio: "No da frutos", fin: "No da frutos" },
    { nombre: "Cosecha", inicio: 29, fin: 35 },
    ],
    7: [
    { nombre: "Germinación", inicio: 0, fin: 21 },
    { nombre: "Plántula", inicio: 22, fin: 42 },
    { nombre: "Desarrollo vegetativo", inicio: 43, fin: 70 },
    { nombre: "Floración", inicio: 71, fin: 84 },
    { nombre: "Cosecha", inicio: 71, fin: 84 },
    ],
    8: [
    { nombre: "Germinación", inicio: 0, fin: 14 },
    { nombre: "Plántula", inicio: 15, fin: 28 },
    { nombre: "Desarrollo vegetativo", inicio: 29, fin: 49 },
    { nombre: "Floración", inicio: "No da frutos", fin: "No da frutos" },
    { nombre: "Cosecha", inicio: 42, fin: 56 },
    ],
    9: [
    { nombre: "Germinación", inicio: 0, fin: 7 },
    { nombre: "Plántula", inicio: 8, fin: 14 },
    { nombre: "Desarrollo vegetativo", inicio: 15, fin: 28 },
    { nombre: "Floración", inicio:"No da frutos", fin: "No da frut0s" },
    { nombre: "Cosecha", inicio: 29, fin: 42 },
    ]
  }
function calcularEtapas() {
  const fechaInput = document.getElementById('fechaSiembra').value;
  if (!fechaInput) {
    alert('Por favor selecciona una fecha de siembra.');
    return;
  }

  const fechaSiembra = new Date(fechaInput);
  if (isNaN(fechaSiembra.getTime())) {
    alert('Por favor selecciona una fecha válida.');
    return;
  }

  const planta = parseInt(document.getElementById('options').value, 10);
  const etapasPlanta = etapas[planta];

  if (!Array.isArray(etapasPlanta)) {
    // Si no tienes etapas definidas para esa planta muestra mensaje y no intentes iterar
    alert('No hay información de etapas para la planta seleccionada.');
    document.getElementById("tablaEtapas").style.display = "none";
    return;
  }

  const tablaBody = document.getElementById("tablaBody");
  tablaBody.innerHTML = "";

  etapasPlanta.forEach(etapa => {
    // crear nuevas fechas a partir de la fecha de siembra (no mutar la original)
    const fechaInicio = new Date(fechaSiembra);
    fechaInicio.setDate(fechaInicio.getDate() + Number(etapa.inicio));

    const fechaFin = new Date(fechaSiembra);
    fechaFin.setDate(fechaFin.getDate() + Number(etapa.fin));

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${etapa.nombre}</td>
      <td>${fechaInicio.toLocaleDateString()}</td>
      <td>${fechaFin.toLocaleDateString()}</td>
    `;
    tablaBody.appendChild(fila);
  });

  document.getElementById("tablaEtapas").style.display = "table";
  function calcularEtapas() {
  const fechaInput = document.getElementById('fechaSiembra').value;
  if (!fechaInput) {
    alert('Por favor selecciona una fecha de siembra.');
    return;
  }

  const fechaSiembra = new Date(fechaInput);
  if (isNaN(fechaSiembra.getTime())) {
    alert('Por favor selecciona una fecha válida.');
    return;
  }

  const planta = parseInt(document.getElementById('options').value, 10);
  const etapasPlanta = etapas[planta];

  if (!Array.isArray(etapasPlanta)) {
    alert('No hay información de etapas para la planta seleccionada.');
    document.getElementById("tablaEtapas").style.display = "none";
    return;
  }

  const tablaBody = document.getElementById("tablaBody");
  tablaBody.innerHTML = "";

  let resultadoTexto = ''; // <-- Aquí se guarda el texto para Dexie

  etapasPlanta.forEach(etapa => {
    const fechaInicio = new Date(fechaSiembra);
    fechaInicio.setDate(fechaInicio.getDate() + Number(etapa.inicio));

    const fechaFin = new Date(fechaSiembra);
    fechaFin.setDate(fechaFin.getDate() + Number(etapa.fin));

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${etapa.nombre}</td>
      <td>${fechaInicio.toLocaleDateString()}</td>
      <td>${fechaFin.toLocaleDateString()}</td>
    `;
    tablaBody.appendChild(fila);

    resultadoTexto += `${etapa.nombre}: ${fechaInicio.toLocaleDateString()} - ${fechaFin.toLocaleDateString()}\n`;
  });

  document.getElementById("tablaEtapas").style.display = "table";

  // Guardar en Dexie
  guardarResultadoDexie('etapas', resultadoTexto);
}

}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('nutrientForm');
  const resultContainer = document.getElementById('result');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const option = parseInt(document.getElementById('option').value);
    const litersInput = document.getElementById('liters').value.trim();

    // Validaciones
    if (litersInput === '') { alert('⚠️ Por favor ingrese un valor.'); return; }
    if (litersInput.includes(',')) { alert('⚠️ Use punto (.) en lugar de coma.'); return; }
    if (!/^[0-9]*\.?[0-9]+$/.test(litersInput)) { alert('⚠️ Solo números positivos.'); return; }
    const liters = parseFloat(litersInput);
    if (liters <= 0) { alert('⚠️ El valor debe ser mayor que cero.'); return; }

    let result = '';

    // ===========================
    // CÁLCULOS DE NUTRIENTES
    // ===========================
    // Nitrato de calcio
    let nitratoCalcio = 40.078 + (2 * 14.0067) + (6 * 15.9994);
    let porcentajeNitratoCalcioo = (40.078 * 100 / nitratoCalcio);

    // Nitrato de potasio
    let nitratoPotasio = 39.0983 + 14.0067 + 3 * 15.9994;
    let porcentajeNitratoPotasioo = (39.0983 / nitratoPotasio) * 100;

    // Fosfato de monoamoniaco
    let fosfatoMonoamoniaco = 14.0067 + 6 * 1.00784 + 30.973762 + 4 * 15.9994;
    let porcentajeFosfatoMonoamoniaco2 = (30.973762 / fosfatoMonoamoniaco) * 100;

    // Sulfato de magnesio
    let sulfatoMagnesio = 24.305 + 32.065 + 4 * 15.9994 + 7 * 1.00784 * 2 + 7 * 15.9994;
    let porcentajeSulfatoMagnesio = (24.305 / sulfatoMagnesio) * 100;
    let porcentajeSulfatoMagnesioo = (32.065 / sulfatoMagnesio) * 100;

    // Sulfato ferroso
    let sulfatoFerroso = 55.845 + 32.065 + 4 * 15.9994;
    let porcentajeSulfatoFerrosoo = (32.065 / sulfatoFerroso) * 100;

    // Sulfato de cobre
    let sulfatoCobre = 63.54 + 32.065 + 4 * 15.9994;
    let porcentajeSulfatoCobre = (63.54 / sulfatoCobre) * 100;

    // Sulfato de manganeso
    let sulfatoManganeso = 54.938 + 32.065 + 4 * 15.9994;
    let porcentajeSulfatoManganesoo = (54.938 / sulfatoManganeso) * 100;

    // Sulfato de zinc
    let sulfatoZinc = 65.38 + 32.065 + 4 * 15.9994;
    let porcentajeSulfatoZinc = (32.065 / sulfatoZinc) * 100;

    // Ácido bórico
    let acidoBorico = 3 * 1.00784 + 10.81 + 3 * 15.9994;
    let porcentajeAcidoborico = (10.81 / acidoBorico) * 100;

    // ===========================
    // SWITCH SEGÚN OPCIÓN
    // ===========================
    switch (option) {
      case 1:
        result += `Cantidad en gramos del compuesto: ${((140 / porcentajeNitratoCalcioo)/10 * liters).toFixed(2)} gramos de nitrato de calcio.\n`;
        result += `Cantidad en gramos del compuesto: ${((150 / porcentajeNitratoPotasioo)/10 * liters).toFixed(2)} gramos de nitrato de potasio.\n`;
        result += `Cantidad en gramos del compuesto: ${((50 / porcentajeFosfatoMonoamoniaco2)/10 * liters).toFixed(2)} gramos de fosfato de monoamoniaco.\n`;
        result += `Cantidad en gramos del compuesto: ${((55 / porcentajeSulfatoMagnesio)/10 * liters).toFixed(2)} gramos de sulfato de magnesio.\n`;
        result += `Cantidad en gramos del compuesto: ${((3 / porcentajeSulfatoFerrosoo)/10 * liters).toFixed(2)} gramos de sulfato ferroso.\n`;
        result += `Cantidad en gramos del compuesto: ${((0.5 / porcentajeSulfatoCobre)/10 * liters).toFixed(2)} gramos de sulfato de cobre.\n`;
        result += `Cantidad en gramos del compuesto: ${((0.8 / porcentajeSulfatoManganesoo)/10 * liters).toFixed(2)} gramos de sulfato de manganeso.\n`;
        result += `Cantidad en gramos del compuesto: ${((0.4 / porcentajeSulfatoZinc)/10 * liters).toFixed(2)} gramos de sulfato de zinc.\n`;
        result += `Cantidad en gramos del compuesto: ${((0.8 / porcentajeAcidoborico)/10 * liters).toFixed(2)} gramos de ácido bórico.\n`;
        break;
      case 2:
        result += `Cantidad en gramos del compuesto: ${((130 / porcentajeNitratoCalcioo)/10 * liters).toFixed(2)} gramos de nitrato de calcio.\n`;
        result += `Cantidad en gramos del compuesto: ${((120 / porcentajeNitratoPotasioo)/10 * liters).toFixed(2)} gramos de nitrato de potasio.\n`;
        break;
      case 3:
        result += `Cantidad en gramos del compuesto: ${((110 / porcentajeNitratoCalcioo)/10 * liters).toFixed(2)} gramos de nitrato de calcio.\n`;
        result += `Cantidad en gramos del compuesto: ${((100 / porcentajeNitratoPotasioo)/10 * liters).toFixed(2)} gramos de nitrato de potasio.\n`;
        break;
      case 4:
        result += `Cantidad en gramos del compuesto: ${((150 / porcentajeFosfatoMonoamoniaco2)/10 * liters).toFixed(2)} gramos de fosfato de monoamoniaco.\n`;
        result += `Cantidad en gramos del compuesto: ${((60 / porcentajeSulfatoMagnesio)/10 * liters).toFixed(2)} gramos de sulfato de magnesio.\n`;
        break;
      case 5:
        result += `Cantidad en gramos del compuesto: ${((160 / porcentajeNitratoCalcioo)/10 * liters).toFixed(2)} gramos de nitrato de calcio.\n`;
        break;
      case 6:
        result += `Cantidad en gramos del compuesto: ${((50 / porcentajeSulfatoFerrosoo)/10 * liters).toFixed(2)} gramos de sulfato ferroso.\n`;
        result += `Cantidad en gramos del compuesto: ${((20 / porcentajeSulfatoCobre)/10 * liters).toFixed(2)} gramos de sulfato de cobre.\n`;
        break;
      case 7:
        result += `Cantidad en gramos del compuesto: ${((30 / porcentajeSulfatoManganesoo)/10 * liters).toFixed(2)} gramos de sulfato de manganeso.\n`;
        result += `Cantidad en gramos del compuesto: ${((15 / porcentajeSulfatoZinc)/10 * liters).toFixed(2)} gramos de sulfato de zinc.\n`;
        break;
      case 8:
        result += `Cantidad en gramos del compuesto: ${((10 / porcentajeAcidoborico)/10 * liters).toFixed(2)} gramos de ácido bórico.\n`;
        break;
      case 9:
        result += `Cantidad en gramos del compuesto: ${((25 / porcentajeSulfatoMagnesio)/10 * liters).toFixed(2)} gramos de sulfato de magnesio.\n`;
        result += `Cantidad en gramos del compuesto: ${((5 / porcentajeSulfatoCobre)/10 * liters).toFixed(2)} gramos de sulfato de cobre.\n`;
        break;
      default:
        result = 'La opción es incorrecta.';
    }

    // ===========================
    // GENERAR TABLA
    // ===========================
    const filas = result.trim().split('\n');
    let tablaHTML = `
      <table border="1" style="border-collapse: collapse; width: 100%; margin-top: 10px;">
        <thead>
          <tr style="background-color: #e0e0e0;">
            <th>Compuesto</th>
            <th>Cantidad (g)</th>
          </tr>
        </thead>
        <tbody>
    `;
    filas.forEach(linea => {
      const regex = /([\d.]+)\s+gramos\s+de\s+(.+)\./i;
      const match = linea.match(regex);
      if (match) {
        const cantidad = match[1];
        const compuesto = match[2];
        tablaHTML += `<tr><td>${compuesto}</td><td style="text-align: right;">${cantidad}</td></tr>`;
      }
    });
    tablaHTML += `</tbody></table>`;
    resultContainer.innerHTML = tablaHTML;

    // ===========================
    // BOTÓN GUARDAR RESULTADOS
    // ===========================
    if (!document.getElementById('guardarResultados')) {
      const btnGuardar = document.createElement('button');
      btnGuardar.id = 'guardarResultados';
      btnGuardar.textContent = 'Guardar resultados';
      btnGuardar.style.marginTop = '10px';
      resultContainer.parentNode.insertBefore(btnGuardar, resultContainer.nextSibling);

      btnGuardar.addEventListener('click', function() {
        if (!navigator.onLine) {
          guardarEnDexie(tablaHTML);
        } else {
          guardarEnSupabase(tablaHTML);
        }
      });
    }
  });

  // ===========================
  // FUNCIONES DE GUARDADO
  // ===========================
  function guardarEnDexie(tabla) {
    const db = new Dexie("hidrosoftDB");
    db.version(1).stores({ resultados: "++id, texto, fecha" });
    db.resultados.add({ texto: tabla, fecha: new Date().toISOString() })
      .then(() => alert('Resultados guardados en Dexie (offline).'))
      .catch(err => alert('Error guardando en Dexie: ' + err));
  }

async function guardarEnSupabase(tabla) {
  try {
    const { data, error } = await supabaseClient
      .from('resultados')    // <- usa supabaseClient, no supabase
      .insert([
        { texto: tabla, fecha: new Date().toISOString() }
      ]);
    if (error) throw error;
    alert('Resultados guardados en Supabase.');
  } catch (err) {
    alert('Error guardando en Supabase: ' + err.message);
  }
}


});
async function mostrarResultadosSupabase() {
  try {
    // Traer todos los resultados de la tabla 'resultados', ordenados por fecha descendente
    const { data, error } = await supabaseClient
      .from('resultados')
      .select('*')
      .order('fecha', { ascending: false });

    if (error) throw error;

    // Mostrar en consola (puedes adaptarlo para mostrar en HTML)
    console.log("Resultados guardados en Supabase:", data);

    // Ejemplo de mostrar en un contenedor HTML
    const resultadosContainer = document.getElementById('resultadosContainer');
    resultadosContainer.innerHTML = ''; // limpiar contenido previo

    data.forEach(item => {
      const div = document.createElement('div');
      div.style.border = '1px solid #ccc';
      div.style.padding = '10px';
      div.style.margin = '5px 0';
      div.innerHTML = `
        <strong>Fecha:</strong> ${new Date(item.fecha).toLocaleString()}<br>
        ${item.texto}
      `;
      resultadosContainer.appendChild(div);
    });

  } catch (err) {
    alert('Error al obtener resultados: ' + err.message);
  }
}

// Llamas a esta función cuando quieras mostrar los resultados
mostrarResultadosSupabase();





const rangosCultivos = {
  fresa: {
    germinacion: { ph: [5.5, 6.0], ce: [1.0, 1.4], temperatura: [20, 25], humedad: [70, 80] },
    plantula:    { ph: [5.5, 6.0], ce: [1.2, 1.6], temperatura: [18, 24], humedad: [65, 75] },
    vegetativo:  { ph: [5.5, 6.5], ce: [1.5, 2.0], temperatura: [20, 26], humedad: [60, 70] },
    floracion:   { ph: [5.5, 6.5], ce: [1.8, 2.5], temperatura: [20, 26], humedad: [55, 65] },
    fructificacion: { ph: [5.8, 6.5], ce: [2.0, 2.5], temperatura: [18, 24], humedad: [55, 65] },
    cosecha:     { ph: [5.5, 6.5], ce: [1.2, 2.0], temperatura: [18, 22], humedad: [50, 60] }
  },

  guatila: {
    germinacion: { ph: [5.5, 6.0], ce: [1.0, 1.5], temperatura: [22, 28], humedad: [70, 80] },
    plantula:    { ph: [5.5, 6.5], ce: [1.5, 2.0], temperatura: [20, 26], humedad: [65, 75] },
    vegetativo:  { ph: [5.5, 6.5], ce: [1.8, 2.3], temperatura: [22, 28], humedad: [60, 70] },
    floracion:   { ph: [5.5, 6.5], ce: [2.0, 2.5], temperatura: [22, 27], humedad: [55, 65] },
    fructificacion: { ph: [5.8, 6.5], ce: [2.2, 2.8], temperatura: [20, 26], humedad: [55, 65] },
    cosecha:     { ph: [5.5, 6.5], ce: [1.5, 2.0], temperatura: [18, 24], humedad: [50, 60] }
  },

  mora: {
    germinacion: { ph: [5.5, 6.0], ce: [1.0, 1.4], temperatura: [22, 26], humedad: [70, 80] },
    plantula:    { ph: [5.5, 6.0], ce: [1.2, 1.8], temperatura: [20, 25], humedad: [65, 75] },
    vegetativo:  { ph: [5.5, 6.5], ce: [1.8, 2.2], temperatura: [22, 28], humedad: [60, 70] },
    floracion:   { ph: [5.5, 6.5], ce: [2.0, 2.6], temperatura: [22, 27], humedad: [55, 65] },
    fructificacion: { ph: [5.8, 6.5], ce: [2.2, 2.8], temperatura: [20, 26], humedad: [55, 65] },
    cosecha:     { ph: [5.5, 6.5], ce: [1.2, 2.0], temperatura: [18, 24], humedad: [50, 60] }
  },

  lechuga: {
    germinacion: { ph: [5.5, 6.0], ce: [0.8, 1.2], temperatura: [20, 24], humedad: [70, 80] },
    plantula:    { ph: [5.5, 6.0], ce: [1.0, 1.4], temperatura: [18, 22], humedad: [65, 75] },
    vegetativo:  { ph: [5.5, 6.5], ce: [1.2, 1.8], temperatura: [18, 24], humedad: [60, 70] },
    cosecha:     { ph: [5.5, 6.5], ce: [1.0, 1.6], temperatura: [18, 22], humedad: [50, 60] }
  },

  espinaca: {
    germinacion: { ph: [5.8, 6.2], ce: [0.8, 1.2], temperatura: [18, 22], humedad: [70, 80] },
    plantula:    { ph: [5.8, 6.2], ce: [1.0, 1.4], temperatura: [18, 22], humedad: [65, 75] },
    vegetativo:  { ph: [5.8, 6.5], ce: [1.2, 1.8], temperatura: [18, 24], humedad: [60, 70] },
    cosecha:     { ph: [5.8, 6.5], ce: [1.0, 1.6], temperatura: [18, 22], humedad: [50, 60] }
  },

  romero: {
    germinacion: { ph: [5.5, 6.0], ce: [0.8, 1.2], temperatura: [20, 25], humedad: [70, 80] },
    plantula:    { ph: [5.5, 6.5], ce: [1.0, 1.4], temperatura: [18, 24], humedad: [65, 75] },
    vegetativo:  { ph: [5.5, 6.5], ce: [1.5, 2.0], temperatura: [20, 26], humedad: [60, 70] },
    cosecha:     { ph: [5.5, 6.5], ce: [1.0, 1.8], temperatura: [18, 24], humedad: [50, 60] }
  },

  perejil: {
    germinacion: { ph: [5.8, 6.2], ce: [0.8, 1.2], temperatura: [20, 24], humedad: [70, 80] },
    plantula:    { ph: [5.8, 6.2], ce: [1.0, 1.4], temperatura: [18, 22], humedad: [65, 75] },
    vegetativo:  { ph: [5.8, 6.5], ce: [1.2, 1.8], temperatura: [18, 24], humedad: [60, 70] },
    cosecha:     { ph: [5.8, 6.5], ce: [1.0, 1.6], temperatura: [18, 22], humedad: [50, 60] }
  },

  cilantro: {
    germinacion: { ph: [5.8, 6.2], ce: [0.8, 1.2], temperatura: [18, 22], humedad: [70, 80] },
    plantula:    { ph: [5.8, 6.2], ce: [1.0, 1.4], temperatura: [18, 22], humedad: [65, 75] },
    vegetativo:  { ph: [5.8, 6.5], ce: [1.2, 1.8], temperatura: [18, 24], humedad: [60, 70] },
    cosecha:     { ph: [5.8, 6.5], ce: [1.0, 1.6], temperatura: [18, 22], humedad: [50, 60] }
  },

  tomate: {
    germinacion: { ph: [5.5, 6.0], ce: [1.0, 1.5], temperatura: [22, 26], humedad: [70, 80] },
    plantula:    { ph: [5.5, 6.0], ce: [1.5, 2.0], temperatura: [20, 25], humedad: [65, 75] },
    vegetativo:  { ph: [5.5, 6.5], ce: [2.0, 2.5], temperatura: [22, 28], humedad: [60, 70] },
    floracion:   { ph: [5.5, 6.5], ce: [2.2, 2.8], temperatura: [22, 27], humedad: [55, 65] },
    fructificacion: { ph: [5.8, 6.5], ce: [2.5, 3.0], temperatura: [20, 26], humedad: [55, 65] },
    cosecha:     { ph: [5.5, 6.5], ce: [1.5, 2.0], temperatura: [18, 24], humedad: [50, 60] }
  }
};

// Función para verificar los parámetros
document.getElementById('verificarParametrosBtn').addEventListener('click', function() {
  const planta = document.getElementById('planta').value;
  const etapa = document.getElementById('etapa').value;

  const ph = parseFloat(document.getElementById('ph').value);
  const ce = parseFloat(document.getElementById('ce').value);
  const temperatura = parseFloat(document.getElementById('temperatura').value);
  const humedad = parseFloat(document.getElementById('humedad').value);
  const resultado = document.getElementById('resultado');

  if (isNaN(ph) || isNaN(ce) || isNaN(temperatura) || isNaN(humedad)) {
    resultado.textContent = "Por favor, ingresa todos los valores correctamente.";
    resultado.style.color = "red";
    document.getElementById('guardarResultadoParametros').style.display = 'none';
    return;
  }

  const rango = rangosCultivos?.[planta]?.[etapa];

  if (!rango) {
    resultado.textContent = "No hay datos para la planta o la etapa seleccionada.";
    resultado.style.color = "red";
    document.getElementById('guardarResultadoParametros').style.display = 'none';
    return;
  }

  const dentroPH = ph >= rango.ph[0] && ph <= rango.ph[1];
  const dentroCE = ce >= rango.ce[0] && ce <= rango.ce[1];
  const dentroTemp = temperatura >= rango.temperatura[0] && temperatura <= rango.temperatura[1];
  const dentroHumedad = humedad >= rango.humedad[0] && humedad <= rango.humedad[1];

  if (dentroPH && dentroCE && dentroTemp && dentroHumedad) {
    resultado.innerHTML = "Todos los parámetros están dentro del rango recomendado.";
    resultado.style.color = "green";
  } else {
    let mensaje = "Parámetros fuera del rango recomendado:<br>";
    if (!dentroPH) mensaje += `- pH: entre ${rango.ph[0]} y ${rango.ph[1]}<br>`;
    if (!dentroCE) mensaje += `- CE: entre ${rango.ce[0]} y ${rango.ce[1]} mS/cm<br>`;
    if (!dentroTemp) mensaje += `- Temperatura: entre ${rango.temperatura[0]} y ${rango.temperatura[1]} °C<br>`;
    if (!dentroHumedad) mensaje += `- Humedad: entre ${rango.humedad[0]}% y ${rango.humedad[1]}%<br>`;
    resultado.innerHTML = mensaje;
    resultado.style.color = "red";
  }

  // Mostrar el botón de guardar
  document.getElementById('guardarResultadoParametros').style.display = 'inline-block';
});

// Función para mostrar todos los parámetros guardados (Dexie + Supabase)
async function mostrarParametrosCompletos() {
  const cont = document.getElementById("resultadosGuardadosParametros");
  cont.innerHTML = "<h3>Parámetros guardados:</h3>";

  // --- 1. Obtener datos de Dexie ---
  const datosDexie = await db.parametros.reverse().toArray();

  // --- 2. Obtener datos de Supabase ---
  let datosSupabase = [];
  if (navigator.onLine) {
    try {
      const { data, error } = await supabaseClient
        .from('parametros')
        .select('*')
        .order('fecha', { ascending: false });
      if (error) throw error;
      datosSupabase = data || [];
    } catch (err) {
      console.warn("Error obteniendo datos de Supabase:", err.message);
    }
  }

  if (datosDexie.length === 0 && datosSupabase.length === 0) {
    cont.innerHTML += "<i>No hay parámetros guardados.</i>";
    return;
  }

  // --- 3. Construir tabla HTML ---
  let tablaHTML = `
    <table border="1" style="border-collapse: collapse; width: 100%; margin-top: 10px;">
      <thead>
        <tr style="background-color: #e0e0e0;">
          <th>Fuente</th>
          <th>Fecha</th>
          <th>Planta / Etapa</th>
          <th>pH</th>
          <th>CE</th>
          <th>Temperatura (°C)</th>
          <th>Humedad (%)</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
  `;

  // --- 3a. Agregar datos de Dexie ---
  datosDexie.forEach(p => {
    const matches = p.texto.match(/Planta: (.+), Etapa: (.+), pH: (.+), CE: (.+), Temp: (.+)°C, Hum: (.+)%/);
    if (matches) {
      tablaHTML += `
        <tr>
          <td>Local (Dexie)</td>
          <td>${new Date(p.fecha).toLocaleString()}</td>
          <td>${matches[1]} / ${matches[2]}</td>
          <td>${matches[3]}</td>
          <td>${matches[4]}</td>
          <td>${matches[5]}</td>
          <td>${matches[6]}</td>
          <td><button onclick="borrarParametro('${p.id}')">Borrar</button></td>
        </tr>
      `;
    }
  });

  // --- 3b. Agregar datos de Supabase ---
  datosSupabase.forEach(p => {
    const matches = p.texto.match(/Planta: (.+), Etapa: (.+), pH: (.+), CE: (.+), Temp: (.+)°C, Hum: (.+)%/);
    if (matches) {
      tablaHTML += `
        <tr>
          <td>Online (Supabase)</td>
          <td>${new Date(p.fecha).toLocaleString()}</td>
          <td>${matches[1]} / ${matches[2]}</td>
          <td>${matches[3]}</td>
          <td>${matches[4]}</td>
          <td>${matches[5]}</td>
          <td>${matches[6]}</td>
          <td><i>No editable</i></td>
        </tr>
      `;
    }
  });

  tablaHTML += `</tbody></table>`;
  cont.innerHTML += tablaHTML;
}

// --- 4. Llamar la función al cargar la página ---
document.addEventListener('DOMContentLoaded', mostrarParametrosCompletos);

// --- 5. Modificar guardarResultadoParametros para actualizar la vista ---
document.getElementById('guardarResultadoParametros').addEventListener('click', async function() {
  const planta = document.getElementById('planta').value;
  const etapa = document.getElementById('etapa').value;
  const ph = document.getElementById('ph').value;
  const ce = document.getElementById('ce').value;
  const temperatura = document.getElementById('temperatura').value;
  const humedad = document.getElementById('humedad').value;

  const texto = `Planta: ${planta}, Etapa: ${etapa}, pH: ${ph}, CE: ${ce}, Temp: ${temperatura}°C, Hum: ${humedad}%`;

  // Guardar en Dexie
  await db.parametros.add({ texto, fecha: new Date().toISOString() });

  // Guardar en Supabase
  if (navigator.onLine) {
    try {
      const { error } = await supabaseClient.from('parametros').insert([{ texto, fecha: new Date().toISOString() }]);
      if (error) throw error;
    } catch (err) {
      console.warn("No se pudo guardar en Supabase:", err.message);
    }
  }

  showToast("Parámetros guardados", "success", 2000);
  mostrarParametrosCompletos(); // Actualizar la tabla combinada
});


// ===============================
// 📦 Base local con Dexie (Offline)
// ===============================
const db = new Dexie("hidrosoftDB");
db.version(2).stores({
  notas: "++id, texto, fecha",
  resultados: "++id, texto, fecha",
  calendario: "++id, evento, fecha, descripcion",
  parametros: "++id, planta, etapa, ph, ce, temperatura, humedad, fecha"
});


// ===============================
// 🧾 1. Funciones: Notas
// ===============================
async function guardarNotaDexie() {
  const nota = document.getElementById("nota").value;
  if (!nota.trim()) return;

  await db.notas.add({ texto: nota, fecha: new Date().toLocaleString() });
  document.getElementById("nota").value = "";
  mostrarNotasDexie();
  showToast("Nota guardada localmente", "success", 2000);
}

async function mostrarNotasDexie() {
  const cont = document.getElementById("notasGuardadas");
  if (!cont) return;
  const notas = await db.notas.reverse().toArray();

  cont.innerHTML = "<h3>Notas guardadas:</h3>";
  if (notas.length === 0) {
    cont.innerHTML += "<i>No hay notas guardadas.</i>";
    return;
  }

  notas.forEach(n => {
    cont.innerHTML += `
      <div class="nota-card">
        <b>${n.fecha}</b>: ${n.texto}
        <button onclick="borrarNotaDexie(${n.id})">Borrar</button>
      </div>`;
  });
}

async function borrarNotaDexie(id) {
  await db.notas.delete(id);
  mostrarNotasDexie();
  showToast("Nota eliminada", "info", 1500);
}

// ===============================
// 📊 2. Funciones: Resultados
// ===============================
async function guardarResultadoDexie(resultadoTexto) {
  await db.resultados.add({ texto: resultadoTexto, fecha: new Date().toLocaleString() });
  mostrarResultadosDexie();
  showToast("Resultado guardado localmente", "success", 2000);
}

async function mostrarResultadosDexie() {
  const cont = document.getElementById("resultadosGuardados");
  if (!cont) return;
  const resultados = await db.resultados.reverse().toArray();

  cont.innerHTML = "<h3>Resultados guardados:</h3>";
  if (resultados.length === 0) {
    cont.innerHTML += "<i>No hay resultados guardados.</i>";
    return;
  }

  resultados.forEach(r => {
    cont.innerHTML += `
      <div class="resultado-card">
        <b>${r.fecha}</b>: ${r.texto}
        <button onclick="borrarResultadoDexie(${r.id})">Borrar</button>
      </div>`;
  });
}

async function borrarResultadoDexie(id) {
  await db.resultados.delete(id);
  mostrarResultadosDexie();
  showToast("Resultado eliminado", "info", 1500);
}

// ===============================
// 📅 3. Funciones: Calendario
// ===============================
async function guardarEventoCalendario() {
  const evento = document.getElementById("evento").value;
  const fecha = document.getElementById("fechaEvento").value;
  const descripcion = document.getElementById("descripcionEvento").value;

  if (!evento.trim() || !fecha.trim()) {
    alert("Completa el nombre y la fecha del evento.");
    return;
  }

  await db.calendario.add({ evento, fecha, descripcion });
  mostrarEventosCalendario();
  showToast("Evento guardado localmente", "success", 2000);
}

async function mostrarEventosCalendario() {
  const cont = document.getElementById("eventosGuardados");
  if (!cont) return;
  const eventos = await db.calendario.reverse().toArray();

  cont.innerHTML = "<h3>Eventos guardados:</h3>";
  if (eventos.length === 0) {
    cont.innerHTML += "<i>No hay eventos registrados.</i>";
    return;
  }

  eventos.forEach(e => {
    cont.innerHTML += `
      <div class="evento-card">
        <b>${e.fecha}</b> - ${e.evento}<br>
        <small>${e.descripcion || ""}</small><br>
        <button onclick="borrarEventoCalendario(${e.id})">Borrar</button>
      </div>`;
  });
}

async function borrarEventoCalendario(id) {
  await db.calendario.delete(id);
  mostrarEventosCalendario();
  showToast("Evento eliminado", "info", 1500);
}

// ===============================
// 🌿 4. Funciones: Parámetros
// ===============================
async function guardarParametros() {
  const planta = document.getElementById("planta").value;
  const etapa = document.getElementById("etapa").value;
  const ph = document.getElementById("ph").value;
  const ce = document.getElementById("ce").value;
  const temperatura = document.getElementById("temperatura").value;
  const humedad = document.getElementById("humedad").value;

  if (!planta || !etapa || !ph || !ce || !temperatura || !humedad) {
    alert("Completa todos los parámetros antes de guardar.");
    return;
  }

  await db.parametros.add({
    planta, etapa, ph, ce, temperatura, humedad,
    fecha: new Date().toLocaleString()
  });
  mostrarParametrosGuardados();
  showToast("Parámetros guardados localmente", "success", 2000);
}

async function mostrarParametrosGuardados() {
  const cont = document.getElementById("parametrosGuardados");
  if (!cont) return;
  const datos = await db.parametros.reverse().toArray();

  cont.innerHTML = "<h3>Parámetros guardados:</h3>";
  if (datos.length === 0) {
    cont.innerHTML += "<i>No hay parámetros guardados.</i>";
    return;
  }

  datos.forEach(p => {
    cont.innerHTML += `
      <div class="parametro-card">
        <b>${p.fecha}</b> - ${p.planta} (${p.etapa})<br>
        pH: ${p.ph}, CE: ${p.ce}, Temp: ${p.temperatura}°C, Hum: ${p.humedad}%<br>
        <button onclick="borrarParametro(${p.id})">Borrar</button>
      </div>`;
  });
}

async function borrarParametro(id) {
  await db.parametros.delete(id);
  mostrarParametrosGuardados();
  showToast("Registro eliminado", "info", 1500);
}

// ===============================
// 🔄 5. Sincronización Dexie ↔ Supabase
// ===============================
async function sincronizar() {
  let errores = [];
  showToast("Sincronizando datos...", "info", 2000);

  // Notas
  for (const n of await db.notas.toArray()) {
    try {
      const { error } = await supabaseClient.from('notas').insert([n]);
      if (error) throw error;
      await db.notas.delete(n.id);
    } catch (e) {
      errores.push(`Nota ${n.id}: ${e.message}`);
    }
  }

  // Resultados
  for (const r of await db.resultados.toArray()) {
    try {
      const { error } = await supabaseClient.from('resultados').insert([r]);
      if (error) throw error;
      await db.resultados.delete(r.id);
    } catch (e) {
      errores.push(`Resultado ${r.id}: ${e.message}`);
    }
  }

  // Calendario
  for (const c of await db.calendario.toArray()) {
    try {
      const { error } = await supabaseClient.from('calendario').insert([c]);
      if (error) throw error;
      await db.calendario.delete(c.id);
    } catch (e) {
      errores.push(`Evento ${c.id}: ${e.message}`);
    }
  }

  // Parámetros
  for (const p of await db.parametros.toArray()) {
    try {
      const { error } = await supabaseClient.from('parametros').insert([p]);
      if (error) throw error;
      await db.parametros.delete(p.id);
    } catch (e) {
      errores.push(`Parámetro ${p.id}: ${e.message}`);
    }
  }

  if (errores.length === 0) {
    showToast("Datos sincronizados correctamente", "success", 3000);
  } else {
    console.warn("Errores de sincronización:", errores);
    showToast("Algunos datos no se pudieron subir", "warning", 3000);
  }
}

// Auto-sincronizar al volver la conexión
window.addEventListener("online", sincronizar);

// ===============================
// 🔔 Función Toast (mensajes visuales)
// ===============================
function showToast(msg, type = "info", time = 2000) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), time);
}




// Mostrar contador de ítems pendientes de sincronización
// Nota: se eliminó el badge visual de "pendientes".
// En su lugar registramos todas las acciones del usuario en 'appUserHistory' y mostramos
// el contenido en el panel principal `#historial`.

function appendUserHistory(entry) {
  try {
    const key = 'appUserHistory';
    const raw = localStorage.getItem(key) || '[]';
    const arr = JSON.parse(raw);
    arr.push(entry);
    while (arr.length > 500) arr.shift();
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (e) { console.error('appendUserHistory error', e); }
  // actualizar vista si estamos mostrando historial
  try { renderHistorialSection(); } catch (e) { /* noop */ }
}

async function renderHistorialSection() {
  const histEl = document.getElementById('historial');
  if (!histEl) return;
  // cabecera
  let html = `<div class="historial-title">Historial completo</div>`;
  // Actividad del usuario
  try {
    const raw = localStorage.getItem('appUserHistory') || '[]';
    const arr = JSON.parse(raw).slice().reverse();
    html += `<div class="historial-subtitle"><strong>Actividad</strong></div>`;
    if (arr.length === 0) html += `<div class="historial-empty">No hay actividad registrada.</div>`;
    html += `<div class="historial-list">`;
    arr.forEach(a => {
      html += `<div class="historial-item"><div class="time">${new Date(a.time).toLocaleString()}</div><div class="kind">${escapeHtml(a.type)}</div><div class="payload">${escapeHtml(JSON.stringify(a, null, 2))}</div></div>`;
    });
    html += `</div>`;
  } catch (e) { html += `<div class="historial-empty">Error cargando actividad</div>`; }

  // Historial de sincronizaciones
  try {
    const raw2 = localStorage.getItem('appSyncHistory') || '[]';
    const arr2 = JSON.parse(raw2).slice().reverse();
    html += `<div style="margin-top:12px"><strong>Sincronizaciones</strong></div>`;
    if (arr2.length === 0) html += `<div class="historial-empty">No hay sincronizaciones registradas.</div>`;
    html += `<div class="historial-list">`;
    arr2.forEach(s => {
      html += `<div class="historial-item"><div class="time">${new Date(s.time).toLocaleString()}</div><div class="kind">${s.ok? 'OK':'ERROR'}</div><div class="payload">Items: ${s.transferred||0}${s.errors?`<div style=\"margin-top:6px;color:#c33\">${escapeHtml(JSON.stringify(s.errors))}</div>`:''}</div></div>`;
    });
    html += `</div>`;
  } catch (e) { html += `<div class="historial-empty">Error cargando sincronizaciones</div>`; }

  // Notificaciones
  try {
    const raw3 = localStorage.getItem('appNotificationHistory') || '[]';
    const arr3 = JSON.parse(raw3).slice().reverse();
    html += `<div style="margin-top:12px"><strong>Notificaciones</strong></div>`;
    if (arr3.length === 0) html += `<div class="historial-empty">No hay notificaciones.</div>`;
    html += `<div class="historial-list">`;
    arr3.forEach(n => {
      html += `<div class="historial-item"><div class="time">${new Date(n.time).toLocaleString()}</div><div class="kind">${n.type}</div><div class="payload">${escapeHtml(n.message)}</div></div>`;
    });
    html += `</div>`;
  } catch (e) { html += `<div class="historial-empty">Error cargando notificaciones</div>`; }

  histEl.innerHTML = html;
}

// Panel de historial (notificaciones + sincronizaciones + pendientes)
function toggleHistoryPanel() {
  let panel = document.getElementById('historyPanel');
  if (panel) { panel.remove(); return; }
  createHistoryPanel();
}

function createHistoryPanel() {
  const panel = document.createElement('div');
  panel.id = 'historyPanel';
  panel.className = 'history-panel';

  panel.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <h3>Historial & Pendientes</h3>
      <button class="history-close" aria-label="cerrar">✕</button>
    </div>
    <div class="history-section" id="hist-pendientes">
      <h4>Pendientes</h4>
      <div id="hist-pendientes-list">Cargando...</div>
    </div>
    <div class="history-section" id="hist-sync">
      <h4>Historial de sincronizaciones</h4>
      <div id="hist-sync-list">Cargando...</div>
    </div>
    <div class="history-section" id="hist-notifs">
      <h4>Notificaciones</h4>
      <div id="hist-notifs-list">Cargando...</div>
    </div>
  `;

  document.body.appendChild(panel);
  panel.querySelector('.history-close').addEventListener('click', () => panel.remove());
  renderHistoryPanel();
}

async function renderHistoryPanel() {
  const pendientesList = document.getElementById('hist-pendientes-list');
  const syncList = document.getElementById('hist-sync-list');
  const notifsList = document.getElementById('hist-notifs-list');
  if (!pendientesList || !syncList || !notifsList) return;

  // cargar pendientes desde Dexie
  try {
    const notas = await db.notas.toArray();
    const resultados = await db.resultados.toArray();
    let html = '';
    if (notas.length === 0 && resultados.length === 0) html = '<i>No hay pendientes.</i>';
    notas.forEach(n => { html += `<div class="history-item"><b>Nota</b> <div>${n.fecha}</div><div style="margin-top:6px">${escapeHtml(n.texto)}</div></div>`; });
    resultados.forEach(r => { html += `<div class="history-item"><b>Resultado</b> <div>${r.fecha}</div><pre style="margin-top:6px">${escapeHtml(r.texto)}</pre></div>`; });
    pendientesList.innerHTML = html;
  } catch (e) { pendientesList.innerHTML = '<i>Error cargando pendientes</i>'; }

  // cargar historial de sincronizaciones
  try {
    const raw = localStorage.getItem('appSyncHistory') || '[]';
    const arr = JSON.parse(raw).slice().reverse();
    if (arr.length === 0) syncList.innerHTML = '<i>No hay historial de sincronizaciones.</i>';
    else syncList.innerHTML = arr.map(s => `<div class="history-item"><b>${s.ok? 'OK':'ERROR'}</b> <div>${new Date(s.time).toLocaleString()}</div><div>Items: ${s.transferred||0}</div>${s.errors?`<div style="margin-top:6px;color:#fca5a5">${escapeHtml(JSON.stringify(s.errors))}</div>`:''}</div>`).join('');
  } catch (e) { syncList.innerHTML = '<i>Error cargando historial</i>'; }

  // cargar historial de notificaciones
  try {
    const raw2 = localStorage.getItem('appNotificationHistory') || '[]';
    const arr2 = JSON.parse(raw2).slice().reverse();
    if (arr2.length === 0) notifsList.innerHTML = '<i>No hay notificaciones.</i>';
    else notifsList.innerHTML = arr2.map(n => `<div class="history-item"><div>${new Date(n.time).toLocaleString()}</div><div style="margin-top:6px">${escapeHtml(n.message)}</div></div>`).join('');
  } catch (e) { notifsList.innerHTML = '<i>Error cargando notificaciones</i>'; }
}

function renderHistoryPanelIfOpen() {
  if (document.getElementById('historyPanel')) renderHistoryPanel();
}

function escapeHtml(s) { return (''+s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

let ultimoResultadoCalculadora = "";

document.addEventListener('DOMContentLoaded', function() {
  const guardarBtn = document.getElementById('guardarResultadoBtn');
  if (guardarBtn) guardarBtn.style.display = "none";
  const form = document.getElementById('nutrientForm');
  const resultContainer = document.getElementById('result');
  if (form && resultContainer && guardarBtn) {
    form.addEventListener('submit', function(event) {
      setTimeout(() => {
        ultimoResultadoCalculadora = resultContainer.textContent || resultContainer.innerText || "";
        guardarBtn.style.display = "block";
      }, 50); 
    });
  }
});

async function guardarResultadoDexie() {
  if (!ultimoResultadoCalculadora.trim()) return;
  await db.resultados.add({ texto: ultimoResultadoCalculadora, fecha: new Date().toLocaleString() });
  mostrarResultadosDexie();
  // Intentar sincronizar inmediatamente si estamos online (silencioso)
  if (navigator.onLine) {
    try { await sincronizar({ notify: false }); } catch (e) { console.error('Auto-sync resultado:', e); }
  }
  try { appendUserHistory({ time: new Date().toISOString(), type: 'resultado_guardado', texto: ultimoResultadoCalculadora }); } catch (e) { /* noop */ }
}

async function mostrarResultadosDexie() {
  let contenedor = document.getElementById("resultadosGuardados");
  if (!contenedor) return;
  const resultados = await db.resultados.reverse().toArray();
  contenedor.innerHTML = "<h3>Resultados guardados offline:</h3>";
  if (resultados.length === 0) contenedor.innerHTML += "<i>No hay resultados guardados.</i>";
  resultados.forEach(r => {
    contenedor.innerHTML += `<div style="border:1px solid #999;padding:8px;margin:4px 0;">
      <b>${r.fecha}</b>:<br><pre>${r.texto}</pre>
      <button onclick="borrarResultadoDexie(${r.id})">Borrar</button>
    </div>`;
  });
}

async function borrarResultadoDexie(id) {
  await db.resultados.delete(id);
  mostrarResultadosDexie();
  try { appendUserHistory({ time: new Date().toISOString(), type: 'resultado_borrado', id }); } catch (e) { /* noop */ }
}

document.addEventListener("DOMContentLoaded", mostrarResultadosDexie);

// ========== AVISO EN TIEMPO REAL DE CONEXIÓN (TOASTS ANIMADOS) ==========
// Helper: inyectar estilos para los toasts si no existen
function ensureToastStyles() {
  // Los estilos de toast e historial ahora están en style.css; aquí solo aseguramos
  // que el contenedor exista (no inyectamos estilos desde JS).
  if (!document.querySelector('.toast-container')) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

// Elegir paleta según el contraste de la página
function pickToastPalette() {
  try {
    const bodyStyle = getComputedStyle(document.body);
    const bg = bodyStyle.backgroundColor || '#ffffff';
    const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    let r=255,g=255,b=255;
    if (m) { r = +m[1]; g = +m[2]; b = +m[3]; }
    // cálculo simple de luminancia
    const lum = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
    const darkBg = lum < 0.5;

    if (darkBg) {
      return {
        textColor: '#ffffff',
        // tonos azules translúcidos (estética tipo "glass") para online/sync
        success: ['rgba(14,165,233,0.16)', 'rgba(3,105,161,0.12)'],
        error: ['rgba(239,68,68,0.18)', 'rgba(220,38,38,0.12)'],
        info: ['rgba(14,165,233,0.16)', 'rgba(3,105,161,0.12)'],
        offline: ['rgba(99,102,241,0.12)', 'rgba(79,70,229,0.08)'],
        panelBg: 'rgba(17,24,39,0.96)',
        panelText: '#f9fafb',
        itemBg: 'rgba(255,255,255,0.04)'
      };
    }
    return {
      textColor: '#042033',
      // tonos azules translúcidos para continuidad visual (online / sync)
      success: ['rgba(14,165,233,0.16)', 'rgba(3,105,161,0.10)'],
      error: ['rgba(239,68,68,0.14)', 'rgba(220,38,38,0.10)'],
      info: ['rgba(14,165,233,0.16)', 'rgba(3,105,161,0.10)'],
      offline: ['rgba(17,24,39,0.08)', 'rgba(55,65,81,0.06)'],
      panelBg: '#ffffff',
      panelText: '#0f172a',
      itemBg: 'rgba(15,23,42,0.04)'
    };
  } catch (e) {
    return {
      textColor: '#ffffff',
      success: ['#059669', '#10b981'],
      error: ['#dc2626', '#ef4444'],
      info: ['#1f2937', '#6366f1'],
      offline: ['#374151', '#4b5563'],
      panelBg: '#ffffff',
      panelText: '#0f172a',
      itemBg: 'rgba(15,23,42,0.04)'
    };
  }
}

// Mostrar toast elegante (type: 'success'|'error'|'info'|'offline')
function showToast(message, type = 'info', ttl = 3500) {
  ensureToastStyles();
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;

  const emojiMap = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    offline: '📴'
  };

  const emoji = emojiMap[type] || '🔔';

  el.innerHTML = `
    <div class="toast-emoji">${emoji}</div>
    <div class="toast-text">${message}</div>
    <button class="toast-close" aria-label="cerrar">✕</button>
  `;

  container.appendChild(el);

  // Auto hide (ttl === 0 => sticky)
  let timeoutId = null;
  if (ttl > 0) {
    timeoutId = setTimeout(() => {
      el.classList.add('hide');
      setTimeout(() => el.remove(), 240);
    }, ttl);
  }

  // Close button
  const closeBtn = el.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    if (timeoutId) clearTimeout(timeoutId);
    el.classList.add('hide');
    setTimeout(() => el.remove(), 160);
  });

  // Allow click on the toast itself to dismiss
  el.addEventListener('click', (ev) => {
    // ignore clicks on the close button (already handled)
    if (ev.target === closeBtn) return;
    if (timeoutId) clearTimeout(timeoutId);
    el.classList.add('hide');
    setTimeout(() => el.remove(), 160);
  });

  // Guardar en historial de notificaciones (localStorage, mantener 50)
  try {
    const key = 'appNotificationHistory';
    const raw = localStorage.getItem(key) || '[]';
    const list = JSON.parse(raw);
    list.push({ time: new Date().toISOString(), type, message });
    while (list.length > 50) list.shift();
    localStorage.setItem(key, JSON.stringify(list));
    // También registrar en el historial unificado del usuario
    try { appendUserHistory({ time: new Date().toISOString(), type: `notif_${type}`, message }); } catch (e) { /* noop */ }
  } catch (e) { /* noop */ }

  return el;
}

// Estado de sincronización automática
let __autoSyncIntervalId = null;
const AUTO_SYNC_INTERVAL_MS = 5 * 60 * 1000; // 5 minutos

function startAutoSync() {
  // Si ya está corriendo, no hacemos nada
  if (__autoSyncIntervalId) return;
  // Hacer una sincronización inmediata
  (async () => {
    try {
      await sincronizar({notify:false});
    } catch (e) { /* ignore */ }
  })();
  __autoSyncIntervalId = setInterval(async () => {
    try {
      await sincronizar({notify:false});
    } catch (e) { console.error('Auto-sync error', e); }
  }, AUTO_SYNC_INTERVAL_MS);
}

function stopAutoSync() {
  if (!__autoSyncIntervalId) return;
  clearInterval(__autoSyncIntervalId);
  __autoSyncIntervalId = null;
}

function mostrarEstadoConexion() {
  // Mostrar un toast elegante cuando cambia el estado
  if (navigator.onLine) {
    showToast('Conexión restaurada — trabajando online', 'success', 3000);
    // al volver online, iniciar auto-sync y lanzar sincronización inmediata
    startAutoSync();
    // también intentar sincronizar inmediatamente con notificaciones
    sincronizar({notify:true}).catch(e => console.error(e));
  } else {
    showToast('Has pasado a MODO OFFLINE', 'offline', 0);
    // Detener sincronización periódica mientras estemos offline
    stopAutoSync();
  }
}

window.addEventListener('online', mostrarEstadoConexion);
window.addEventListener('offline', mostrarEstadoConexion);
document.addEventListener('DOMContentLoaded', () => {
  mostrarEstadoConexion();
  // Si al cargar ya estamos online, arrancar auto-sync
  if (navigator.onLine) startAutoSync();
  // renderizar historial al inicio
  try { renderHistorialSection(); } catch (e) { /* noop */ }
});

// Cuando el usuario abre la sección 'historial', forzamos un render del historial.
document.addEventListener('DOMContentLoaded', () => {
  const hist = document.getElementById('historial');
  if (!hist) return;
  // Si cambia el estilo (display) o el contenido del atributo, renderizar
  const obs = new MutationObserver(() => {
    try { if (hist.offsetParent !== null) renderHistorialSection(); } catch (e) { }
  });
  obs.observe(hist, { attributes: true, attributeFilter: ['style', 'class'] });
  // también refrescar cuando se muestran otras secciones por click en el menú
  document.querySelectorAll('.sidebar .menu-items-static > .menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const text = this.textContent.toLowerCase();
      if (text.includes('historial')) {
        try { renderHistorialSection(); } catch (e) { }
      }
    });
  });
});

// ========== MEJORAS VISUALES DE NOTAS Y RESULTADOS ==========
async function mostrarNotasDexie() {
  let contenedor = document.getElementById("notasGuardadas");
  if (!contenedor) return;
  const notas = await db.notas.reverse().toArray();
  contenedor.innerHTML = "<h3>Notas guardadas:</h3>";
  if (notas.length === 0) contenedor.innerHTML += "<i>No hay notas guardadas.</i>";
  notas.forEach(n => {
    contenedor.innerHTML += `
      <div>
        <div>
          <b>${n.fecha}</b><br>
          <span>${n.texto}</span>
        </div>
        <button onclick="borrarNotaDexie(${n.id})">Borrar</button>
      </div>
    `;
  });
}

async function mostrarResultadosDexie() {
  let contenedor = document.getElementById("resultadosGuardados");
  if (!contenedor) return;
  const resultados = await db.resultados.reverse().toArray();
  contenedor.innerHTML = "<h3>Resultados guardados offline:</h3>";
  if (resultados.length === 0) contenedor.innerHTML += "<i>No hay resultados guardados.</i>";
  resultados.forEach(r => {
    contenedor.innerHTML += `
      <div>
        <div>
          <b>${r.fecha}</b><br>
          <pre style="margin:6px 0 0 0; font-size:1em;">${r.texto}</pre>
        </div>
        <button onclick="borrarResultadoDexie(${r.id})">Borrar</button>
      </div>
    `;
  });
}
// ... el resto de tu Dexie.js y lógica sigue igual ...

async function mostrarNotasDexie() {
  let contenedor = document.getElementById("notasGuardadas");
  if (!contenedor) return;
  const notas = await db.notas.reverse().toArray();
  contenedor.innerHTML = "<h3>Notas guardadas:</h3>";
  if (notas.length === 0) contenedor.innerHTML += "<i>No hay notas guardadas.</i>";
  notas.forEach(n => {
    contenedor.innerHTML += `
      <div class="nota-tarjeta">
        <span class="nota-icono" title="Nota">📝</span>
        <div class="nota-contenido">
          <div class="nota-fecha">${n.fecha}</div>
          <div class="nota-texto">${n.texto}</div>
        </div>
        <button onclick="borrarNotaDexie(${n.id})" title="Borrar nota">Borrar</button>
      </div>
    `;
  });
  try { renderHistorialSection(); } catch (e) { /* noop */ }
}

async function mostrarResultadosDexie() {
  let contenedor = document.getElementById("resultadosGuardados");
  if (!contenedor) return;
  const resultados = await db.resultados.reverse().toArray();
  contenedor.innerHTML = "<h3>Resultados guardados offline:</h3>";
  if (resultados.length === 0) contenedor.innerHTML += "<i>No hay resultados guardados.</i>";
  resultados.forEach(r => {
    contenedor.innerHTML += `
      <div class="resultado-tarjeta">
        <span class="resultado-icono" title="Resultado">📊</span>
        <div class="resultado-contenido">
          <div class="resultado-fecha">${r.fecha}</div>
          <div class="resultado-texto">${r.texto}</div>
        </div>
        <button onclick="borrarResultadoDexie(${r.id})" title="Borrar resultado">Borrar</button>
      </div>
    `;
  });
  try { renderHistorialSection(); } catch (e) { /* noop */ }
}

//Mejora en parametros
function verificarParametros() {
  const planta = document.getElementById('planta').value;
  const etapa = document.getElementById('etapa').value;

  // Tomar los valores en string para validar texto
  const phValor = document.getElementById('ph').value.trim();
  const ceValor = document.getElementById('ce').value.trim();
  const tempValor = document.getElementById('temperatura').value.trim();
  const humedadValor = document.getElementById('humedad').value.trim();

  const resultado = document.getElementById('resultado');

  // Validación: campos vacíos
  if (!phValor || !ceValor || !tempValor || !humedadValor) {
    resultado.innerHTML = `<span style="color:red;">Por favor, completa todos los campos antes de verificar.</span>`;
    return;
  }

  // Validación: caracteres no numéricos
  if (
    isNaN(phValor) || isNaN(ceValor) || isNaN(tempValor) || isNaN(humedadValor)
  ) {
    resultado.innerHTML = `<span style="color:red;">Solo se permiten números en los campos. No ingreses letras ni símbolos.</span>`;
    return;
  }

  // Convertir a número para validaciones siguientes
  const ph = parseFloat(phValor);
  const ce = parseFloat(ceValor);
  const temperatura = parseFloat(tempValor);
  const humedad = parseFloat(humedadValor);

  // Validación: valores negativos
  if (ph < 0 || ce < 0 || temperatura < 0 || humedad < 0) {
    resultado.innerHTML = `<span style="color:red;">No se permiten valores negativos en ningún parámetro.</span>`;
    return;
  }

  // Validación: decimales en humedad (si quieres solo enteros)
  if (!/^\d+(\.\d+)?$/.test(humedadValor) || parseFloat(humedadValor) !== parseInt(humedadValor)) {
    resultado.innerHTML = `<span style="color:red;">La humedad debe ser un número entero entre 0 y 100.</span>`;
    return;
  }
  if (humedad > 100) {
    resultado.innerHTML = `<span style="color:red;">La humedad no puede ser mayor a 100%.</span>`;
    return;
  }

  // Verifica si la etapa existe para la planta seleccionada
  const rango = rangosCultivos?.[planta]?.[etapa];

  if (!rango) {
    resultado.innerHTML = `<span style="color:red;">La etapa <b>${etapa}</b> no existe para la planta <b>${planta.charAt(0).toUpperCase() + planta.slice(1)}</b>.<br>Por favor, selecciona una etapa válida.</span>`;
    return;
  }

  // Verificación por parámetro
  const dentroPH = ph >= rango.ph[0] && ph <= rango.ph[1];
  const dentroCE = ce >= rango.ce[0] && ce <= rango.ce[1];
  const dentroTemp = temperatura >= rango.temperatura[0] && temperatura <= rango.temperatura[1];
  const dentroHumedad = humedad >= rango.humedad[0] && humedad <= rango.humedad[1];

  let mensaje = "";
  if (dentroPH && dentroCE && dentroTemp && dentroHumedad) {
    mensaje = `<span style="color:green;">✅ Todos los parámetros están dentro del rango recomendado para la etapa seleccionada.</span>`;
    resultado.style.color = "green";
  } else {
    mensaje = `<span style="color:red;">❌ Algunos parámetros están fuera del rango recomendado:</span><ul style="color:red;">`;
    if (!dentroPH) mensaje += `<li>pH: ingresaste <b>${ph}</b> (recomendado: <b>${rango.ph[0]} - ${rango.ph[1]}</b>)</li>`;
    if (!dentroCE) mensaje += `<li>CE: ingresaste <b>${ce}</b> (recomendado: <b>${rango.ce[0]} - ${rango.ce[1]} mS/cm</b>)</li>`;
    if (!dentroTemp) mensaje += `<li>Temperatura: ingresaste <b>${temperatura}°C</b> (recomendado: <b>${rango.temperatura[0]} - ${rango.temperatura[1]}°C</b>)</li>`;
    if (!dentroHumedad) mensaje += `<li>Humedad: ingresaste <b>${humedad}%</b> (recomendado: <b>${rango.humedad[0]}% - ${rango.humedad[1]}%</b>)</li>`;
    mensaje += "</ul>";
    resultado.style.color = "red";
  }
  resultado.innerHTML = mensaje;
}


async function sincronizar(options = {}) {
  const notify = options.notify !== false;
  if (!navigator.onLine) {
    if (notify) showToast('No hay conexión. La sincronización quedará en cola.', 'offline', 3500);
    return { ok: false, reason: 'offline' };
  }

  let progressToast;
  if (notify) progressToast = showToast('Sincronizando datos...', 'info', 0);

  try {
    const notasLocales = await db.notas.toArray();
    const resultadosLocales = await db.resultados.toArray();

    if ((notasLocales.length === 0) && (resultadosLocales.length === 0)) {
      if (notify) {
        if (progressToast) progressToast.remove();
        showToast('No hay datos locales para sincronizar.', 'info', 2500);
      }
      // registrar en historial que no había datos para sincronizar
      try { appendUserHistory({ time: new Date().toISOString(), type: 'sincronizar_sin_datos' }); } catch (e) { /* noop */ }
      try { renderHistorialSection(); } catch (e) { /* noop */ }
      return { ok: true, transferred: 0 };
    }

    const errores = [];
    let transferred = 0;

    // Sincronizar notas
    for (const n of notasLocales) {
      try {
        const payload = { texto: n.texto, fecha: n.fecha };
        const { data, error } = await supabaseClient.from('notas').insert([payload]);
        if (error) {
          errores.push(`Nota id=${n.id}: ${error.message}`);
        } else {
          await db.notas.delete(n.id);
          transferred++;
        }
      } catch (e) {
        errores.push(`Nota id=${n.id}: ${e.message || e}`);
      }
    }

    // Sincronizar resultados
    for (const r of resultadosLocales) {
      try {
        const payload = { texto: r.texto, fecha: r.fecha };
        const { data, error } = await supabaseClient.from('resultados').insert([payload]);
        if (error) {
          errores.push(`Resultado id=${r.id}: ${error.message}`);
        } else {
          await db.resultados.delete(r.id);
          transferred++;
        }
      } catch (e) {
        errores.push(`Resultado id=${r.id}: ${e.message || e}`);
      }
    }

    // Refrescar vistas locales
    try { mostrarNotasDexie(); } catch (e) { /* noop */ }
    try { mostrarResultadosDexie(); } catch (e) { /* noop */ }

    if (progressToast) progressToast.remove();

    if (errores.length) {
      if (notify) showToast(`Sincronizado con errores (${transferred} items). Revisa la consola.`, 'error', 6000);
      console.warn('Errores de sincronización:', errores);
      try { appendUserHistory({ time: new Date().toISOString(), type: 'sincronizacion', ok:false, transferred, errors: errores.slice(0,5) }); } catch (e) { /* noop */ }
      // Guardar en historial de sincronizaciones
      try {
        const key = 'appSyncHistory';
        const raw = localStorage.getItem(key) || '[]';
        const arr = JSON.parse(raw);
        arr.push({ time: new Date().toISOString(), ok: false, transferred, errors: errores.slice(0,5) });
        while (arr.length > 50) arr.shift();
        localStorage.setItem(key, JSON.stringify(arr));
      } catch (e) { /* noop */ }
      renderHistoryPanelIfOpen();
      return { ok: false, errors: errores, transferred };
    } else {
      if (notify) showToast(`Sincronización completada (${transferred} items).`, 'success', 3500);
      try { appendUserHistory({ time: new Date().toISOString(), type: 'sincronizacion', ok:true, transferred }); } catch (e) { /* noop */ }
      try {
        const key = 'appSyncHistory';
        const raw = localStorage.getItem(key) || '[]';
        const arr = JSON.parse(raw);
        arr.push({ time: new Date().toISOString(), ok: true, transferred });
        while (arr.length > 50) arr.shift();
        localStorage.setItem(key, JSON.stringify(arr));
      } catch (e) { /* noop */ }
      renderHistoryPanelIfOpen();
      return { ok: true, transferred };
    }
  } catch (err) {
    if (progressToast) progressToast.remove();
    console.error('Error en sincronizar:', err);
    if (notify) showToast('Ocurrió un error durante la sincronización. Mira la consola.', 'error', 4500);
    return { ok: false, reason: 'exception', error: String(err) };
  }
}

// Exponer la función para la consola y añadir un botón visible para el usuario
// Exponer la función para la consola (se mantiene) — botón manual eliminado
window.sincronizar = sincronizar;
document.addEventListener('DOMContentLoaded', () => {

});


//concejos
// === Consejos aleatorios de hidroponía ===
const consejos = [
  "Mantén el pH entre 5.5 y 6.5 para una mejor absorción de nutrientes.",
  "Evita la exposición directa al sol del depósito de agua para prevenir algas.",
  "Cambia la solución nutritiva cada 10 a 14 días para evitar desequilibrios.",
  "Limpia los tubos y recipientes regularmente para evitar obstrucciones.",
  "Usa agua sin cloro o déjala reposar 24 horas antes de usarla.",
  "Verifica la temperatura de la solución: lo ideal es entre 18 y 24 °C.",
  "No sobrealimentes las plantas; un exceso de nutrientes puede dañarlas.",
  "Asegúrate de que las raíces reciban suficiente oxígeno.",
  "Mide la conductividad eléctrica (CE) con frecuencia para mantener el equilibrio.",
  "Controla la humedad del ambiente para prevenir hongos y moho."
];

// Función para mostrar un consejo aleatorio
function mostrarConsejoAleatorio() {
  const randomIndex = Math.floor(Math.random() * consejos.length);
  document.getElementById('consejo-texto').textContent = `"${consejos[randomIndex]}"`;
}

// Mostrar un consejo distinto al abrir la página
window.addEventListener('DOMContentLoaded', mostrarConsejoAleatorio);

// Botón para generar un nuevo consejo
document.getElementById('nuevoConsejoBtn').addEventListener('click', mostrarConsejoAleatorio);



//cargar al principio home 
// Mostrar Home al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  showContent('home');
});
