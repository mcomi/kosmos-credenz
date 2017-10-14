
$(function() {

  $.fn.editable.defaults.mode = 'inline';
  $('#username').editable();
});
var $steps = $('.step');
var $menuSteps = $('.menu-step');
  var currentStep = 0,
      nextStep;
  $menuSteps.eq(0).addClass('active'); // active first menu
  $steps.slice(1).hide(); //hide all but first
  $('#enviar').hide()

  $('#next').on('click', function(e) {
    e.preventDefault();

    nextStep = currentStep + 1;
    $($steps.get(currentStep)).hide();
    $($steps.get(nextStep)).show();
    $($menuSteps.get(currentStep)).removeClass('active');
    $($menuSteps.get(nextStep)).addClass('active');
    if (nextStep == 4) {
      $('#next').hide()
      $('#enviar').show()
      return;
    }else{
      $('#next').show()
    }
    currentStep = nextStep;
    window.scrollTo(0, 0);
  });

  $('#prev').on('click', function(e) {
    e.preventDefault();
    if(currentStep==0){
      $('#prev').attr('disabled',true)
      return
    }
    nextStep = currentStep - 1;

    $($steps.get(currentStep)).hide();
    $($steps.get(nextStep)).show();
    $($menuSteps.get(currentStep)).removeClass('active');
    $($menuSteps.get(nextStep)).addClass('active');
    if (nextStep == 0) {
      $('#prev').attr('disabled',true)
      return;
    }
    $('#prev').attr('disabled',false)
    currentStep = nextStep;
  });

$('#fecha_nac').combodate();
$('#fecha_nac_ca').combodate();

$('#ingreso_mensual').on('change',formatCurrency)

