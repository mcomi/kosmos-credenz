$('#estado').change(function() {
  if($(this).val()!=""){
    console.log($(this).val())
    $('#elige-dependencia').removeClass('hidden')
    dameDependencias($(this).val());
  }
})

$("input[name='tipo-credito']").click(function(){
  if ($(this).prop('value') == 'hipoteca') {
    $('#hipoteca-options').removeClass('hidden')
  }
})

const menuLinks = $('#desktop-menu a');

menuLinks.each(function(index) {
  let menuItem = $(this);
  menuItem.click(function(e){
    e.preventDefault()
    let section = this.getAttribute("href");
    $('html, body').animate({ scrollTop: $(section).offset().top }, 'slow');
  })

});

// cargo nombres e iconos de dependencias, lo asigno en esta variable
var dependencias = [
  {
    nombre:'PEMEX',
    imgIcono: 'pemex.svg'
  },
  {
    nombre:'SEP',
    imgIcono: 'sep.png'
  },
  {
    nombre:'Jubilados y Pensionados',
    imgIcono: 'pensionados.svg'
  },
  {
    nombre:'IMSS',
    imgIcono: 'imss.svg'
  },
  {
    nombre:'GOB CDMX',
    imgIcono: 'pemex.svg'
  },
  {
    nombre:'pemex',
    imgIcono: 'pemex.svg'
  }
]

/* funcion para generar las dependencias dependiendo del estado */
function dameDependencias(estado) {
  /* no estan definidas por lo que genero aleatoriamente dependencias para mostrar */
  switch(estado) {
    case '1':
        getRandomDependencias()
        break;
    case '2':
        getRandomDependencias()
        break;
    default:
        getRandomDependencias()
  }
}

function getRandomDependencias() {
  var randomDependencias = getUnique(dependencias, 4);
  var htmlOpcionesDependencias = '';
  var dependenciasList = document.getElementById('opciones-dependencias')
  htmlOpcionesDependencias = randomDependencias.map((dependencia, i) => {
    return `
    <div class="col-xs-6 col-md-2">
      <input type="radio" value="${dependencia.nombre}" id="${dependencia.nombre}" name="dependencia">
      <label for="${dependencia.nombre}">
        <div class="icon-item">
          <img src="img/icons/${dependencia.imgIcono}" alt="">
        </div>
      </label>
      <p class="credit-text">${dependencia.nombre}</p>
    </div>
  `;
  }).join('');
  dependenciasList.innerHTML = htmlOpcionesDependencias+`<div class="col-xs-6 col-md-2">
  <input type="radio" value="otra" id="otra" name="dependencia">
    <label for="otra">
      <div class="icon-item">
        <img src="img/icons/otros.png" alt="">
      </div>
    </label>
    <p class="credit-text">OTRO</p>
  </div>`

  let optsDependencias = $("input[name='dependencia']")
  let otraDependenciaElegida = $("#otraDependencia")

    optsDependencias.each(function() {
      let input = $(this)
      input.change(function(){
        if(input.val() == 'GOB CDMX'){
          $('#label-percepciones').text('Ingresos libres')
        }else{
          $('#label-percepciones').text('Percepciones libres')
        }
        if(input.val() == 'otra'){
          otraDependenciaElegida.removeClass('hidden')
          inputsSolicitud = $('input')
          cargaEventosInputs(inputsSolicitud)
        }
      })
    })
}

function getUnique(dependencias, count) {
  // Make a copy of the array
  var tmp = dependencias.slice(dependencias);
  var ret = [];

  for (var i = 0; i < count; i++) {
    var index = Math.floor(Math.random() * tmp.length);
    var removed = tmp.splice(index, 1);
    // Since we are only removing one element
    ret.push(removed[0]);
  }
  return ret;
}




let regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
let celularInput = new Cleave('#celular', {
  phone: true,
  phoneRegionCode: 'MX'
});

let celularCheckInput = new Cleave('#celular-check', {
  phone: true,
  phoneRegionCode: 'MX'
});

