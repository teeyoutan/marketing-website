$.fn.extend({

  oForm: function(options){

    var defaultOptions, settings, formSelector;

    formSelector = $(this);

    //setup all the default options

    defaultOptions = {};

    defaultOptions.validation = {};

    defaultOptions.validation.validators = {};

    defaultOptions.emailIsValid = function(email){

      if(typeof email === 'string'){

          var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          return emailRegEx.test(email);

      } else {

        return false;

      }

    };

    defaultOptions.phoneIsValid = function(phone){

      if(typeof phone === 'string'){

        console.log('string');

        var phoneOnlyDigits = phone.replace(/\D/g, '');

        console.log(phoneOnlyDigits.length);

        if( phoneOnlyDigits.length >= 10 ){

          console.log('valid');

          return true;

        } else {

          console.log('not valid');

          return false;

        }

      } else {

        return false;

        console.log('not string');
      }

    };

    defaultOptions.adjustClasses = function(element, isValid){

      var relatedClass, messageClass;

      relatedClass = '.' + element.attr('name') + '-related';

      messageClass = '.' + element.attr('name') + '-error-message';

      if(isValid){

        element.removeClass('error');

        $(relatedClass).each(function(index, value){

          $(value).removeClass('error');

        });

        $(messageClass).each(function(index, value){

          $(value).addClass('hidden');

        });


      } else {

        element.addClass('error');

        $(relatedClass).each(function(index, value){

          $(value).addClass('error');

        });

        $(messageClass).each(function(index, value){

          $(value).removeClass('hidden');

        });

      }

    };

    defaultOptions.validateFields = function(args){

        console.log('validate fields');

        var allElementsValid = true;

        $.each( args.selector.find('input:not([type="hidden"])'), function(index, value){

          var element = $(value);

          //name = $(value).attr('name');

          if( element.attr('required') ){

            var type = element.attr('type');

            if(type === 'email'){

              if( settings.emailIsValid(element.val()) === false ){

                settings.adjustClasses(element, false);

                allElementsValid = false;

              } else {

                settings.adjustClasses(element, true);

              }

            } else if(type === 'tel') {

              if( settings.phoneIsValid(element.val()) === false ){

                settings.adjustClasses(element, false);

                allElementsValid = false;

              } else {

                settings.adjustClasses(element, true);

              }

            }

          }

        });

        if( allElementsValid ){

          return true;

        } else {

          $('body').addClass('error');

          return false;

        }

    };

    defaultOptions.submitData = function(callback){

      console.log('submitData running');

      var request;

      request = $.ajax({

        type: 'POST',
        url: settings.url,
        data: formSelector.serialize()

      });

      request.always(function(data, textStatus){

        console.log('text status: ' + textStatus);

        if(typeof callback === 'function'){

          callback(request);

        }

      });

    };

    settings = $.extend(true, defaultOptions, options);

    formSelector.submit(function(event){

      if(typeof settings.before === 'function'){

        if(settings.before() === false){

          console.log('before failed');

          return false;

        }

      }

      if(typeof settings.validateFields === 'function'){

        if(settings.validateFields({selector: formSelector}) === false){

          console.log('validateFields failed');

          return false;

        }

      }

      settings.submitData(settings.after);

      event.preventDefault();

    });

  }

});
