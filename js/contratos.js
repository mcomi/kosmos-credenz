$('#contratos').click(function(){
  $('#instrucciones').removeClass('hidden')
  $('html, body').animate({ scrollTop: $('#instrucciones').offset().top }, 'slow');
})
