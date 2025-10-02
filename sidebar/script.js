

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