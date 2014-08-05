(function($){ 

  window.optly = window.optly || {}; 

  window.optly.mrkt = window.optly.mrkt || {}; 

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
    return false;
});

window.optly.mrkt.jobsPage.testimonials();

$.getJSON('/job-list').always(function(data, textStatus, jqXHR){

  if(typeof jqXHR === 'object'){

    try{

      var jobs = $.parseJSON(jqXHR.responseText);

      $('#job-list-cont').append( window.optly.mrkt.templates.jobList(jobs) );

    } catch(error){

      console.log('error: ', error);

    }

  }

});
})(jQuery);