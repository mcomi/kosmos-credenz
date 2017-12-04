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
