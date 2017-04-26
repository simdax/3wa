$(function () {

  $('.badge').lettering();

  $(window).scroll(function () {
    if ($(window).scrollTop() > 2000 & $(window).scrollTop() < 2100){
      $('#background1').css("background-position","77% 25%");
      $('#background1').css("background-size","13%");
    }
    else if($(window).scrollTop() > 2100){
      console.log('io');
      $('#background1').css("background-size","0");
    }
    else{
      $('#background1').css("background-size","13%");
      $('#background1').css("background-position","21% 25%");
    }

  })

})