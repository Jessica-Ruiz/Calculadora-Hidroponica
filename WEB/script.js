function calcularEtapas() {
  const fechaSiembra = new Date(document.getElementById('fechaSiembra').value);
  if (isNaN(fechaSiembra)) {
    alert('Por favor selecciona una fecha válida.');
    return;
  }

  const etapas = [
    { nombre: "Germinación", inicio: 0, fin: 10 },
    { nombre: "Plántula", inicio: 11, fin: 30 },
    { nombre: "Desarrollo vegetativo", inicio: 31, fin: 50 },
    { nombre: "Floración", inicio: 51, fin: 70 },
    { nombre: "Formación del fruto", inicio: 71, fin: 90 },
    { nombre: "Cosecha", inicio: 91, fin: 100 }
  ];

  const tablaBody = document.getElementById("tablaBody");
  tablaBody.innerHTML = "";

  etapas.forEach(etapa => {
    const fechaInicio = new Date(fechaSiembra);
    fechaInicio.setDate(fechaInicio.getDate() + etapa.inicio);

    const fechaFin = new Date(fechaSiembra);
    fechaFin.setDate(fechaFin.getDate() + etapa.fin);

    const fila = `
      <tr>
        <td>${etapa.nombre}</td>
        <td>${fechaInicio.toLocaleDateString()}</td>
        <td>${fechaFin.toLocaleDateString()}</td>
      </tr>
    `;
    tablaBody.innerHTML += fila;
  });

  document.getElementById("tablaEtapas").style.display = "table";
}


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('nutrientForm');
    const resultContainer = document.getElementById('result');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const option = parseInt(document.getElementById('option').value);
        const liters = parseFloat(document.getElementById('liters').value);

        let result = '';

        switch (option) {
            case 1:
                let nitratoCalcio = 40.078 +(2 * 14.0067)  + (6 * 15.9994);
                let porcentajeNitratoCalcio = ((2 * 14.0067 * 100)/ nitratoCalcio) ;
                let porcentajeNitratoCalcioo = (40.078  * 100/ nitratoCalcio);
                let gramosNitratoCalcio = ( ((140 /porcentajeNitratoCalcioo)/10)*liters);
                result = `Peso molecular Ca(NO3)2: ${nitratoCalcio.toFixed(2)} g/mol\n`;
                result += `Porcentaje de Nitrogeno por masa: ${porcentajeNitratoCalcio.toFixed(2)}%\n`;
                result += `Porcentaje de Calcio por masa: ${porcentajeNitratoCalcioo.toFixed(2)}%\n`;
                result += `Cantidad en gramos del compuesto: ${gramosNitratoCalcio.toFixed(2)} gramos de nitrato de calcio.`;
                break;
            case 2:
                let nitratoPotasio = 39.0983 + 14.0067 + 3 * 15.9994;
                let porcentajeNitratoPotasio = (14.0067 / nitratoPotasio) * 100;
                let porcentajeNitratoPotasioo = (39.0983 / nitratoPotasio) * 100;
                let gramosNitratoPotasio = (((150/porcentajeNitratoPotasioo)/10)*liters); // Fórmula ajustada para calcular gramos
                result = `Peso molecular KNO3: ${nitratoPotasio.toFixed(2)} g/mol\n`;
                result += `Porcentaje de Nitrogeno por masa: ${porcentajeNitratoPotasio.toFixed(2)}%\n`;
                result += `Porcentaje de Potasio por masa: ${porcentajeNitratoPotasioo.toFixed(2)}%\n`;
                result += `Cantidad en gramos del compuesto: ${gramosNitratoPotasio.toFixed(2)} gramos de nitrato de potasio.`;
                break;
            case 3:
                let fosfatoMonoamoniaco = 14.0067 + 6 * 1.00784 + 30.973762 + 4 * 15.9994;
                let porcentajeFosfatoMonoamoniaco = (14.0067 / fosfatoMonoamoniaco) * 100;
                let porcentajeFosfatoMonoamoniaco2 = (30.973762 / fosfatoMonoamoniaco) * 100;
                let gramosFosfatoMonoamoniaco = (((50 /porcentajeFosfatoMonoamoniaco2 )/10)*liters); // Fórmula ajustada para calcular gramos
                result = `Peso molecular (NH4)H2PO4: ${fosfatoMonoamoniaco.toFixed(2)} g/mol\n`;
                result += `Porcentaje de Nitrogeno por masa: ${porcentajeFosfatoMonoamoniaco.toFixed(2)}%\n`;
                result += `Porcentaje de Fosforo por masa: ${porcentajeFosfatoMonoamoniaco2.toFixed(2)}%\n`;
                result += `Cantidad en gramos del compuesto: ${gramosFosfatoMonoamoniaco.toFixed(2)} gramos de fosfato de monoamoniaco.`;
                break;
            case 4:
                let sulfatoMagnesio = 24.305 + 32.065 + 4 * 15.9994 + 7 * 1.00784 * 2 + 7 * 15.9994;
                let porcentajeSulfatoMagnesio = (24.305 / sulfatoMagnesio) * 100;
                let porcentajeSulfatoMagnesioo = (32.065 / sulfatoMagnesio) * 100;
                let gramosSulfatoMagnesio = ( ((55 /porcentajeSulfatoMagnesio )/10)*liters); // Fórmula ajustada para calcular gramos
                result = `Peso molecular de MgSO4-7(H2O): ${sulfatoMagnesio.toFixed(2)} g/mol\n`;
                result += `Porcentaje de Magnesio por masa: ${porcentajeSulfatoMagnesio.toFixed(2)}%\n`;
                result += `Porcentaje de Azufre por masa: ${porcentajeSulfatoMagnesioo.toFixed(2)}%\n`;
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoMagnesio.toFixed(2)} gramos de sulfato de magnesio.`;
                break;
            case 5:
                let sulfatoFerroso = 55.845 + 32.065 + (4 * 15.9994);
                let porcentajeSulfatoFerroso = (55.845 / sulfatoFerroso) * 100;
                let porcentajeSulfatoFerrosoo = (32.065 / sulfatoFerroso) * 100;
                let gramosSulfatoFerroso = ( ((3/porcentajeSulfatoFerrosoo)/10)*liters); // Fórmula ajustada para calcular gramos
                result = `Peso molecular FeSO4-7(H2O): ${sulfatoFerroso.toFixed(2)} g/mol\n`;
                result += `Porcentaje de Hierro por masa: ${porcentajeSulfatoFerroso.toFixed(2)}%\n`;
                result += `Porcentaje de Azufre por masa: ${porcentajeSulfatoFerrosoo.toFixed(2)}%\n`;
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoFerroso.toFixed(2)} gramos de sulfato ferroso.`;
                break;
            case 6:
                let sulfatoCobre = 63.54 + 32.065 + 4 * 15.9994;
                let porcentajeSulfatoCobre = (63.54 / sulfatoCobre) * 100;
                let porcentajeSulfatoCobree = (32.065 / sulfatoCobre) * 100;
                let gramosSulfatoCobre = (((0.5 /porcentajeSulfatoCobre)/ 10)*liters); // Fórmula ajustada para calcular gramos
                result = `Peso molecular CuSO4-7(H2O): ${sulfatoCobre.toFixed(2)} g/mol\n`;
                result += `Porcentaje de Cobre por masa: ${porcentajeSulfatoCobre.toFixed(2)}%\n`;
                result += `Porcentaje de Azufre por masa: ${porcentajeSulfatoCobree.toFixed(2)}%\n`;
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoCobre.toFixed(2)} gramos de sulfato de cobre.`;
                break;
            case 7:
                let sulfatoManganeso = 54.938 + 32.065 + 4 * 15.9994;
                let porcentajeSulfatoManganeso = (32.065 / sulfatoManganeso) * 100;
                let porcentajeSulfatoManganesoo = (54.938 / sulfatoManganeso) * 100;
                let gramosSulfatoManganeso = (((0.8/porcentajeSulfatoManganesoo/10)*liters)); // Fórmula ajustada para calcular gramos
                result = `Peso molecular MnSO4-4(H2O): ${sulfatoManganeso.toFixed(2)} g/mol\n`;
                result += `Porcentaje de Azufre por masa: ${porcentajeSulfatoManganeso.toFixed(2)}%\n`;
                result += `Porcentaje de Manganeso por masa: ${porcentajeSulfatoManganesoo.toFixed(2)}%\n`;
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoManganeso.toFixed(2)} gramos de sulfato de manganeso.`;
                break;
            case 8:
                let sulfatoZinc =65.38+32.065+4*15.9994;
                let porcentajeSulfatoZinc = (32.065/sulfatoZinc) * 100;
                let porcentajeSulfatoZincc = (65.38/sulfatoZinc) * 100;
                let gramosSulfatoZinc = (((0.4/porcentajeSulfatoZinc)/10)*liters); // Fórmula ajustada para calcular gramos
                result = `Peso molecular ZnSO4-7(H2O): ${sulfatoZinc.toFixed(2)} g/mol\n`;
                result += `Porcentaje de Azufre por masa: ${porcentajeSulfatoZinc.toFixed(2)}%\n`;
                result += `Porcentaje de Zinc por masa: ${porcentajeSulfatoZincc.toFixed(2)}%\n`;
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoZinc.toFixed(2)} gramos de sulfato de zinc.`;
                break;
            case 9:
                let acidoBorico = 3 * 1.00784 + 10.81 + 3 * 15.9994;
                let porcentajeAcidoborico = (10.81 / acidoBorico) * 100;
                let gramosAcidoBorico = (((0.8 /porcentajeAcidoborico)/10)*liters); // Fórmula ajustada para calcular gramos
                result = `Peso molecular H3BO3: ${acidoBorico.toFixed(2)} g/mol\n`;
                result += `Porcentaje de Boro por masa: ${porcentajeAcidoborico.toFixed(2)}%\n`;
                result += `Cantidad en gramos del compuesto: ${gramosAcidoBorico.toFixed(2)} gramos de ácido bórico.`;
                break;
            default:
                result = 'La opción es incorrecta.';
                break;
        }

        resultContainer.textContent = result;
    });
    
});


const rangos = {
  germinacion: {
    ph: [5.5, 6.0],
    ce: [1.0, 1.4],
    temperatura: [22, 26],
    humedad: [70, 80]
  },
  plantula: {
    ph: [5.5, 6.0],
    ce: [1.2, 1.8],
    temperatura: [20, 25],
    humedad: [65, 75]
  },
  vegetativo: {
    ph: [5.5, 6.5],
    ce: [1.5, 2.3],
    temperatura: [22, 28],
    humedad: [60, 70]
  },
  floracion: {
    ph: [5.5, 6.5],
    ce: [2.0, 2.8],
    temperatura: [22, 27],
    humedad: [55, 65]
  },
  fructificacion: {
    ph: [5.8, 6.5],
    ce: [2.2, 3.0],
    temperatura: [20, 26],
    humedad: [55, 65]
  },
  cosecha: {
    ph: [5.5, 6.5],
    ce: [1.0, 2.0],
    temperatura: [18, 24],
    humedad: [50, 60]
  }
};

function verificarParametros() {
  const etapa = document.getElementById('etapa').value;
  const ph = parseFloat(document.getElementById('ph').value);
  const ce = parseFloat(document.getElementById('ce').value);
  const temperatura = parseFloat(document.getElementById('temperatura').value);
  const humedad = parseFloat(document.getElementById('humedad').value);
  const resultado = document.getElementById('resultado');

  if (isNaN(ph) || isNaN(ce) || isNaN(temperatura) || isNaN(humedad)) {
    resultado.textContent = "Por favor, ingresa todos los valores correctamente.";
    resultado.style.color = "red";
    return;
  }

  const rango = rangos[etapa];
  let mensaje = "";

  const dentroPH = ph >= rango.ph[0] && ph <= rango.ph[1];
  const dentroCE = ce >= rango.ce[0] && ce <= rango.ce[1];
  const dentroTemp = temperatura >= rango.temperatura[0] && temperatura <= rango.temperatura[1];
  const dentroHumedad = humedad >= rango.humedad[0] && humedad <= rango.humedad[1];

  if (dentroPH && dentroCE && dentroTemp && dentroHumedad) {
    mensaje = "Todos los parámetros están dentro del rango recomendado.";
    resultado.style.color = "green";
  } else {
    mensaje = " Parámetros fuera del rango recomendado:\n";
    if (!dentroPH) mensaje += `- pH: entre ${rango.ph[0]} y ${rango.ph[1]}\n`;
    if (!dentroCE) mensaje += `- CE: entre ${rango.ce[0]} y ${rango.ce[1]} mS/cm\n`;
    if (!dentroTemp) mensaje += `- Temperatura: entre ${rango.temperatura[0]} y ${rango.temperatura[1]} °C\n`;
    if (!dentroHumedad) mensaje += `- Humedad: entre ${rango.humedad[0]}% y ${rango.humedad[1]}%\n`;
    resultado.style.color = "red";
  }

  resultado.textContent = mensaje;
}
