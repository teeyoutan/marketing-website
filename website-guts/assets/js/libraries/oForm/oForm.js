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

    defaultOptions.textIsValid = function(text){

      if(text){

        return true;

      } else {

        return false;

      }

    };

    defaultOptions.alertValidationError = function(element, isValid){

      if(typeof settings.reportValidationError === 'function' && !isValid){

        settings.reportValidationError(element);

      }

    }

    defaultOptions.adjustClasses = function(element, isValid){

      var relatedClass, messageClass;

      relatedClass = '.' + element.attr('name') + '-related';

      messageClass = '.' + element.attr('name') + '-error-message';

      settings.alertValidationError(element, isValid);

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

          var element, id, elementValue, type, elementIsValid;

          element = $(value);

          dataValidation = $(element).attr('data-validation');

          elementValue = element.val();

          if( dataValidation && settings.validation[dataValidation] ){

            settings.adjustClasses(element, settings.validation[dataValidation](elementValue) );

          } else if( element.attr('required') ){

            type = element.attr('type');

            if(type === 'email'){

              settings.adjustClasses(element, settings.emailIsValid(elementValue) );

            } else if(type === 'tel') {

              settings.adjustClasses(element, settings.phoneIsValid(elementValue) );

            } else if(type === 'url'){

              settings.adjustClasses(element, settings.urlIsValid(elementValue) );

            } else if(type === 'checkbox'){

              settings.adjustClasses(element, settings.checkboxIsValid(elementValue) );

            } else if(type === 'text'){

              settings.adjustClasses(element, settings.textIsValid(elementValue) );

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

      event.preventDefault();

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
