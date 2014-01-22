butcher
=======

GETs meatdata and gives it to you in a consumable format.

### Get Started

* Put the stuff in /dist/ at an Apache or Nginx docroot (point a virtual at /dist/ or whatever)
* Point your browser at it.

### Developing

* `cd src && bower install && cd build && npm install && grunt`
* You just installed your dependencies and ran a build using Grunt.
* Everything we need from the `src` directory was built and/or copied to `dist` which is where the UI lives. 
* Point Apache/nginx/whatevs to that directory.

### To Do

* Get more REST end points from Beardbro
* Include a graphing lib (Piety for now, but maybe D3 later)
* Make the UI look like something.
* Trim the download size when it's all 200s
* Graph some stuff

### License

Apache Version 2

### Changelog

* 0.0.1 First release. This is just barely a thing.