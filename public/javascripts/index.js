$(function () {

  var range = [2080,3250];

  $('.badge').lettering();

  $(window).scroll(function () {
    if ($(window).scrollTop() > range[0] & $(window).scrollTop() < range[1]){
      $('#background1').css("background-position","77% 25%");
      $('#background1').css("background-size","13%");
    }
    else if($(window).scrollTop() > range[1]){
      $('#background1').css("background-size","0");
    }
    else{
      $('#background1').css("background-size","13%");
      $('#background1').css("background-position","21% 25%");
    }
  })

  $('form').on('submit', submitForm)

})