function formatCurrency() {
  //number-format the user input
  this.value = parseFloat(this.value.replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

$.fn.exists = function() {
  return this.length > 0;
}
var valid = true;
var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}
// if($(document).width() < 767/*pixels*/){
//             // Not a phone nor a tablet
//     $("a.collapsed").attr("data-toggle", ""); // does not collapse
//     $("a.collapsed").attr("data-target", ""); // does not even have a target to collapse
// }
var step = 'datos-personales';
$('.nav-btn').on('click', function(e) {
  e.preventDefault()
  if(isMobile){

    $(this).closest('.collapse').collapse('hide')
    $(this).closest('.panel').hide()
    step = $(this).closest('.panel').next().find('.collapse').attr('id')
    console.log(step)
    $(this).closest('.panel').next().show()
    $(this).closest('.panel').next().find('.collapse').collapse('show')
  }else{
    $(this).closest('.collapse').collapse('hide')
    $(this).closest('.panel').next().find('.collapse').collapse('show')
  }

})

$('.nav-btn-back').on('click', function(e) {
  e.preventDefault()
  if(step == 'datos-personales'){
     window.location.href = "simulador.html";
  }else{
    $('#'+step).collapse('hide')
    $('#'+step).closest('.panel').hide()
    $('#'+step).closest('.panel').prev().show()
    var newStep = $('#'+step).closest('.panel').prev().find('.collapse').attr('id')
    $('#'+step).closest('.panel').prev().find('.collapse').collapse('show')
    step = newStep
    console.log(step)
  }

})

$('a[data-toggle]').on('click', function(e) {
  console.log($(this))
  // Panel that is currently open
  var panel = $('div.in');
  if (!valid) {
    alert('Sorry panel ' + panel[0].id + ' not validated');
    e.stopPropagation();
  }
});

// valida
function checkInputs() {
  var isValid = true;
  $('input').each(function() {
    if ($(this).val() === '') {
      $('#confirm').prop('disabled', true)
      isValid = false;
      return false;
    }
  });
  if(isValid) {$('#confirm').prop('disabled', false)}
  return isValid;
}

const validateInputs = function (inputs) {
  var validForm = true;

  inputs.each(function(index) {
    let input = $(this);

    if (!input.val() || (input.type === "radio" && !input.is(':checked'))) {
      console.log('No se han llenado todos los campos');
      validForm = false;
    }
  });
  return validForm;
}

/** Formulario Solicitud **/
// agrego evento para manejar la clase valid de cada input y poner su valor debajo
const inputsSolicitud = $('input')
inputsSolicitud.each(function() {
  let input = $(this)
  input.change(function() {
    if (input.val() !== '') {
      if (input.attr('id') === 'celular') { // pregunto cuando sea el campo del celular
        let regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (regex.test(input.val())) { // valido el telefono
          $('#loader-phone-message').removeClass('hidden') // si pasa se muestra loader

          // aqui se enviaria el mensaje, solo se simula un periodo de tiempo
          setTimeout(function() {
            $('#loader-phone-message').addClass('hidden')
            $('#phone-message-alert').removeClass('hidden')
          }, 4000);

        } else {
          input.siblings('.input-error').html('No es un número de teléfono válido');
          input.addClass('invalid')
        }
      } else {

        input.addClass('valid')
        input.siblings('.input-success').html(input.val());
      }
    }
  })
})
// agrego evento a los select para poner su valor debajo
const selectsSolicitud = $('#formDatosPersonales select')
selectsSolicitud.each(function() {
  let select = $(this)
  select.change(function() {
    if (select.val() !== '') {
      select.addClass('valid')
      let optionSelected = select.find("option:selected");
      select.siblings('.input-success').html(optionSelected.text());
    }
  })
})

// manejo de iconos en panel collapsible
function toggleChevron(e) {
  $(e.target).prev('.panel-heading').find("i").toggleClass('fa-minus fa-plus');
}

// $('#accordion').on('hidden.bs.collapse', toggleChevron);
// $('#accordion').on('shown.bs.collapse', toggleChevron);

$('.panel-default').on('show.bs.collapse', function() {
  $(this).addClass('active');
  $(this).find('.panel-heading').find("i").toggleClass('fa-minus fa-plus');
});

$('.panel-default').on('hide.bs.collapse', function() {
  $(this).removeClass('active');
  $(this).find('.panel-heading').find("i").toggleClass('fa-minus fa-plus');
});
// evento cuando elige co-acreditado

$("input[name='inc_acreditado']").click(function() {
  if ($(this).prop('value') == 'si') {
    $('#co-acreditado-form').removeClass('hidden');
  } else {
    if (!$('#co-acreditado-form').hasClass('hidden')) {
      $('#co-acreditado-form').addClass('hidden');
    }
  }
});

// si vive en el mismo domicilio el co-acreditado copia los campos
$("input[name='domicilio_acreditado']").click(function() {
  if ($(this).prop('value') == 'si') {
    $('#calle_ca').val($('#calle').val())
    $('#num_ext_ca').val($('#num_ext').val())
    $('#num_int_ca').val($('#num_int').val())
    $('#cp_ca').val($('#cp').val())
    $('#colonia_ca').val($('#colonia').val())
    $('#delegacion_ca').val($('#delegacion').val())
    $('#ciudad_ca').val($('#ciudad').val())
  }
});

// al ingresar el codigo SMS recibido, si se escribe un numero paso enseguida al siguiente input para una facil captura del codigo
$(".code-input").bind('keyup', function() {
  var indexInput = 0;
  var value = $(this).val()
  var regex = /^\d+$/
  if (regex.test(value)) {
    if (indexInput < 5)
      $(this).next().focus()
    indexInput++
  }
});

// formatea el campo de telefono

if ($('#celular').exists()) {

  let cleave = new Cleave('#celular', {
    phone: true,
    phoneRegionCode: 'MX'
  });
}

//  manejar las 2 diferentes formas para el tipo de validacion de buro
var menuHistorial = $('#historial a');
menuHistorial.each(function() {
  let menuItem = $(this)
  menuItem.click(function() {
    let consulta = menuItem.data('consulta')
    if (consulta == 'tradicional') {
      $('#consulta-tradicional').removeClass('hidden')
      $('#consulta-autenticada').addClass('hidden')
    } else {
      $('#consulta-autenticada').removeClass('hidden')
      $('#consulta-tradicional').addClass('hidden')
    }
  })

})

$("input[name='tarjeta_credito']").click(function() {
  if ($(this).prop('value') == 'si') {
    $('#ult_digitos_tarjeta').prop('disabled', false)
  } else {
    $('#ult_digitos_tarjeta').prop('disabled', true)
  }
});

/* MODAL */

const panelActiveWebcam = $('#panel-webcam')
const panelesAnexaId = $('.anexa-identificacion')

const panelCargaSmartphone = $('.carga-smartphone')
panelCargaSmartphone.click(function(){
  $('#loader-smartphone').removeClass('hidden')
  setTimeout(function(){
    $('#loader-smartphone').addClass('hidden')
    $('#sms-sent').removeClass('hidden')
  },3000)
})

panelActiveWebcam.click(function(){
  $('#webcam').removeClass('hidden')
  $('#optionsIdPhoto').addClass('hidden')

  // Grab elements, create settings, etc.
  const video = document.getElementById('video');

  // Get access to the camera!
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want image now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          video.src = window.URL.createObjectURL(stream);
          video.play();
      });
  }

  // Elements for taking the snapshot
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  // Trigger photo take
  document.getElementById("snap").addEventListener("click", function() {
    context.drawImage(video, 0, 0, 480, 320);
    // canvas.toDataURL() para guardar foto
  });
})

panelesAnexaId.each(function(){
  var panel = $(this)
  panel.click(function(){
    $('#frente-reverso').removeClass('hidden')
    $('#optionsIdPhoto').addClass('hidden')

  })
})

$('input[type=file]').change(function() {

  $('#loader-id').removeClass('hidden') // si pasa se muestra loader

  setTimeout(function() {
    $('#loader-id').addClass('hidden')
  }, 3000)
})

const saveImageBtn = $('#savePhotoWebcam')
saveImageBtn.click(function() {
  $('#optionsIdPhoto').removeClass('hidden')
  $('#webcam').addClass('hidden')
})
