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

$.getJSON('https://api.greenhouse.io/v1/boards/optimizely7/embed/departments?callback=?').always(function(data, textStatus, jqXHR){

  if(typeof data === 'object'){

    var i;

    for(i = 0; i < data.departments.length; i++){

      if(data.departments[i].jobs.length === 0){

        delete data.departments[i];

      }

    }

    $('#job-list-cont').append( window.optly.mrkt.templates.jobList(data) );

  }

});
