window.optly = window.optly || {};
window.optly.mrkt = window.optly.mrkt || {};
window.optly.mrkt.services = window.optly.mrkt.services || {};

var optly_QFactory = function(acctData, expData) {
  this.acctData = acctData;
  this.expData = expData;

  this.transformQuedArgs = function(quedArgs) {
    $.each(quedArgs, function(index, arg) {
      if (this[ arg ] !== undefined) {
        quedArgs[ index ] = this[ arg ];
      }
    }.bind(this));
  };

  this.parseQ = function(fnQ, i) {
    var quedArgs;
    if (typeof fnQ[i] === 'function') {
      quedArgs = fnQ.slice(1);

      this.transformQuedArgs(quedArgs);

      fnQ[i].apply( fnQ[i], quedArgs );
    }
    else {
      for(var nestedI = 0; nestedI < fnQ[i].length; nestedI += 1) {

        if (typeof fnQ[i][nestedI] === 'function') {
          quedArgs = fnQ[i].slice(1);

          this.transformQuedArgs(quedArgs);

          fnQ[i][nestedI].apply( fnQ[i][nestedI], quedArgs );
        }
      }
    }
  };

  this.push = function(fnQ) {
    for (var i = 0; i < fnQ.length; i += 1) {
      this.parseQ(fnQ, i);
    } 
  };

  this.userData = {
    account: this.acctData,
    experiments: this.expData
  };

};

window.optly.mrkt.services.xhr = {
  makeRequest: function() {
    var deffereds = [], callbacks = [], defferedPromise;
    for (var i = 0; i < arguments.length; i += 1) {
      if (typeof arguments[i] === 'object') {
        defferedPromise = $.ajax({
          type: arguments[i].type,
          url: arguments[i].url
        });
        // parameters passed must be objects with a path and properties keys
        if (arguments[i].properties) {
          this.handleErrors( defferedPromise, arguments[i].properties );
        }
        if ( arguments[i].callback ) {
          callbacks.push( arguments[i].callback );
        }
        if (arguments.length > 1) {
          deffereds.push( defferedPromise );
        }
        else {
          deffereds = defferedPromise;
        }
      }
    }
    if ( callbacks.length > 0 ) {
      this.resolveDeffereds(deffereds, callbacks);
    }
    
    return deffereds;
  },

  isPromise: function(value) {
    if (typeof value.then !== 'function') {
        return false;
    }
    var promiseThenSrc = String($.Deferred().then);
    var valueThenSrc = String(value.then);
    return promiseThenSrc === valueThenSrc;
  },

  handleErrors: function(deffered, properties) {
    var defferedStatus = {
      error: false,
      errorLog: []
    };

    return deffered.always(function(data, textStatus, jqXHR) {

        // check if the last argument is a promise, if so the response was successful
        if( this.isPromise(jqXHR) && textStatus === 'success'){
          defferedStatus.promise = jqXHR;
          $.each(properties, function(key, prop) {
            // if property is not nested
            if(typeof prop !== 'object') {
              if (typeof data[ key ] === prop) {
                console.log(key + ' is validated');
              }
              else {
                defferedStatus.error = true;
                defferedStatus.errorLog.push('Validation Error: ' + key + ' is not a ' + prop);
              }
            }
            // if property is nested
            else {
              var nestedData = data[ key ];
              // if the property maps to an array
              if ( Array.isArray(nestedData) ) {

                  $.each(nestedData, function(index) {

                    $.each(properties[ key ], function(innerKey, innerProp) {
                      if (typeof nestedData[ index ][ innerKey ] === innerProp) {
                        console.log(innerKey + ' is validated');
                      }
                      else {
                        defferedStatus.error = true;
                        defferedStatus.errorLog.push('Validation Error: ' + innerKey + ' is not a ' + innerProp);
                      }
                    });

                });
              }
              // if the property maps to an object
              else {
                $.each(prop, function(innerKey, innerProp) {
                  if (typeof data[ key ][ innerKey ] === innerProp) {
                    console.log(innerKey + ' is validated');
                  }
                  else {
                    defferedStatus.error = true;
                    defferedStatus.errorLog.push('Validation Error: ' + innerKey + ' is not a ' + innerProp);
                  }
                });
              }

            }
          }); // end outer .each
       
        } else {
          defferedStatus.promise = data;
          defferedStatus.error = true;
          defferedStatus.message = data.responseText + ' ' + data.statusText + ' ' + data.status;
          console.log(defferedStatus);
        }

    }.bind(this));

  },

  resolveDeffereds: function(deffereds, callbacks) {
    var responses = [];
    $.when.apply($, deffereds).done(function() {
      var tranformedArgs = Array.prototype.slice.call(arguments);
      $.each(tranformedArgs, function(index, val) {
        var response = val[0];
        if( !this.isPromise( response ) && val[1] === 'success' ) {
          callbacks[index](response);
          responses.push(response);
        }
        if (index === tranformedArgs.length - 1) {
          //window.optly.mrkt.userInfo = window.optly.mrkt.userInfo || {};
          var oldQue = window.optly_q;

          window.optly_q = new optly_QFactory(responses[0], responses[1]);
          window.optly_q.push(oldQue);
        }
      }.bind(this) );
    }.bind(this) );

    return true;
  },

  readCookie: function (name) {
    // Escape regexp special characters (thanks kangax!)
    name = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');

    var regex = new RegExp('(?:^|;)\\s?' + name + '=(.*?)(?:;|$)','i'),
        match = document.cookie.match(regex);

    return match && window.unescape(match[1]);
  }, 

  getLoginStatus: function(setCookie, requestParams) {
    var deffereds;
    // for testing
    // if (setCookie) {
    //   document.cookie = 'optimizely_signed_in=1';
    // }
    if ( !!this.readCookie('optimizely_signed_in') ) {
      deffereds = this.makeRequest.apply(this, requestParams);
    } else {
      console.log('no signin cookie present!!');
    }
    return deffereds;
  }
  
};

(function() {
  var accountData,
    experimentData,
    acctParams,
    expParams,
    RequestParams = function(requestType, url, properties, callback) {
      this.type = requestType;
      this.url = url;
      this.properties = properties;
      this.callback = callback;
    };

  function accountDataCallback(data) {
    accountData = data;
  }

  function experimentDataCallback(data) {
    experimentData = data;
  }

  acctParams = new RequestParams(
    'GET',
    '/account/info',
    { 
      email: 'string' 
    },
    accountDataCallback
  );

  expParams = new RequestParams(
    'GET',
    '/experiment/load_recent?max_experiments=5',
    {
      experiments: {
        id: 'number',
        description: 'string'
      }
    },
    experimentDataCallback
  );

  return window.optly.mrkt.services.xhr.getLoginStatus(true, [acctParams, expParams]);
}());

