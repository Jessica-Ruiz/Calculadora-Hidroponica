// =======================
// DASHBOARD D3 - HIDROPONIA
// =======================

// Llamar a esta función con el nombre de la planta (tomate, fresa, lechuga, etc.)
// Por ejemplo: actualizarDashboard('tomate');
async function actualizarDashboard(plantaSeleccionada) {
  if (!plantaSeleccionada) return;

  // Mostrar panel
  document.getElementById("dashboard").style.display = "block";

  // 1. Cargar datos de Supabase (cálculos + parámetros)
  const { data: datosResultados } = await supabaseClient
    .from('resultados')
    .select('*')
    .order('fecha', { ascending: true });

  const { data: datosParametros } = await supabaseClient
    .from('parametros')
    .select('*')
    .eq('planta', plantaSeleccionada)
    .order('fecha', { ascending: true });

  // 2. Filtrar datos de calculadora por planta si en texto guardas "Planta: X"
  const regexPlanta = new RegExp(plantaSeleccionada, 'i');
  const resultadosPlanta = (datosResultados || []).filter(r =>
    typeof r.texto === 'string' && regexPlanta.test(r.texto)
  );

  // 3. Convertir parámetros en estructura simple
  const parametrosPlanta = (datosParametros || []).map(p => ({
    fecha: new Date(p.fecha),
    etapa: p.etapa,
    ph: p.ph,
    ce: p.ce,
    temperatura: p.temperatura,
    humedad: p.humedad
  }));

  // 4. Resumen de conteos
  const numCalculos = resultadosPlanta.length;
  const numParametros = parametrosPlanta.length;

  // 5. Estadísticas básicas (solo si hay datos)
  let promedioPH = 0, promedioCE = 0, promedioTemp = 0, promedioHum = 0;
  if (parametrosPlanta.length > 0) {
    promedioPH   = promedio(parametrosPlanta.map(p => p.ph));
    promedioCE   = promedio(parametrosPlanta.map(p => p.ce));
    promedioTemp = promedio(parametrosPlanta.map(p => p.temperatura));
    promedioHum  = promedio(parametrosPlanta.map(p => p.humedad));
  }

  // 6. Armar objeto stats para usar en todas las vistas
  const stats = {
    planta: plantaSeleccionada,
    numCalculosCalc: numCalculos,
    numEntradasCalendario: 0, // si luego guardas calendario por planta, aquí lo sumas
    numLecturasParametros: numParametros,
    promedioEC: promedioCE,
    promedioPH: promedioPH,
    promedioTemp: promedioTemp,
    promedioHumedad: promedioHum,
    promedioLuz: 0, // placeholder si en un futuro agregas luz
    parametrosPlanta
  };

  // 7. Pintar tarjetas
  renderActivitySummary(stats);
  renderCalculationStats(stats);
  renderSystemStatus(stats);

  // 8. Gráficas D3
  renderActivityChart(stats);
  renderCalculationComparisonChart(stats);
  renderSystemStatusChart(stats);
}

// =======================
// Funciones de ayuda
// =======================
function promedio(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

// =======================
//  Tarjetas (texto)
// =======================
function renderActivitySummary(stats) {
  const contenedor = document.getElementById("activity-summary-stats");
  contenedor.innerHTML = "";

  const items = [
    { label: "Planta", value: stats.planta },
    { label: "Cálculos (nutrientes)", value: stats.numCalculosCalc },
    { label: "Entradas calendario", value: stats.numEntradasCalendario },
    { label: "Lecturas de parámetros", value: stats.numLecturasParametros },
  ];

  items.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("stat-item");
    div.innerHTML = `
      <span class="stat-label">${item.label}</span>
      <span class="stat-value">${item.value}</span>
    `;
    contenedor.appendChild(div);
  });
}

function renderCalculationStats(stats) {
  const contenedor = document.getElementById("calculation-stats-grid");
  contenedor.innerHTML = "";

  const items = [
    { label: "pH promedio", value: stats.promedioPH ? stats.promedioPH.toFixed(2) : "-" },
    { label: "CE promedio", value: stats.promedioEC ? stats.promedioEC.toFixed(2) : "-" },
    { label: "Temp. promedio (°C)", value: stats.promedioTemp ? stats.promedioTemp.toFixed(1) : "-" },
    { label: "Humedad promedio (%)", value: stats.promedioHumedad ? stats.promedioHumedad.toFixed(1) : "-" },
  ];

  items.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("stat-item");
    div.innerHTML = `
      <span class="stat-label">${item.label}</span>
      <span class="stat-value">${item.value}</span>
    `;
    contenedor.appendChild(div);
  });
}

