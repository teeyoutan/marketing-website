window.optly.mrkt.gettingStarted = {};

window.optly.mrkt.gettingStarted.changeSlide = function(input) {
    $('.slider ul').attr('class', '').addClass(input);
    $('.controls a').removeClass('active').parent().find('[data-slide="' + input + '"]').addClass('active');
};

window.optly.mrkt.gettingStarted.init = function(event) {
    event.preventDefault();
    
    var nextSlide = $(this).attr('data-slide');
    window.optly.mrkt.gettingStarted.changeSlide(nextSlide);
};

$('[data-slide]').click(window.optly.mrkt.gettingStarted.init);