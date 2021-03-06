butcher
=======

GETs meatdata and gives it to you in a consumable format.

Pull requests accepted.

### Get Started

* Put the stuff in /dist/ at an Apache or Nginx docroot (point a virtual at /dist/ or whatever)
* Point your browser at it.

### Developing

* `cd src && bower install && cd ../build && npm install && grunt`
* You just installed your dependencies and ran a build using Grunt.
* Everything we need from the `src` directory was built and/or copied to `dist` which is where the UI lives. 
* Point Apache/nginx/whatevs to that directory.

### To Do

* Set up demoware for various NVD3.js directives.
* Get more end points and better JSON from the REST API.
* Design the URLs for the end points (eg, /:channelid/:stattype/:timeperiod)
* Make the UI look like something.
* Make a meat based favicon

### nginx vs apache

There's an .htaccess file in there to help with urls/routes, if you're using nginx, use this instead...

    server {
      listen       8000;
      server_name  novabro;
      location / {
        root   /home/novabro/butcher/dist;
        index  index.html index.htm;
        if (!-e $request_filename){
          rewrite ^(.*)$ /index.html;
        }
      }
    }

### License

Apache Version 2

### Changelog

* 0.3.0 migrate to http://krispo.github.io/angular-nvd3 and upgrade dk.circles
* 0.2.2 return promise rejection, added fav icon
* 0.2.1 $q.reject(obj) in get()
* 0.2.0 converted to ngAnnotate, updated $http meat wrapper
* 0.1.1 return obj for chaining
* 0.1.0 added nvd3js directives
* 0.0.5 Removed Piety, added D3, added a D3 directive.
* 0.0.4 Incremental improvements.
* 0.0.3 Added "participation" exampleware.
* 0.0.2 White space clean up, added NavButtonsCtrl
* 0.0.1 First release. This is just barely a thing.