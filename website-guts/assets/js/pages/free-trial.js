$('form :input').each(function(index, elem) {

    var eId = $(elem).attr('id');

    var label = null;

    if (eId && (label = $(elem).parents('form').find('label[for='+eId+']')).length === 1) {

        $(elem).attr('placeholder', $(label).html());

        $(label).addClass('hide-label');

    }

});

$('#seo-form').oForm({

  url: '/account/free_trial_landing',
  validation: {

    name: function(value){

      window.console.log('whoa');

      if(value.length > 1){

        return true;

      } else {

        return false;

      }

    }

  },
  after: function(){

    console.log('SUCCESS');

  }

});
