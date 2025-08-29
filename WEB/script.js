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
        const liters = parseFloat(document.getElementById('liters').value);

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

  // Validación básica de entrada
  if (isNaN(ph) || isNaN(ce) || isNaN(temperatura) || isNaN(humedad)) {
    resultado.textContent = "Por favor, ingresa todos los valores correctamente.";
    resultado.style.color = "red";
    return;
  }

  // --- FIX: usar el nombre correcto del objeto y proteger con optional chaining ---
  const rango = rangosCultivos?.[planta]?.[etapa];

  if (!rango) {
    resultado.textContent = "No hay datos para la planta o la etapa seleccionada.";
    resultado.style.color = "red";
    return;
  }

  // Comprobaciones
  const dentroPH = ph >= rango.ph[0] && ph <= rango.ph[1];
  const dentroCE = ce >= rango.ce[0] && ce <= rango.ce[1];
  const dentroTemp = temperatura >= rango.temperatura[0] && temperatura <= rango.temperatura[1];
  const dentroHumedad = humedad >= rango.humedad[0] && humedad <= rango.humedad[1];

  if (dentroPH && dentroCE && dentroTemp && dentroHumedad) {
    resultado.innerHTML = "Todos los parámetros están dentro del rango recomendado.";
    resultado.style.color = "green";
  } else {
    // Uso innerHTML para mostrar saltos de línea con <br>
    let mensaje = "Parámetros fuera del rango recomendado:<br>";
    if (!dentroPH) mensaje += `- pH: entre ${rango.ph[0]} y ${rango.ph[1]}<br>`;
    if (!dentroCE) mensaje += `- CE: entre ${rango.ce[0]} y ${rango.ce[1]} mS/cm<br>`;
    if (!dentroTemp) mensaje += `- Temperatura: entre ${rango.temperatura[0]} y ${rango.temperatura[1]} °C<br>`;
    if (!dentroHumedad) mensaje += `- Humedad: entre ${rango.humedad[0]}% y ${rango.humedad[1]}%<br>`;
    resultado.innerHTML = mensaje;
    resultado.style.color = "red";
  }
}
