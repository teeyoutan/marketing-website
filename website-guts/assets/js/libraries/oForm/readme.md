#oForm

This is a lightweight jQuery plugin that handles form submissions in JavaScript.

Nearly everything the plugin does is contained in a settings objects. You can
override every setting by passing an object to the oForm jQuery method.

##Overview

oForm catches the submit event on the form, prevents the default behavior and
then does the following:

* executes a `before` function if supplied
* executes a field validation function, if the fields are all valid, it
proceeds, if not, it stops
* submits the data using an $.ajax request
* executes an `after` function if supplied

See settings below for specifics on how each step works.

##Usage

Basic usage:

    $('form').oForm({url: '/whatever/path'});

Advanced usage:

    $('form').oForm({

        url: '/whatever/path',
        before: function(){ alert('hello'); },
        after: function(){ alert('world!'); }

    });

##Settings

Each of the settings below are the defaults, but you can override them by
passing an object with properties of the same name when the oForm method is
executed (see the advanced usage example in the usage section).

###url: string (required)

Returns: `true` if the email is valid `false` if not

The endpoint to which the form data with be POSTed.

###emailIsValid: function

This is the function that validates an email address. The function accepts one
parameter and that is the string of the email address.

###phoneIsValid: function

Returns: `true` if the phone number is valid `false` if not

This is the function that validates a phone number. The function accepts one
parameter and that is the string of the phone number.

###adjustClasses: function

Returns: nothing

This function adds/removes error classes from DOM elements. It accepts two
arguments. The first argument is an HTML node. The second argument is a boolean
value indicating if the DOM node is valid or not.

For example, if the DOM node is [name='email'] and the field is invalid, the
function will do the following:

* add an `error` class to any DOM node of .email-related
* remove a `hidden` class from the DOM node .email-error-message
* add an `error` class to the DOM node [name='email']

If the field is valid, the function will do the opposite:

* remove an `error` class to any DOM node of .email-related
* add a `hidden` class from the DOM node .email-error-message
* remove an `error` class to the DOM node [name='email']

###validation.validateFields: function

This function validates all the form field values. If the form field has a
`required` attribute then the function will validate it. The function uses the
`type` attribute to decide how to validate the value of the node. For example,
for [type='email'] the plugin will use the validation.validators.email function.
If the type is something like text, it will just check for a non-empty string.

###submitData

This function submits the form field data to the specified endpoint. It accepts
one argument which is a callback function to execute after the function is done.

###before: function

This function will be run before the form data is submitted. if the function
return true, the form data will be submitted. If it returns false or undefined
the form data will not be submitted.

The function is passed one argument which is an object. the object contains
one property named 'selector' and the value is the jQuery selector from when
the plugin was initiated.

###after: function

This function will be run after everything is done.

##To do's

* add html5 history api (push state)
