$(function () {

  $('.badge').lettering();

  $(window).scroll(function () {
    if ($(window).scrollTop() > 2000){
      $('#background1').css("background-position","75% 25%");
    }
    else{
      $('#background1').css("background-position","20% 25%");
    }

  })

})