window.addEventListener('DOMContentLoaded', function(){
    // 스크롤 이벤트 처리
    window.addEventListener("scroll", function(event){
      if(document.querySelector('.header_g_progressbar') != null)setProgress();
    });
  });
  
  function setProgress() {          
    let currY = document.documentElement.scrollTop; // 스크롤한 높이
    let totalY = document.documentElement.scrollHeight - document.documentElement.clientHeight; // 전체 높이
    let percentage = (currY / totalY) * 100; // 퍼센트 값
    document.querySelector(".header_g_progress").style.width = percentage + "%"; // 프로그래스바 너비 변경
  }

$(function(){
  // 스크롤 시 header fade-in
  $(document).on('scroll', function(){
      if($(window).scrollTop() > 100){
          $("#header").removeClass("deactive");
          $("#header").addClass("active");
      }else{
          $("#header").removeClass("active");
          $("#header").addClass("deactive");
      }
  })

});


$(function() {
  $('.hamburger-button').on('click', function(event){
      event.preventDefault();
      
      $(this).toggleClass('active2');
      $('.overlay').toggleClass('visible');

  });
  
  $('.header_content_a').on('click', function(event){
    
    $('.overlay').toggleClass('visible');
    $('.hamburger-button').toggleClass('active2');

  });
});