$('#celular-check').keyup(function() {
  let input = $(this)
  if (regex.test(input.val())) {
    $('#btn-consulta-estatus').removeClass('hidden')
    $('#celular-valido').addClass('hidden');
  }else{
    $('#celular-valido').removeClass('hidden');
    if(!$('#btn-consulta-estatus').hasClass('hidden')){

      $('#btn-consulta-estatus').addClass('hidden')
    }
  }
})

$.fn.exists = function() {
  return this.length > 0;
}

function Unidades(num) {
  switch (num) {
    case 1:
      return "UN";
    case 2:
      return "DOS";
    case 3:
      return "TRES";
    case 4:
      return "CUATRO";
    case 5:
      return "CINCO";
    case 6:
      return "SEIS";
    case 7:
      return "SIETE";
    case 8:
      return "OCHO";
    case 9:
      return "NUEVE";
  }

  return "";
} //Unidades()

function Decenas(num) {

  var decena = Math.floor(num / 10);
  var unidad = num - (decena * 10);

  switch (decena) {
    case 1:
      switch (unidad) {
        case 0:
          return "DIEZ";
        case 1:
          return "ONCE";
        case 2:
          return "DOCE";
        case 3:
          return "TRECE";
        case 4:
          return "CATORCE";
        case 5:
          return "QUINCE";
        default:
          return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch (unidad) {
        case 0:
          return "VEINTE";
        default:
          return "VEINTI" + Unidades(unidad);
      }
    case 3:
      return DecenasY("TREINTA", unidad);
    case 4:
      return DecenasY("CUARENTA", unidad);
    case 5:
      return DecenasY("CINCUENTA", unidad);
    case 6:
      return DecenasY("SESENTA", unidad);
    case 7:
      return DecenasY("SETENTA", unidad);
    case 8:
      return DecenasY("OCHENTA", unidad);
    case 9:
      return DecenasY("NOVENTA", unidad);
    case 0:
      return Unidades(unidad);
  }
} //Unidades()

function DecenasY(strSin, numUnidades) {
  if (numUnidades > 0)
    return strSin + " Y " + Unidades(numUnidades)

  return strSin;
} //DecenasY()

function Centenas(num) {
  var centenas = Math.floor(num / 100);
  var decenas = num - (centenas * 100);

  switch (centenas) {
    case 1:
      if (decenas > 0)
        return "CIENTO " + Decenas(decenas);
      return "CIEN";
    case 2:
      return "DOSCIENTOS " + Decenas(decenas);
    case 3:
      return "TRESCIENTOS " + Decenas(decenas);
    case 4:
      return "CUATROCIENTOS " + Decenas(decenas);
    case 5:
      return "QUINIENTOS " + Decenas(decenas);
    case 6:
      return "SEISCIENTOS " + Decenas(decenas);
    case 7:
      return "SETECIENTOS " + Decenas(decenas);
    case 8:
      return "OCHOCIENTOS " + Decenas(decenas);
    case 9:
      return "NOVECIENTOS " + Decenas(decenas);
  }

  return Decenas(decenas);
} //Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
  var cientos = Math.floor(num / divisor)
  var resto = num - (cientos * divisor)

  var letras = "";

  if (cientos > 0)
    if (cientos > 1)
      letras = Centenas(cientos) + " " + strPlural;
    else
      letras = strSingular;

  if (resto > 0)
    letras += "";

  return letras;
} //Seccion()

function Miles(num) {
  var divisor = 1000;
  var cientos = Math.floor(num / divisor)
  var resto = num - (cientos * divisor)

  var strMiles = Seccion(num, divisor, "UN MIL", "MIL");
  var strCentenas = Centenas(resto);

  if (strMiles == "")
    return strCentenas;

  return strMiles + " " + strCentenas;
} //Miles()

function Millones(num) {
  var divisor = 1000000;
  var cientos = Math.floor(num / divisor)
  var resto = num - (cientos * divisor)

  var strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
  var strMiles = Miles(resto);

  if (strMillones == "")
    return strMiles;

  return strMillones + " " + strMiles;
} //Millones()

