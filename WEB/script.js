
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
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('nutrientForm');
  const resultContainer = document.getElementById('result');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const option = parseInt(document.getElementById('option').value);
    const litersInput = document.getElementById('liters').value.trim();

    // Validación 1: Campo vacío
    if (litersInput === '') {
      alert('⚠️ Por favor ingrese un valor antes de continuar.');
      return;
    }

    // Validación 2: Comas en lugar de puntos
    if (litersInput.includes(',')) {
      alert('⚠️ Use punto (.) en lugar de coma (,) para los decimales.');
      return;
    }

    // Validación 3: Solo números positivos (enteros o decimales)
    const regexNumero = /^[0-9]*\.?[0-9]+$/;
    if (!regexNumero.test(litersInput)) {
      alert('⚠️ Solo se permiten números positivos. No use letras ni símbolos.');
      return;
    }

    const liters = parseFloat(litersInput);

    // Validación 4: No permitir valores negativos o cero
    if (liters <= 0) {
      alert('⚠️ El valor debe ser mayor que cero.');
      return;
    }

        let result = '';
              //Nitrato de calcio
                let nitratoCalcio = 40.078 +(2 * 14.0067)  + (6 * 15.9994);
                let porcentajeNitratoCalcio = ((2 * 14.0067 * 100)/ nitratoCalcio) ;
                let porcentajeNitratoCalcioo = (40.078  * 100/ nitratoCalcio);
              //Nitrato de potasio
                let nitratoPotasio = 39.0983 + 14.0067 + 3 * 15.9994;
                let porcentajeNitratoPotasio = (14.0067 / nitratoPotasio) * 100;
                let porcentajeNitratoPotasioo = (39.0983 / nitratoPotasio) * 100;
              //fosfato de monoamoniaco
                let fosfatoMonoamoniaco = 14.0067 + 6 * 1.00784 + 30.973762 + 4 * 15.9994;
                let porcentajeFosfatoMonoamoniaco = (14.0067 / fosfatoMonoamoniaco) * 100;
                let porcentajeFosfatoMonoamoniaco2 = (30.973762 / fosfatoMonoamoniaco) * 100;
              //Sulfato de magnesio
                let sulfatoMagnesio = 24.305 + 32.065 + 4 * 15.9994 + 7 * 1.00784 * 2 + 7 * 15.9994;
                let porcentajeSulfatoMagnesio = (24.305 / sulfatoMagnesio) * 100;
                let porcentajeSulfatoMagnesioo = (32.065 / sulfatoMagnesio) * 100;

              
                //Sulfato ferroso
                let sulfatoFerroso = 55.845 + 32.065 + (4 * 15.9994);
                let porcentajeSulfatoFerroso = (55.845 / sulfatoFerroso) * 100;
                let porcentajeSulfatoFerrosoo = (32.065 / sulfatoFerroso) * 100;

                //Sulfato de cobre
                let sulfatoCobre = 63.54 + 32.065 + 4 * 15.9994;
                let porcentajeSulfatoCobre = (63.54 / sulfatoCobre) * 100;
                let porcentajeSulfatoCobree = (32.065 / sulfatoCobre) * 100;
                //Sulfato de manganeso
                let sulfatoManganeso = 54.938 + 32.065 + 4 * 15.9994;
                let porcentajeSulfatoManganeso = (32.065 / sulfatoManganeso) * 100;
                let porcentajeSulfatoManganesoo = (54.938 / sulfatoManganeso) * 100;
                //sulfato zinc
                let sulfatoZinc =65.38+32.065+4*15.9994;
                let porcentajeSulfatoZinc = (32.065/sulfatoZinc) * 100;
                let porcentajeSulfatoZincc = (65.38/sulfatoZinc) * 100;
                //acido borico
                let acidoBorico = 3 * 1.00784 + 10.81 + 3 * 15.9994;
                let porcentajeAcidoborico = (10.81 / acidoBorico) * 100;
        switch (option) {
            case 1:
              //Nitrato de calcio
                let gramosNitratoCalcio = ( ((140 /porcentajeNitratoCalcioo)/10)*liters);
                result += `Cantidad en gramos del compuesto: ${gramosNitratoCalcio.toFixed(2)} gramos de nitrato de calcio.\n`;
              //Nitrato de potasio
                let gramosNitratoPotasio = (((150/porcentajeNitratoPotasioo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosNitratoPotasio.toFixed(2)} gramos de nitrato de potasio.\n`;
               //fosfato de monoamoniaco
                let gramosFosfatoMonoamoniaco = (((50 /porcentajeFosfatoMonoamoniaco2 )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosFosfatoMonoamoniaco.toFixed(2)} gramos de fosfato de monoamoniaco.\n`;

                //Sulfato de magnesio
                let gramosSulfatoMagnesio = ( ((55 /porcentajeSulfatoMagnesio )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoMagnesio.toFixed(2)} gramos de sulfato de magnesio.\n`;
                //Sulfato ferroso
                let gramosSulfatoFerroso = ( ((3/porcentajeSulfatoFerrosoo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoFerroso.toFixed(2)} gramos de sulfato ferroso.\n`;
                //Sulfato de cobre

                let gramosSulfatoCobre = (((0.5 /porcentajeSulfatoCobre)/ 10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoCobre.toFixed(2)} gramos de sulfato de cobre.\n`;

                //Sulfato de manganeso
                let gramosSulfatoManganeso = (((0.8/porcentajeSulfatoManganesoo/10)*liters)); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoManganeso.toFixed(2)} gramos de sulfato de manganeso.\n`;
                
                //Sulfato de zinc

                let gramosSulfatoZinc = (((0.4/porcentajeSulfatoZinc)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoZinc.toFixed(2)} gramos de sulfato de zinc.\n`;
                //acido borico

                let gramosAcidoBorico = (((0.8 /porcentajeAcidoborico)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosAcidoBorico.toFixed(2)} gramos de ácido bórico.\n`;                

                break;
            case 2:
              //Nitrato de calcio
                let gramosNitratoCalciof = ( ((120 /porcentajeNitratoCalcioo)/10)*liters);

                result += `Cantidad en gramos del compuesto: ${gramosNitratoCalciof.toFixed(2)} gramos de nitrato de calcio.\n`;
              //Nitrato de potasio
                let gramosNitratoPotasiof = (((200/porcentajeNitratoPotasioo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosNitratoPotasiof.toFixed(2)} gramos de nitrato de potasio.\n`;
               //fosfato de monoamoniaco
                let gramosFosfatoMonoamoniacof = (((40/porcentajeFosfatoMonoamoniaco2 )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosFosfatoMonoamoniacof.toFixed(2)} gramos de fosfato de monoamoniaco.\n`;

                //Sulfato de magnesio
                let gramosSulfatoMagnesiof = ( ((50 /porcentajeSulfatoMagnesio )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoMagnesiof.toFixed(2)} gramos de sulfato de magnesio.\n`;
                //Sulfato ferroso
                let gramosSulfatoFerrosof = ( ((2/porcentajeSulfatoFerrosoo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoFerrosof.toFixed(2)} gramos de sulfato ferroso.\n`;
                //Sulfato de cobre

                let gramosSulfatoCobref = (((0.05 /porcentajeSulfatoCobre)/ 10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoCobref.toFixed(2)} gramos de sulfato de cobre.\n`;

                //Sulfato de manganeso
                let gramosSulfatoManganesof = (((0.5/porcentajeSulfatoManganesoo/10)*liters)); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoManganesof.toFixed(2)} gramos de sulfato de manganeso.\n`;
                
                //Sulfato de zinc

                let gramosSulfatoZincf = (((0.05/porcentajeSulfatoZinc)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoZincf.toFixed(2)} gramos de sulfato de zinc.\n`;
                //acido borico

                let gramosAcidoBoricof = (((0.4 /porcentajeAcidoborico)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosAcidoBoricof.toFixed(2)} gramos de ácido bórico.\n`;                

              
                break;
            case 3:
              //Nitrato de calcio
                let gramosNitratoCalciol = ( ((150 /porcentajeNitratoCalcioo)/10)*liters);      
                result += `Cantidad en gramos del compuesto: ${gramosNitratoCalciol.toFixed(2)} gramos de nitrato de calcio.\n`;
              //Nitrato de potasio
                let gramosNitratoPotasiol = (((200/porcentajeNitratoPotasioo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosNitratoPotasiol.toFixed(2)} gramos de nitrato de potasio.\n`;
               //fosfato de monoamoniaco
                let gramosFosfatoMonoamoniacol = (((40/porcentajeFosfatoMonoamoniaco2 )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosFosfatoMonoamoniacol.toFixed(2)} gramos de fosfato de monoamoniaco.\n`;

                //Sulfato de magnesio
                let gramosSulfatoMagnesiol = ( ((50 /porcentajeSulfatoMagnesio )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoMagnesiol.toFixed(2)} gramos de sulfato de magnesio.\n`;
                //Sulfato ferroso
                let gramosSulfatoFerrosol = ( ((2.5/porcentajeSulfatoFerrosoo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoFerrosol.toFixed(2)} gramos de sulfato ferroso.\n`;
                //Sulfato de cobre

                let gramosSulfatoCobrel = (((0.05 /porcentajeSulfatoCobre)/ 10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoCobrel.toFixed(2)} gramos de sulfato de cobre.\n`;

                //Sulfato de manganeso
                let gramosSulfatoManganesol = (((0.5/porcentajeSulfatoManganesoo/10)*liters)); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoManganesol.toFixed(2)} gramos de sulfato de manganeso.\n`;
                
                //Sulfato de zinc

                let gramosSulfatoZincl = (((0.05/porcentajeSulfatoZinc)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoZincl.toFixed(2)} gramos de sulfato de zinc.\n`;
                //acido borico

                let gramosAcidoBoricol = (((0.3 /porcentajeAcidoborico)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosAcidoBoricol.toFixed(2)} gramos de ácido bórico.\n`;                

              
                break; 
            case 4:
                            //Nitrato de calcio
                let gramosNitratoCalciog = ( ((120 /porcentajeNitratoCalcioo)/10)*liters);
                
                result += `Cantidad en gramos del compuesto: ${gramosNitratoCalciog.toFixed(2)} gramos de nitrato de calcio.\n`;
              //Nitrato de potasio
                let gramosNitratoPotasiog = (((250/porcentajeNitratoPotasioo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosNitratoPotasiog.toFixed(2)} gramos de nitrato de potasio.\n`;
               //fosfato de monoamoniaco
                let gramosFosfatoMonoamoniacog = (((45/porcentajeFosfatoMonoamoniaco2 )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosFosfatoMonoamoniacog.toFixed(2)} gramos de fosfato de monoamoniaco.\n`;

                //Sulfato de magnesio
                let gramosSulfatoMagnesiog = ( ((45/porcentajeSulfatoMagnesio )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoMagnesiog.toFixed(2)} gramos de sulfato de magnesio.\n`;
                //Sulfato ferroso
                let gramosSulfatoFerrosog = ( ((3.0/porcentajeSulfatoFerrosoo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoFerrosog.toFixed(2)} gramos de sulfato ferroso.\n`;
                //Sulfato de cobre

                let gramosSulfatoCobreg = (((0.05 /porcentajeSulfatoCobre)/ 10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoCobreg.toFixed(2)} gramos de sulfato de cobre.\n`;

                //Sulfato de manganeso
                let gramosSulfatoManganesog = (((0.6/porcentajeSulfatoManganesoo/10)*liters)); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoManganesog.toFixed(2)} gramos de sulfato de manganeso.\n`;
                
                //Sulfato de zinc

                let gramosSulfatoZincg = (((0.06/porcentajeSulfatoZinc)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoZincg.toFixed(2)} gramos de sulfato de zinc.\n`;
                //acido borico

                let gramosAcidoBoricog = (((0.4 /porcentajeAcidoborico)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosAcidoBoricog.toFixed(2)} gramos de ácido bórico.\n`;                

              
                break;
            case 5:
              //Nitrato de calcio
                let gramosNitratoCalciom = ( ((150 /porcentajeNitratoCalcioo)/10)*liters);
                
                result += `Cantidad en gramos del compuesto: ${gramosNitratoCalciom.toFixed(2)} gramos de nitrato de calcio.\n`;
              //Nitrato de potasio
                let gramosNitratoPotasiom = (((300/porcentajeNitratoPotasioo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosNitratoPotasiom.toFixed(2)} gramos de nitrato de potasio.\n`;
               //fosfato de monoamoniaco
                let gramosFosfatoMonoamoniacom = (((40/porcentajeFosfatoMonoamoniaco2 )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosFosfatoMonoamoniacom.toFixed(2)} gramos de fosfato de monoamoniaco.\n`;

                //Sulfato de magnesio
                let gramosSulfatoMagnesiom = ( ((55 /porcentajeSulfatoMagnesio )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoMagnesiom.toFixed(2)} gramos de sulfato de magnesio.\n`;
                //Sulfato ferroso
                let gramosSulfatoFerrosom = ( ((3.0/porcentajeSulfatoFerrosoo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoFerrosom.toFixed(2)} gramos de sulfato ferroso.\n`;
                //Sulfato de cobre

                let gramosSulfatoCobrem = (((0.07/porcentajeSulfatoCobre)/ 10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoCobrem.toFixed(2)} gramos de sulfato de cobre.\n`;

                //Sulfato de manganeso
                let gramosSulfatoManganesom = (((0.7/porcentajeSulfatoManganesoo/10)*liters)); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoManganesom.toFixed(2)} gramos de sulfato de manganeso.\n`;
                
                //Sulfato de zinc

                let gramosSulfatoZincm = (((0.07/porcentajeSulfatoZinc)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoZincm.toFixed(2)} gramos de sulfato de zinc.\n`;
                //acido borico

                let gramosAcidoBoricom = (((0.5 /porcentajeAcidoborico)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosAcidoBoricom.toFixed(2)} gramos de ácido bórico.\n`;                

              
                break;
            case 6:
                              //Nitrato de calcio
                let gramosNitratoCalcioe = ( ((130 /porcentajeNitratoCalcioo)/10)*liters);
                
                result += `Cantidad en gramos del compuesto: ${gramosNitratoCalcioe.toFixed(2)} gramos de nitrato de calcio.\n`;
              //Nitrato de potasio
                let gramosNitratoPotasioe = (((220/porcentajeNitratoPotasioo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosNitratoPotasioe.toFixed(2)} gramos de nitrato de potasio.\n`;
               //fosfato de monoamoniaco
                let gramosFosfatoMonoamoniacoe= (((45/porcentajeFosfatoMonoamoniaco2 )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosFosfatoMonoamoniacoe.toFixed(2)} gramos de fosfato de monoamoniaco.\n`;

                //Sulfato de magnesio
                let gramosSulfatoMagnesioe = ( ((50 /porcentajeSulfatoMagnesio )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoMagnesioe.toFixed(2)} gramos de sulfato de magnesio.\n`;
                //Sulfato ferroso
                let gramosSulfatoFerrosoe = ( ((2.5/porcentajeSulfatoFerrosoo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoFerrosoe.toFixed(2)} gramos de sulfato ferroso.\n`;
                //Sulfato de cobre

                let gramosSulfatoCobree = (((0.05 /porcentajeSulfatoCobre)/ 10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoCobree.toFixed(2)} gramos de sulfato de cobre.\n`;

                //Sulfato de manganeso
                let gramosSulfatoManganesoe= (((0.6/porcentajeSulfatoManganesoo/10)*liters)); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoManganesoe.toFixed(2)} gramos de sulfato de manganeso.\n`;
                
                //Sulfato de zinc

                let gramosSulfatoZince = (((0.06/porcentajeSulfatoZinc)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoZince.toFixed(2)} gramos de sulfato de zinc.\n`;
                //acido borico

                let gramosAcidoBoricoe = (((0.35/porcentajeAcidoborico)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosAcidoBoricoe.toFixed(2)} gramos de ácido bórico.\n`;                

              
                break;
            case 7:
              //Nitrato de calcio
                let gramosNitratoCalcior = ( ((120 /porcentajeNitratoCalcioo)/10)*liters);
                
                result += `Cantidad en gramos del compuesto: ${gramosNitratoCalcior.toFixed(2)} gramos de nitrato de calcio.\n`;
              //Nitrato de potasio
                let gramosNitratoPotasior = (((220/porcentajeNitratoPotasioo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosNitratoPotasior.toFixed(2)} gramos de nitrato de potasio.\n`;
               //fosfato de monoamoniaco
                let gramosFosfatoMonoamoniacor = (((35/porcentajeFosfatoMonoamoniaco2 )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosFosfatoMonoamoniacor.toFixed(2)} gramos de fosfato de monoamoniaco.\n`;

                //Sulfato de magnesio
                let gramosSulfatoMagnesior = ( ((40 /porcentajeSulfatoMagnesio )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoMagnesior.toFixed(2)} gramos de sulfato de magnesio.\n`;
                //Sulfato ferroso
                let gramosSulfatoFerrosor = ( ((2.5/porcentajeSulfatoFerrosoo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoFerrosor.toFixed(2)} gramos de sulfato ferroso.\n`;
                //Sulfato de cobre

                let gramosSulfatoCobrer = (((0.05 /porcentajeSulfatoCobre)/ 10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoCobrer.toFixed(2)} gramos de sulfato de cobre.\n`;

                //Sulfato de manganeso
                let gramosSulfatoManganesor = (((0.5/porcentajeSulfatoManganesoo/10)*liters)); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoManganesor.toFixed(2)} gramos de sulfato de manganeso.\n`;
                
                //Sulfato de zinc

                let gramosSulfatoZincr = (((0.05/porcentajeSulfatoZinc)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoZincr.toFixed(2)} gramos de sulfato de zinc.\n`;
                //acido borico

                let gramosAcidoBoricor = (((0.3 /porcentajeAcidoborico)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosAcidoBoricor.toFixed(2)} gramos de ácido bórico.\n`;                

              
                break;
            case 8:
              //Nitrato de calcio
                let gramosNitratoCalciop = ( ((120 /porcentajeNitratoCalcioo)/10)*liters);
                
                result += `Cantidad en gramos del compuesto: ${gramosNitratoCalciop.toFixed(2)} gramos de nitrato de calcio.\n`;
              //Nitrato de potasio
                let gramosNitratoPotasiop = (((200/porcentajeNitratoPotasioo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosNitratoPotasiop.toFixed(2)} gramos de nitrato de potasio.\n`;
               //fosfato de monoamoniaco
                let gramosFosfatoMonoamoniacop = (((40/porcentajeFosfatoMonoamoniaco2 )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosFosfatoMonoamoniacop.toFixed(2)} gramos de fosfato de monoamoniaco.\n`;

                //Sulfato de magnesio
                let gramosSulfatoMagnesiop = ( ((45 /porcentajeSulfatoMagnesio )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoMagnesiop.toFixed(2)} gramos de sulfato de magnesio.\n`;
                //Sulfato ferroso
                let gramosSulfatoFerrosop = ( ((2.5/porcentajeSulfatoFerrosoo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoFerrosop.toFixed(2)} gramos de sulfato ferroso.\n`;
                //Sulfato de cobre

                let gramosSulfatoCobrep = (((0.05 /porcentajeSulfatoCobre)/ 10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoCobrep.toFixed(2)} gramos de sulfato de cobre.\n`;

                //Sulfato de manganeso
                let gramosSulfatoManganesop = (((0.6/porcentajeSulfatoManganesoo/10)*liters)); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoManganesop.toFixed(2)} gramos de sulfato de manganeso.\n`;
                
                //Sulfato de zinc

                let gramosSulfatoZincp = (((0.06/porcentajeSulfatoZinc)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoZincp.toFixed(2)} gramos de sulfato de zinc.\n`;
                //acido borico

                let gramosAcidoBoricop = (((0.35 /porcentajeAcidoborico)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosAcidoBoricop.toFixed(2)} gramos de ácido bórico.\n`;                         
                break;
            case 9:
              //Nitrato de calcio
                let gramosNitratoCalcioc = ( ((130 /porcentajeNitratoCalcioo)/10)*liters);
                
                result += `Cantidad en gramos del compuesto: ${gramosNitratoCalcioc.toFixed(2)} gramos de nitrato de calcio.\n`;
              //Nitrato de potasio
                let gramosNitratoPotasioc = (((220/porcentajeNitratoPotasioo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosNitratoPotasioc.toFixed(2)} gramos de nitrato de potasio.\n`;
               //fosfato de monoamoniaco
                let gramosFosfatoMonoamoniacoc = (((40/porcentajeFosfatoMonoamoniaco2 )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosFosfatoMonoamoniacoc.toFixed(2)} gramos de fosfato de monoamoniaco.\n`;

                //Sulfato de magnesio
                let gramosSulfatoMagnesioc = ( ((45 /porcentajeSulfatoMagnesio )/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoMagnesioc.toFixed(2)} gramos de sulfato de magnesio.\n`;
                //Sulfato ferroso
                let gramosSulfatoFerrosoc = ( ((2.5/porcentajeSulfatoFerrosoo)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoFerrosoc.toFixed(2)} gramos de sulfato ferroso.\n`;
                //Sulfato de cobre

                let gramosSulfatoCobrec = (((0.05 /porcentajeSulfatoCobre)/ 10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoCobrec.toFixed(2)} gramos de sulfato de cobre.\n`;

                //Sulfato de manganeso
                let gramosSulfatoManganesoc = (((0.6/porcentajeSulfatoManganesoo/10)*liters)); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoManganesoc.toFixed(2)} gramos de sulfato de manganeso.\n`;
                
                //Sulfato de zinc

                let gramosSulfatoZincc = (((0.06/porcentajeSulfatoZinc)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosSulfatoZincc.toFixed(2)} gramos de sulfato de zinc.\n`;
                //acido borico

                let gramosAcidoBoricoc = (((0.35/porcentajeAcidoborico)/10)*liters); // Fórmula ajustada para calcular gramos
                result += `Cantidad en gramos del compuesto: ${gramosAcidoBoricoc.toFixed(2)} gramos de ácido bórico.\n`;                

              
                break;
            default:
                result = 'La opción es incorrecta.';
                break;
        }

        

        resultContainer.textContent = result;
        // Convertir el texto 'result' en una tabla
const filas = result.trim().split('\n'); // Divide las líneas de resultados
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
    tablaHTML += `
      <tr>
        <td>${compuesto}</td>
        <td style="text-align: right;">${cantidad}</td>
      </tr>
    `;
  }
});

tablaHTML += `
    </tbody>
  </table>
`;

// Muestra la tabla en el contenedor de resultados
resultContainer.innerHTML = tablaHTML;

    });
    
});




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


function verificarParametros() {
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
    return;
  }

  const rango = rangosCultivos?.[planta]?.[etapa];

  if (!rango) {
    resultado.textContent = "No hay datos para la planta o la etapa seleccionada.";
    resultado.style.color = "red";
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
}

const db = new Dexie("hidrosoftDB");
db.version(1).stores({
  notas: "++id, texto, fecha",
  resultados: "++id, texto, fecha"
});

async function guardarNotaDexie() {
  const nota = document.getElementById("nota").value;
  if (!nota.trim()) return;
  await db.notas.add({ texto: nota, fecha: new Date().toLocaleString() });
  document.getElementById("nota").value = "";
  mostrarNotasDexie();
}

async function mostrarNotasDexie() {
  let contenedor = document.getElementById("notasGuardadas");
  if (!contenedor) return;
  const notas = await db.notas.reverse().toArray();
  contenedor.innerHTML = "<h3>Notas guardadas:</h3>";
  if (notas.length === 0) contenedor.innerHTML += "<i>No hay notas guardadas.</i>";
  notas.forEach(n => {
    contenedor.innerHTML += `<div style="border:1px solid #999;padding:8px;margin:4px 0;">
      <b>${n.fecha}</b>:<br>${n.texto}
      <button onclick="borrarNotaDexie(${n.id})">Borrar</button>
    </div>`;
  });
}

async function borrarNotaDexie(id) {
  await db.notas.delete(id);
  mostrarNotasDexie();
}

document.addEventListener("DOMContentLoaded", mostrarNotasDexie);

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
}

document.addEventListener("DOMContentLoaded", mostrarResultadosDexie);

// ========== AVISO EN TIEMPO REAL DE CONEXIÓN ==========
function mostrarEstadoConexion() {
  const div = document.getElementById('estadoConexion');
  if (!div) return;
  if (navigator.onLine) {
    div.textContent = "Estás en línea";
    div.className = "estado-conexion";
    div.style.display = "block";
    setTimeout(() => div.style.display = "none", 3000);
  } else {
    div.textContent = "Estás en MODO OFFLINE";
    div.className = "estado-conexion offline";
    div.style.display = "block";
  }
}
window.addEventListener('online', mostrarEstadoConexion);
window.addEventListener('offline', mostrarEstadoConexion);
document.addEventListener('DOMContentLoaded', mostrarEstadoConexion);

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
}

// CONFIGURACIÓN SUPABASE

const supabaseUrl = "https://cerqtenlbhcigfmolavd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcnF0ZW5sYmhjaWdmbW9sYXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNzY1NjUsImV4cCI6MjA3MjY1MjU2NX0.a4A-ua5xAKZx6ewc_t60ZHoD0AsoOA9CG6O4EzzcPWE";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);


// ELEMENTOS DEL DOM

const overlay = document.getElementById("overlayLogin");
const wrapper = overlay.querySelector(".wrapper");
const btnPopup = document.querySelector(".btnLogin-popup");
const iconClose = overlay.querySelector(".icon-close");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");


// MOSTRAR LOGIN

btnPopup.addEventListener("click", () => {
  overlay.classList.add("active");
  wrapper.classList.remove("active"); // muestra login
});

// MOSTRAR LOGIN AL CARGAR LA PÁGINA

window.addEventListener("load", () => {
  overlay.classList.add("active");       // Muestra el overlay
  wrapper.classList.remove("active");    // Asegura que el login esté visible
});

// Cerrar overlay
iconClose.addEventListener("click", () => {
  overlay.classList.remove("active");
});

// Alternar login/registro
registerLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapper.classList.remove("active");
});


// REGISTRO DE USUARIOS

document.querySelector(".form-box.register form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = e.target.nombre.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirm_password.value;

  if (password !== confirmPassword) {
    alert("❌ Las contraseñas no coinciden");
    return;
  }

  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { nombre } },
  });

  if (error) {
    alert("❌ Error al registrar: " + error.message);
  } else {
    alert("✅ Registro exitoso. Revisa tu correo para confirmar la cuenta.");
    wrapper.classList.remove("active"); // vuelve a login
  }
});


// INICIO DE SESIÓN

document.querySelector(".form-box.login form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  const { error, data } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    alert("❌ Error al iniciar sesión: " + error.message);
  } else {
    alert("👋 Bienvenido " + email);
    overlay.classList.remove("active");
    // Aquí puedes agregar redirección o mostrar contenido para usuarios logueados
  }
});


// SCROLL SECCIONES

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function verificarParametros() {
  const planta = document.getElementById('planta').value;
  const etapa = document.getElementById('etapa').value;

  // Validación de campos vacíos, negativos o no numéricos
  const ph = parseFloat(document.getElementById('ph').value);
  const ce = parseFloat(document.getElementById('ce').value);
  const temperatura = parseFloat(document.getElementById('temperatura').value);
  const humedad = parseFloat(document.getElementById('humedad').value);
  const resultado = document.getElementById('resultado');

  if (
    isNaN(ph) || isNaN(ce) || isNaN(temperatura) || isNaN(humedad) ||
    ph <= 0 || ce < 0 || temperatura < -20 || humedad < 0 || humedad > 100
  ) {
    resultado.innerHTML = `<span style="color:red;">Por favor, ingresa valores válidos y positivos para todos los parámetros.<br>
    pH y CE deben ser mayores a 0. Temperatura mayor a -20°C. Humedad entre 0% y 100%.</span>`;
    resultado.style.color = "red";
    return;
  }

  // Verifica si la etapa existe para la planta seleccionada
  const rango = rangosCultivos?.[planta]?.[etapa];

  if (!rango) {
    resultado.innerHTML = `<span style="color:red;">La etapa <b>${etapa}</b> no existe para la planta <b>${planta.charAt(0).toUpperCase() + planta.slice(1)}</b>.<br>Por favor, selecciona una etapa válida.</span>`;
    resultado.style.color = "red";
    return;
  }

  // Verificación individual por parámetro
  const dentroPH = ph >= rango.ph[0] && ph <= rango.ph[1];
  const dentroCE = ce >= rango.ce[0] && ce <= rango.ce[1];
  const dentroTemp = temperatura >= rango.temperatura[0] && temperatura <= rango.temperatura[1];
  const dentroHumedad = humedad >= rango.humedad[0] && humedad <= rango.humedad[1];

  // Mensajes específicos
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
