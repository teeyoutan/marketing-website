window.optly.mrkt.index = {};

window.optly.mrkt.index.testItOut = function(editURL){

  //send user to the editor
  window.location = 'https://www.optimizely.com/edit?url=' + editURL;

};

$('input[type="text"]').focus();

$('#test-it-out-form').submit(function(e){

  var inputVal = $('input[type="text"]').val();

  if( inputVal ){

      window.optly.mrktEng.index.testItOut( inputVal );

  } else {

    $('input[type="text"]').focus();

  }

  e.preventDefault();

});

$('#touch-homepage-create-account-form').oForm({

  validation: {

    password1: window.optly.mrkt.oForm.validatePassword,
    password2: function(){

      return $('#touch-cta input[name="password1"]').val() === $('#touch-cta input[name="password2"]').val();

    }

  },
  afterLocal: function(rs, cb){

    //window.alert('heyo!');
    //console.log('afterLocal running');

    if(typeof rs === 'object'){

      console.log('rs: ', + rs);

      var r = rs.responeJSON;

      console.log('r: ', r);

      window.analytics.identify(r.email, {
        name: r.first_name + ' ' + r.last_name,
        email: r.email,
        plan: r.subscription_plan
      });

      window.analytics.track('/account/create/success', {
        category: 'Accounts',
        label: window.location.pathname
      },{
        Marketo: true
      });

      window.analytics.track('/account/signin', {
        category: 'Accounts',
        label: window.location.pathname
      },{
        Marketo: true
      });

      //to do: execute sign in function

      //run callback
      if(typeof cb === 'function'){

        cb(rs);

      }

    } else if(typeof cb === 'function'){

      cb();

    }

  }

});
