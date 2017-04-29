$(function () {

  var positionMacronMarine = $("#iframes").position().top;
  var positionBAM = $("#svg").position().top;

  var range = [positionMacronMarine - 60, positionBAM + 250];

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

})