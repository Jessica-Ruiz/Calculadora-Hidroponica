// dexie.js - versión unificada para Hidrosoft
// Incluye: DB (notas, resultados, calculadora, calendario, parametros), UI helpers,
// toasts, historial y sincronización básica (stub).

// --- Inicializar Dexie ---
const db = new Dexie("hidrosoftDB");
db.version(1).stores({
  notas: "++id, texto, fecha",
  resultados: "++id, texto, fecha",
  calculadora: "++id, planta, litros, texto, fecha",
  calendario: "++id, planta, fechaSiembra, resumen, fecha",
  parametros: "++id, planta, etapa, ph, ce, temperatura, humedad, resultado, fecha"
});

// --- Helpers de historial / localStorage ---
function appendUserHistory(entry) {
  try {
    const key = 'appUserHistory';
    const raw = localStorage.getItem(key) || '[]';
    const arr = JSON.parse(raw);
    arr.push(entry);
    while (arr.length > 500) arr.shift();
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (e) { console.error('appendUserHistory error', e); }
  try { renderHistorialSection(); } catch (e) { /* noop */ }
}

function recordSyncHistory(entry) {
  try {
    const key = 'appSyncHistory';
    const raw = localStorage.getItem(key) || '[]';
    const arr = JSON.parse(raw);
    arr.push(entry);
    while (arr.length > 200) arr.shift();
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (e) { console.error('recordSyncHistory', e); }
}

function escapeHtml(s) { return (''+s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// --- Toasters elegantes ---
function ensureToastStyles() {
  if (!document.querySelector('.toast-container')) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    container.style.position = 'fixed';
    container.style.right = '16px';
    container.style.top = '16px';
    container.style.zIndex = 9999;
    document.body.appendChild(container);
  }
}

function showToast(message, type = 'info', ttl = 3500) {
  ensureToastStyles();
  const container = document.querySelector('.toast-container');
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.style.marginTop = '8px';
  el.style.padding = '10px 12px';
  el.style.borderRadius = '10px';
  el.style.boxShadow = '0 6px 18px rgba(2,6,23,0.12)';
  el.style.background = type === 'error' ? '#fee2e2' : (type === 'success' ? '#ecfeff' : '#f1f5f9');
  el.style.color = '#04111a';
  el.innerHTML = `<strong style="margin-right:8px">${type==='success'?'✅': type==='error'?'❌': type==='offline'?'📴':'ℹ️'}</strong> <span>${escapeHtml(message)}</span> <button style="float:right;background:none;border:none;cursor:pointer">✕</button>`;
  container.appendChild(el);
  const close = el.querySelector('button');
  const timeoutId = ttl > 0 ? setTimeout(() => { el.remove(); }, ttl) : null;
  close.addEventListener('click', () => { if (timeoutId) clearTimeout(timeoutId); el.remove(); });
  // guardar en historial de notifs
  try {
    const key = 'appNotificationHistory';
    const raw = localStorage.getItem(key) || '[]';
    const list = JSON.parse(raw);
    list.push({ time: new Date().toISOString(), type, message });
    while (list.length > 50) list.shift();
    localStorage.setItem(key, JSON.stringify(list));
    appendUserHistory({ time: new Date().toISOString(), type: `notif_${type}`, message });
  } catch (e) { /* noop */ }
  return el;
}

// --- Mostrar estado de conexión ---
function mostrarEstadoConexion() {
  if (navigator.onLine) {
    showToast('Conexión restaurada — trabajando online', 'success', 3000);
    startAutoSync();
    sincronizar({ notify: true }).catch(e => console.error('sync on online', e));
  } else {
    showToast('Has pasado a MODO OFFLINE', 'offline', 0);
    stopAutoSync();
  }
}
window.addEventListener('online', mostrarEstadoConexion);
window.addEventListener('offline', mostrarEstadoConexion);

// --- Auto sync (interval) ---
let __autoSyncIntervalId = null;
const AUTO_SYNC_INTERVAL_MS = 5 * 60 * 1000; // 5 min
function startAutoSync() {
  if (__autoSyncIntervalId) return;
  (async () => { try { await sincronizar({ notify: false }); } catch(e){} })();
  __autoSyncIntervalId = setInterval(async () => { try { await sincronizar({ notify: false }); } catch(e){ console.error('Auto-sync error', e); } }, AUTO_SYNC_INTERVAL_MS);
}
function stopAutoSync() { if (!__autoSyncIntervalId) return; clearInterval(__autoSyncIntervalId); __autoSyncIntervalId = null; }

// --- Sincronización (stub) ---
// Implementa aquí la llamada real a tu backend (Supabase / API).
// La función devuelve un objeto con { ok, transferred, errors }
async function sincronizar(opts = { notify: true }) {
  // Ejemplo: enviar notas/resultados pendientes a servidor
  try {
    const notas = await db.notas.toArray();
    const resultados = await db.resultados.toArray();
    const calculos = await db.calculadora.toArray();
    const calendarios = await db.calendario.toArray();
    const parametros = await db.parametros.toArray();

    // Si no hay items, retorna rapido
    const total = notas.length + resultados.length + calculos.length + calendarios.length + parametros.length;
    if (total === 0) {
      if (opts.notify) showToast('Nada que sincronizar', 'info', 2000);
      recordSyncHistory({ time: new Date().toISOString(), ok: true, transferred: 0 });
      return { ok: true, transferred: 0 };
    }

    // AQUI: reemplaza con tu lógica real de subida (fetch / supabase)
    // Por ahora simulamos un envío (éxito)
    await new Promise(r => setTimeout(r, 500));

    // Si todo ok, borramos los items locales o marcamos como sincronizados.
    // En este ejemplo simple, no borro automáticamente para que usuario pueda revisar.
    recordSyncHistory({ time: new Date().toISOString(), ok: true, transferred: total });
    if (opts.notify) showToast(`Sincronizados ${total} items (simulado)`, 'success', 3000);
    return { ok: true, transferred: total };
  } catch (e) {
    recordSyncHistory({ time: new Date().toISOString(), ok: false, errors: e.message || e });
    if (opts.notify) showToast('Error al sincronizar: ' + (e.message||e), 'error', 6000);
    throw e;
  }
}

// --- HISTORIAL (render en sección #historial) ---
async function renderHistorialSection() {
  const histEl = document.getElementById('historial');
  if (!histEl) return;
  let html = `<div class="historial-title">Historial completo</div>`;
  try {
    const raw = localStorage.getItem('appUserHistory') || '[]';
    const arr = JSON.parse(raw).slice().reverse();
    html += `<div class="historial-subtitle"><strong>Actividad</strong></div>`;
    if (arr.length === 0) html += `<div class="historial-empty">No hay actividad registrada.</div>`;
    html += `<div class="historial-list">`;
    arr.forEach(a => {
      html += `<div class="historial-item"><div class="time">${new Date(a.time).toLocaleString()}</div><div class="kind">${escapeHtml(a.type)}</div><div class="payload"><pre>${escapeHtml(JSON.stringify(a, null, 2))}</pre></div></div>`;
    });
    html += `</div>`;
  } catch (e) { html += `<div class="historial-empty">Error cargando actividad</div>`; }

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

// --- MOSTRAR PENDIENTES / PANEL HISTORY ---
async function renderHistoryPanel() {
  const pendientesListEl = document.getElementById('hist-pendientes-list');
  if (!pendientesListEl) return;
  try {
    const notas = await db.notas.reverse().toArray();
    const resultados = await db.resultados.reverse().toArray();
    let html = '';
    if (notas.length === 0 && resultados.length === 0) html = '<i>No hay pendientes.</i>';
    notas.forEach(n => { html += `<div class="history-item"><b>Nota</b><div>${n.fecha}</div><div style="margin-top:6px">${escapeHtml(n.texto)}</div></div>`; });
    resultados.forEach(r => { html += `<div class="history-item"><b>Resultado</b><div>${r.fecha}</div><pre style="margin-top:6px">${escapeHtml(r.texto)}</pre></div>`; });
    pendientesListEl.innerHTML = html;
  } catch (e) { pendientesListEl.innerHTML = '<i>Error cargando pendientes</i>'; }
}

// --- NOTAS CRUD ---
async function guardarNotaDexie() {
  const el = document.getElementById('nota');
  if (!el) return;
  const nota = el.value || '';
  if (!nota.trim()) return;
  const fecha = new Date().toLocaleString();
  const id = await db.notas.add({ texto: nota, fecha });
  el.value = '';
  appendUserHistory({ time: new Date().toISOString(), type: 'nota_guardada', texto: nota });
  showToast('Nota guardada', 'success', 2000);
  await mostrarNotasDexie();
  if (navigator.onLine) { try { await sincronizar({ notify: false }); } catch(e){ console.error('auto-sync nota', e); } }
}

async function mostrarNotasDexie() {
  const contenedor = document.getElementById('notasGuardadas');
  if (!contenedor) return;
  const notas = await db.notas.reverse().toArray();
  contenedor.innerHTML = '<h3>Notas guardadas:</h3>';
  if (notas.length === 0) { contenedor.innerHTML += '<i>No hay notas guardadas.</i>'; return; }
  notas.forEach(n => {
    contenedor.innerHTML += `
      <div class="nota-tarjeta">
        <span class="nota-icono">📝</span>
        <div class="nota-contenido">
          <div class="nota-fecha">${n.fecha}</div>
          <div class="nota-texto">${escapeHtml(n.texto)}</div>
        </div>
        <button onclick="borrarNotaDexie(${n.id})" title="Borrar nota">Borrar</button>
      </div>`;
  });
  try { renderHistorialSection(); } catch(e){}
}

async function borrarNotaDexie(id) {
  await db.notas.delete(id);
  appendUserHistory({ time: new Date().toISOString(), type: 'nota_borrada', id });
  showToast('Nota borrada', 'info', 1600);
  mostrarNotasDexie();
}

// --- RESULTADOS (Calculadora) ---
let ultimoResultadoCalculadora = '';

// Asume que hay un <form id="nutrientForm"> y un contenedor #result
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('nutrientForm');
  const resultContainer = document.getElementById('result');
  const guardarBtn = document.getElementById('guardarResultadoBtn');
  if (guardarBtn) guardarBtn.style.display = 'none';
  if (form && resultContainer && guardarBtn) {
    form.addEventListener('submit', function(ev) {
      setTimeout(() => {
        ultimoResultadoCalculadora = (resultContainer.textContent || resultContainer.innerText || '').trim();
        if (ultimoResultadoCalculadora) guardarBtn.style.display = 'inline-block';
      }, 50);
    });
  }
});

async function guardarResultadoDexie() {
  if (!ultimoResultadoCalculadora || !ultimoResultadoCalculadora.trim()) return;
  const fecha = new Date().toLocaleString();
  const id = await db.resultados.add({ texto: ultimoResultadoCalculadora, fecha });
  appendUserHistory({ time: new Date().toISOString(), type: 'resultado_guardado', texto: ultimoResultadoCalculadora });
  showToast('Resultado guardado', 'success', 1800);
  mostrarResultadosDexie();
  if (navigator.onLine) { try { await sincronizar({ notify: false }); } catch(e){ console.error('auto-sync resultado', e); } }
}

async function mostrarResultadosDexie() {
  const contenedor = document.getElementById('resultadosGuardados');
  if (!contenedor) return;
  const resultados = await db.resultados.reverse().toArray();
  contenedor.innerHTML = '<h3>Resultados guardados offline:</h3>';
  if (resultados.length === 0) { contenedor.innerHTML += '<i>No hay resultados guardados.</i>'; return; }
  resultados.forEach(r => {
    contenedor.innerHTML += `
      <div class="resultado-tarjeta">
        <span class="resultado-icono">📊</span>
        <div class="resultado-contenido">
          <div class="resultado-fecha">${r.fecha}</div>
          <div class="resultado-texto">${escapeHtml(r.texto)}</div>
        </div>
        <button onclick="borrarResultadoDexie(${r.id})" title="Borrar resultado">Borrar</button>
      </div>`;
  });
  try { renderHistorialSection(); } catch(e){}
}

async function borrarResultadoDexie(id) {
  await db.resultados.delete(id);
  appendUserHistory({ time: new Date().toISOString(), type: 'resultado_borrado', id });
  showToast('Resultado borrado', 'info', 1600);
  mostrarResultadosDexie();
}

// --- CALCULADORA (ejemplo simple) ---
// Si quieres reemplazar la lógica de cálculo, modifica esta función.
async function calcularNutrientes(e) {
  if (e) e.preventDefault();
  const planta = document.getElementById('option') ? document.getElementById('option').value : 'desconocida';
  const litros = document.getElementById('liters') ? (document.getElementById('liters').value || '0') : '0';
  const texto = `Cálculo para ${planta} — ${litros} L:\n- N: ${(litros*0.1).toFixed(2)} g\n- P: ${(litros*0.03).toFixed(2)} g\n- K: ${(litros*0.05).toFixed(2)} g`;
  const resultContainer = document.getElementById('result');
  if (resultContainer) resultContainer.textContent = texto;
  // actualizar último resultado
  ultimoResultadoCalculadora = texto;
  const guardarBtn = document.getElementById('guardarResultadoBtn');
  if (guardarBtn) guardarBtn.style.display = 'inline-block';
}

// --- CALENDARIO: calcular etapas y guardar ---
async function calcularEtapas() {
  const planta = document.getElementById('options') ? document.getElementById('options').value : 'desconocida';
  const fechaInput = document.getElementById('fechaSiembra');
  if (!fechaInput || !fechaInput.value) return showToast('Selecciona fecha de siembra', 'error', 2000);
  const fechaSiembra = new Date(fechaInput.value);
  const etapas = [
    { nombre: 'Germinación', dias: 7 },
    { nombre: 'Plántula', dias: 14 },
    { nombre: 'Desarrollo vegetativo', dias: 30 },
    { nombre: 'Floración', dias: 20 },
    { nombre: 'Fructificación', dias: 25 },
    { nombre: 'Cosecha', dias: 10 }
  ];
  const tbody = document.getElementById('tablaBody');
  if (tbody) tbody.innerHTML = '';
  let fechaInicio = new Date(fechaSiembra);
  const resumen = [];
  etapas.forEach(et => {
    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaFin.getDate() + et.dias);
    resumen.push({ etapa: et.nombre, inicio: fechaInicio.toLocaleDateString(), fin: fechaFin.toLocaleDateString() });
    if (tbody) tbody.innerHTML += `<tr><td>${et.nombre}</td><td>${fechaInicio.toLocaleDateString()}</td><td>${fechaFin.toLocaleDateString()}</td></tr>`;
    fechaInicio = new Date(fechaFin);
  });
  const tabla = document.getElementById('tablaEtapas');
  if (tabla) tabla.style.display = 'table';
  // guardar en DB
  const fecha = new Date().toLocaleString();
  await db.calendario.add({ planta, fechaSiembra: fechaSiembra.toLocaleDateString(), resumen: JSON.stringify(resumen), fecha });
  appendUserHistory({ time: new Date().toISOString(), type: 'calendario_guardado', planta, fechaSiembra: fechaSiembra.toISOString() });
  showToast('Calendario calculado y guardado', 'success', 2200);
  mostrarCalendariosGuardados();
  if (navigator.onLine) { try { await sincronizar({ notify: false }); } catch(e){ console.error('auto-sync calendario', e); } }
}

async function mostrarCalendariosGuardados() {
  const cont = document.getElementById('resultadosGuardados');
  if (!cont) return;
  const rows = await db.calendario.reverse().toArray();
  cont.innerHTML = '<h3>Calendarios guardados:</h3>';
  if (rows.length === 0) { cont.innerHTML += '<i>No hay calendarios guardados.</i>'; return; }
  rows.forEach(r => {
    cont.innerHTML += `<div style="border:1px solid #ddd;padding:8px;margin:6px 0;border-radius:8px;"><b>${r.planta}</b> — ${r.fechaSiembra}<div style="margin-top:6px;font-size:0.95em;white-space:pre-wrap">${escapeHtml(r.resumen)}</div><div style="margin-top:6px;color:#6b7280">${r.fecha}</div></div>`;
  });
}

// --- PARAMETROS: verificar y guardar ---
async function verificarParametros() {
  const planta = document.getElementById('planta') ? document.getElementById('planta').value : 'desconocida';
  const etapa = document.getElementById('etapa') ? document.getElementById('etapa').value : 'desconocida';
  const ph = parseFloat(document.getElementById('ph') ? document.getElementById('ph').value : '0');
  const ce = parseFloat(document.getElementById('ce') ? document.getElementById('ce').value : '0');
  const temperatura = parseFloat(document.getElementById('temperatura') ? document.getElementById('temperatura').value : '0');
  const humedad = parseFloat(document.getElementById('humedad') ? document.getElementById('humedad').value : '0');

  let mensaje = 'Parámetros dentro del rango aceptable ✅';
  if (isNaN(ph) || isNaN(ce)) mensaje = 'Introduce pH y CE válidos';
  else if (ph < 5.5 || ph > 7.0 || ce < 0.5 || ce > 3.0) mensaje = '⚠️ Parámetros fuera de rango. Revisa la solución nutritiva.';

  const resultadoEl = document.getElementById('resultado');
  if (resultadoEl) resultadoEl.textContent = mensaje;
  const fecha = new Date().toLocaleString();
  await db.parametros.add({ planta, etapa, ph, ce, temperatura, humedad, resultado: mensaje, fecha });
  appendUserHistory({ time: new Date().toISOString(), type: 'parametros_guardados', planta, etapa });
  showToast('Parámetros registrados', 'success', 1600);
  mostrarParametrosGuardados();
  if (navigator.onLine) { try { await sincronizar({ notify: false }); } catch(e){ console.error('auto-sync parametros', e); } }
}

async function mostrarParametrosGuardados() {
  const cont = document.getElementById('resultadosGuardados');
  if (!cont) return;
  const rows = await db.parametros.reverse().toArray();
  cont.innerHTML = '<h3>Parámetros registrados:</h3>';
  if (rows.length === 0) { cont.innerHTML += '<i>No hay parámetros guardados.</i>'; return; }
  rows.forEach(r => {
    cont.innerHTML += `<div style="border:1px solid #ddd;padding:8px;margin:6px 0;border-radius:8px;display:flex;justify-content:space-between;align-items:flex-start;"><div><b>${r.planta} — ${r.etapa}</b><div style="margin-top:6px">pH: ${r.ph} | CE: ${r.ce} | T: ${r.temperatura}°C | H: ${r.humedad}%</div></div><div style="color:#6b7280">${r.fecha}</div></div>`;
  });
}

// --- Inicialización al cargar la página ---
window.addEventListener('DOMContentLoaded', () => {
  // Mostrar listas iniciales
  mostrarNotasDexie();
  mostrarResultadosDexie();
  mostrarCalendariosGuardados();
  mostrarParametrosGuardados();
  renderHistorialSection();
  mostrarEstadoConexion();
  if (navigator.onLine) startAutoSync();

  // Conectar formulario de calculadora si existe
  const formCalc = document.getElementById('nutrientForm');
  if (formCalc) formCalc.addEventListener('submit', calcularNutrientes);

  // Botón guardar resultado (si existe) se conecta a la función
  const guardarBtn = document.getElementById('guardarResultadoBtn');
  if (guardarBtn) guardarBtn.addEventListener('click', guardarResultadoDexie);

  // Botón guardar nota (si existe)
  const guardarNotaBtn = document.querySelector('#notasOfflineContainer button');
  if (guardarNotaBtn) guardarNotaBtn.addEventListener('click', guardarNotaDexie);
});

// Exportar algunas funciones al scope global (para llamadas onclick en HTML)
window.guardarNotaDexie = guardarNotaDexie;
window.borrarNotaDexie = borrarNotaDexie;
window.mostrarNotasDexie = mostrarNotasDexie;
window.guardarResultadoDexie = guardarResultadoDexie;
window.mostrarResultadosDexie = mostrarResultadosDexie;
window.borrarResultadoDexie = borrarResultadoDexie;
window.calcularEtapas = calcularEtapas;
window.calcularNutrientes = calcularNutrientes;
window.verificarParametros = verificarParametros;
window.mostrarCalendariosGuardados = mostrarCalendariosGuardados;
window.mostrarParametrosGuardados = mostrarParametrosGuardados;
window.sincronizar = sincronizar;
window.renderHistorialSection = renderHistorialSection;

// Fin de dexie.js
