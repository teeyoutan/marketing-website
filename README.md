#Marketing website

Planning docs here: https://drive.google.com/a/optimizely.com/folderview?id=0B4VR-FZkzkAVSGpibGp1SjBwUmM&usp=sharing

##Overview

The website has a static architecture. Everything is complied by [Grunt](http://gruntjs.com), the JavaScript task runner.

###HTML

The static HTML files are created by (Assemble)[http://assemble.io]. Assemble parses Handlebars templates to create the static HTML files.

###CSS

The CSS is compiles using [Sass](https://github.com/sindresorhus/grunt-sass).

##Getting started (for developers)

###Step 1: Install node.js (and npm)

You can easily install both with the installer found on the [Node](http://nodejs.org/) website.

###Step 2: Clone this repo

###Step 3: Install npm dependencies

Navigate to the repo directory. In the command line execute the following command:

`npm i`

###Step 4: Install bower dependencies

Navigate to the repo directory. In the command line execute the following:

`bower install`

All done!

##Starting the local server

In the root of the repo, execute this command: `grunt server`