function renderSystemStatus(stats) {
  const contenedor = document.getElementById("system-status-grid");
  contenedor.innerHTML = "";

  // Umbrales muy básicos (puedes ajustarlos por planta)
  const estadoPH  = stats.promedioPH >= 5.5 && stats.promedioPH <= 6.5 ? "Óptimo" : "Revisar";
  const estadoCE  = stats.promedioEC >= 1.0 && stats.promedioEC <= 2.5 ? "Óptimo" : "Revisar";
  const estadoTmp = stats.promedioTemp >= 18 && stats.promedioTemp <= 26 ? "Óptimo" : "Revisar";
  const estadoHum = stats.promedioHumedad >= 50 && stats.promedioHumedad <= 75 ? "Óptimo" : "Revisar";

  const items = [
    { label: "Estado pH", value: stats.promedioPH ? estadoPH : "Sin datos" },
    { label: "Estado CE", value: stats.promedioEC ? estadoCE : "Sin datos" },
    { label: "Estado Temp.", value: stats.promedioTemp ? estadoTmp : "Sin datos" },
    { label: "Estado Humedad", value: stats.promedioHumedad ? estadoHum : "Sin datos" },
  ];

  items.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("status-item");
    div.innerHTML = `
      <span class="status-label">${item.label}</span>
      <span class="status-value">${item.value}</span>
    `;
    contenedor.appendChild(div);
  });
}

// =======================
//  Gráficas D3
// =======================
function limpiarSVG(selector) {
  d3.select(selector).selectAll("*").remove();
}

// 1) Barras: nº cálculos vs parámetros vs calendario
function renderActivityChart(stats) {
  const selector = "#activity-chart";
  limpiarSVG(selector);

  const data = [
    { categoria: "Cálculos", valor: stats.numCalculosCalc },
    { categoria: "Calendario", valor: stats.numEntradasCalendario },
    { categoria: "Parámetros", valor: stats.numLecturasParametros },
  ];

  const width = 320;
  const height = 200;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };

  const svg = d3.select(selector)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scaleBand()
    .domain(data.map(d => d.categoria))
    .range([margin.left, width - margin.right])
    .padding(0.3);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.valor) || 1])
    .nice()
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.categoria))
    .attr("y", d => y(d.valor))
    .attr("width", x.bandwidth())
    .attr("height", d => y(0) - y(d.valor));
}

// 2) Línea: comparación promedio pH, CE, Temp, Humedad
function renderCalculationComparisonChart(stats) {
  const selector = "#calculation-comparison-chart";
  limpiarSVG(selector);

  const data = [
    { parametro: "pH", valor: stats.promedioPH || 0 },
    { parametro: "CE", valor: stats.promedioEC || 0 },
    { parametro: "Temp", valor: stats.promedioTemp || 0 },
    { parametro: "Hum", valor: stats.promedioHumedad || 0 },
  ];

  const width = 320;
  const height = 200;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };

  const svg = d3.select(selector)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scaleBand()
    .domain(data.map(d => d.parametro))
    .range([margin.left, width - margin.right])
    .padding(0.4);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.valor) || 1])
    .nice()
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  const line = d3.line()
    .x(d => x(d.parametro) + x.bandwidth() / 2)
    .y(d => y(d.valor));

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke-width", 2)
    .attr("d", line);

  svg.selectAll(".point")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.parametro) + x.bandwidth() / 2)
    .attr("cy", d => y(d.valor))
    .attr("r", 4);
}

// 3) Línea temporal: PH a lo largo del tiempo para la planta
function renderSystemStatusChart(stats) {
  const selector = "#system-status-chart";
  limpiarSVG(selector);

  const data = stats.parametrosPlanta || [];
  if (data.length === 0) {
    d3.select(selector).append("p").text("Sin datos de parámetros para esta planta.");
    return;
  }

  const width = 360;
  const height = 220;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };

  const svg = d3.select(selector)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.fecha))
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([d3.min(data, d => d.ph) - 0.2, d3.max(data, d => d.ph) + 0.2])
    .nice()
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(4));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  const line = d3.line()
    .x(d => x(d.fecha))
    .y(d => y(d.ph));

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke-width", 2)
    .attr("d", line);

  svg.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.fecha))
    .attr("cy", d => y(d.ph))
    .attr("r", 3)
    .append("title")
    .text(d => `pH: ${d.ph.toFixed(2)}\n${d.fecha.toLocaleString()}`);
}

// Hacer accesible la función en window por si la quieres llamar desde otros scripts
window.actualizarDashboard = actualizarDashboard;
