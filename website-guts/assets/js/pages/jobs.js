window.optly.mrkt.jobsPage = {};

window.optly.mrkt.jobsPage.testimonials = function() {
    var $quotes = $('h4.quotes q');
    $($quotes[0]).show();

    $('.employee-icons a').each(function(index){
        $(this).click(function(event){
            event.preventDefault();
            $quotes.hide();
            $($quotes[index]).show();
        });
    });
};

$('#view-all-jobs').click(function() {
    $('html, body').animate({scrollTop: $('#jobs-list').offset().top}, 700);
});

window.optly.mrkt.jobsPage.testimonials();