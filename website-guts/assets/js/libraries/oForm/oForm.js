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

        var phoneOnlyDigits = phone.replace(/\D/g, '');

        if( phoneOnlyDigits.length >= 10 ){

          return true;

        } else {

          return false;

        }

      } else {

        return false;

      }

    };

    defaultOptions.checkboxIsValid = function(checkbox){

      if( $(checkbox).prop('checked') ){

        return true;

      } else {

        return false;

      }

    };

    defaultOptions.urlIsValid = function(url){

      if(url){

        return true;

      } else {

        return false;

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

            } else if(type === 'url'){

              if( settings.urlIsValid(element.val()) === false ){

                settings.adjustClasses(element, false);

                allElementsValid = false;

              } else {

                settings.adjustClasses(element, true);

              }

            } else if(type === 'checkbox'){

              if( settings.checkboxIsValid(element) === false ){

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

          $('body').removeClass('error');

        } else {

          $('body').addClass('error');

          return false;

        }

    };

    defaultOptions.submitData = function(callback){

      var request;

      request = $.ajax({

        type: 'POST',
        url: settings.url,
        data: formSelector.serialize()

      });

      console.log(request);

      request.always(function(){

        if(typeof callback === 'function'){

          callback(request);

        }

      });

    };

    settings = $.extend(true, defaultOptions, options);

    formSelector.submit(function(event){

      console.log('running');

      if(typeof settings.before === 'function'){

        if(settings.before() === false){

          return false;

        }

      }

      if(typeof settings.validateFields === 'function'){

        if(settings.validateFields({selector: formSelector}) === false){

          return false;

        }

      }

      settings.submitData(settings.after);

      event.preventDefault();

    });

  }

});
