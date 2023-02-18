$(document).ready(function() {
  // Set the initial active slide
  $('#myCarousel .carousel-item:first').addClass('active');

  // Set up the carousel to transition between slides every 5 seconds
  setInterval(function() {
    var currentSlide = $('#myCarousel .carousel-item.active');
    var nextSlide = currentSlide.next('.carousel-item');
    if (nextSlide.length === 0) {
      nextSlide = $('#myCarousel .carousel-item:first');
    }
    currentSlide.removeClass('active');
    nextSlide.addClass('active');
  }, 5000);

  // Toggle fullscreen mode when the user clicks on a slide
  $('#myCarousel .carousel-item').click(function() {
    if (!document.fullscreenElement) {
      $('#myCarousel')[0].requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
});