function NumeroALetras(num) {
  var data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
    letrasCentavos: "",
    letrasMonedaPlural: 'PESOS', //"PESOS", 'Dólares', 'Bolívares', 'etcs'
    letrasMonedaSingular: 'PESO', //"PESO", 'Dólar', 'Bolivar', 'etc'

    letrasMonedaCentavoPlural: "CENTAVOS",
    letrasMonedaCentavoSingular: "CENTAVO"
  };

  if (data.centavos > 0) {
    data.letrasCentavos = "CON " + (function() {
      if (data.centavos == 1)
        return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
      else
        return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
      }
    )();
  };

  if (data.enteros == 0)
    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  if (data.enteros == 1)
    return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
  else
    return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  }

  // Capitalizar la primera letra
  function jsUcfirst(string) {
  	return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function formatCurrency() {
    //number-format the user input
    this.value = parseFloat(this.value.replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function formatCurrencyOfNumber(cantidad) {
    //number-format the user input
    if(typeof cantidad === 'string')
      return parseFloat(cantidad.replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    else {
      return cantidad.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  var percepcionesInput = $('#percepciones')
  percepcionesInput.on('keyup', function(){
    $(this).next('.input-success').text(jsUcfirst(NumeroALetras(this.value).toLowerCase()))

  })
  percepcionesInput.on('change', formatCurrency)

  let inputsSolicitud = $('input')
  cargaEventosInputs(inputsSolicitud)

  function cargaEventosInputs (inputsSolicitud) {
    inputsSolicitud.each(function() {
      let input = $(this)
      input.change(function() {
        if (input.val() !== '') {
          if (input.attr('id') === 'celular') { // pregunto cuando sea el campo del celular
            var celDiezDigitos = input.val().replace(/\s/g,'')
            let regex = /^\d{10}$/;
            if (regex.test(celDiezDigitos)) { // valido el telefono
              $('#loader-phone-message').removeClass('hidden') // si pasa se muestra loader

              // aqui se enviaria el mensaje, solo se simula un periodo de tiempo
              setTimeout(function() {
                $('#loader-phone-message').addClass('hidden')
                $('#phone-message-alert').removeClass('hidden')
              }, 4000);
              input.siblings('.input-error').html('');
              if(input.hasClass('invalid')){
                input.removeClass('invalid')
              }
              input.siblings('.input-success').html(input.val());
            } else {
              input.siblings('.input-error').html('No es un número de teléfono válido');
              input.addClass('invalid')
            }
          }
          else if (input.attr('id') === 'email'){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.val())){
              input.siblings('.input-error').html('');
              if(input.hasClass('invalid')){
                input.removeClass('invalid')
              }
              input.siblings('.input-success').html(input.val());
            }else {

              input.siblings('.input-error').html('No es un correo electrónico válido');
              input.addClass('invalid')
            }

          }
          else {

            input.addClass('valid')
            if(!input.hasClass('input-number')){
              input.siblings('.input-success').html(input.val());
            }
          }
        }
      })
    })

  }



  $('[data-toggle="tooltip"]').tooltip()

  const btnSolicitaOfertas = $('#btnSolicitarOfertas')
  btnSolicitaOfertas.on('click', function() {
    $('#loader-ofertas-credito').removeClass('hidden')
    setTimeout(function() {
      $('#loader-ofertas-credito').addClass('hidden')
      $('#ofertas-credito').removeClass('hidden')
      btnSolicitaOfertas.addClass('hidden')
    }, 4000);
  })

  const btnMasOfertas = $('#btn-mas-ofertas')
  btnMasOfertas.on('click', function() {
    let monto = $('#monto-opcion-credito').text().replace( /^\D+/g, '').replace(/,/g, '')
    $('#monto-opcion-credito').addClass('hidden')
    let periodo = $('#periodo-opcion-credito').val()
    $('#periodo-opcion-credito').addClass('hidden')
    $('#cambia-monto-oferta').removeClass('hidden')
    $('#cambia-periodo-oferta').removeClass('hidden')
    let monto_maximo = 1000000 // lo asignamos aqui para validar cuando se pase de este monto en el input
    $("#slider-monto").slider({
      min: 0, // declarar el monto minimo
      max: monto_maximo, // declarar el monto maximo
      value: parseInt(monto), // asigno el monto de la mejor oferta al slider
      step: 10000, // si se quiere determinar un numero en suma o resta para cada movimiento del slider, ej: del monto ira +-  10000
      tooltip: 'always' // muestra el valor en el slider
    });
    $('#input-monto').val(monto);
    var montoQuincena = parseInt(monto)/parseInt($('#periodo').val())

    $('#monto-quincena').text('$'+formatCurrencyOfNumber(montoQuincena.toFixed(2)))

    // cachar el evento cuando deslizan el slider y actualizar el monto del input
    $("#slider-monto").on("change", function() {
    	$("#input-monto").val(this.value);
      montoQuincena = parseInt(this.value)/parseInt($('#periodo').val())  // no tengo claro si este es el calculo pero aqui se puede cambiar la operacion
      $('#monto-quincena').text('$'+formatCurrencyOfNumber(montoQuincena.toFixed(2)))
    });
    // cachar el evento cuando actualizan el monto del input y actualizar el valor en el slider
    $("#input-monto").on("keyup", function() {
      let valorInput = this.value
      if(parseInt(valorInput) > monto_maximo){
        $(this).next('.input-error').html('Su monto máximo disponible es de  $'+formatCurrencyOfNumber(monto_maximo.toFixed(2)));
        $(this).val(monto_maximo)
        valorInput = monto_maximo
        $("#slider-monto").slider('setValue', parseInt(valorInput))
        montoQuincena = parseInt(valorInput)/parseInt($('#periodo').val())
        return
      }
      $(this).next('.input-error').html('')
    	$("#slider-monto").slider('setValue', parseInt(valorInput))
      montoQuincena = parseInt(valorInput)/parseInt($('#periodo').val())  // no tengo claro si este es el calculo pero aqui se puede cambiar la operacion
      $('#monto-quincena').text('$'+formatCurrencyOfNumber(montoQuincena.toFixed(2)))
    });

    $('#periodo').on("change", function() {
      montoQuincena = parseInt($('#input-monto').val())/parseInt(this.value)  // no tengo claro si este es el calculo pero aqui se puede cambiar la operacion
      $('#monto-quincena').text('$'+formatCurrencyOfNumber(montoQuincena.toFixed(2)))
    });


    btnMasOfertas.addClass('hidden')

    // $('#todas-ofertas').removeClass('hidden')
    // btnMasOfertas.addClass('hidden')
    // var $table = $('.table');
    // var $fixedColumn = $table.clone().insertBefore($table).addClass('fixed-column');
    //
    // $fixedColumn.find('th:not(:first-child),td:not(:first-child)').remove();
    //
    // $fixedColumn.find('tr').each(function (i, elem) {
    //     $(this).height($table.find('tr:eq(' + i + ')').height());
    // });
  })

  const btnsEligeOferta = $('.choose-credit')
  btnsEligeOferta.each(function(){
    let btn = $(this)
    btn.click(function(){
      $('#datos-basicos').removeClass('hidden')
      inputsSolicitud = $('input')
      let cleave = new Cleave('#celular', { // formatear numero celular
        phone: true,
        phoneRegionCode: 'MX'
      });
      cargaEventosInputs(inputsSolicitud)
      // al ingresar el codigo SMS recibido, si se escribe un numero paso enseguida al siguiente input para una facil captura del codigo
      var indexInputCode = 0;
      $(".code-input").bind('keyup', function() {

        var value = $(this).val()
        var regex = /^\d+$/
        if (regex.test(value)) {
          if (indexInputCode < 4){
            $(this).next().focus()
          }
          if (indexInputCode == 4) {
            document.getElementById('btnContinuarSolicitud').classList.remove('hidden')
          }
          indexInputCode++
        }
      });
    })
  })
