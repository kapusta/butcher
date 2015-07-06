module.exports = function (grunt) {
  
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-ng-annotate");
  
  // if you simply run "grunt" these default tasks will execute, IN THE ORDER THEY APPEAR!
  grunt.registerTask('default', ["jshint", "clean", "ngAnnotate", "uglify", "cssmin", "copy"]);
  
  grunt.registerTask("reload", "reload Chrome on OS X", function() {
    require("child_process").exec("osascript " +
      "-e 'tell application \"Google Chrome\" " +
      "to tell the active tab of its first window' " +
      "-e 'reload' " +
      "-e 'end tell'"
    );
  });
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
      files: ['../src/js/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      },
    },
    
    clean: {
      options: {
        force: true, // danger will robinson!
      },
      target: {
        files: [{
          expand: true,
          cwd: '../dist/',
          src: ['partials/**', 'js/**', 'css/**'],
        }]
      }
    },
    
    // Migrated from ngMin to ngAnnotate -> https://github.com/btford/ngmin/issues/93
    // https://github.com/mzgol/grunt-ng-annotate
    ngAnnotate: {
      options: {
        add: true,
        singleQuotes: true
      },
      butcher: {
        files: {
          '../src/tmp/butcher.annotated.js':
          ['../src/js/butcher.js', '../src/js/**/*.js']
        }
      }
    },
    
    uglify: {
      butcher: {
        src: ['../src/tmp/butcher.annotated.js'],
        dest: '../dist/js/butcher.min.js'
      }
    },
    
    /* (dest : src) */
    cssmin: {
      compress: {
        files: {
          '../dist/css/butcher.min.css': ['../src/css/butcher.css']
        }
      }
    },
    
    
    copy: {
      partials: {
        files: [
          { // don't need to copy index.html
            expand: true,
            cwd: "../src/partials",
            src: ['**'], 
            dest: '../dist/partials/',
            filter: 'isFile'
          }
        ]
      },
      js: { // any files that were minified by the authors should be in here
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              '../src/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
              '../src/bower_components/nvd3/build/nv.d3.min.js',
              '../src/bower_components/d3/d3.min.js',
              '../src/bower_components/angular-nvd3/dist/angular-nvd3.min.js',
              '../src/bower_components/dkCircles/dk-circles.min.js'
            ],
            dest: '../dist/js/',
            filter: 'isFile'
          }
        ]
      },
      css: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              '../src/bower_components/nvd3/build/nv.d3.min.css'
            ],
            dest: '../dist/css/',
            filter: 'isFile'
          }
        ]
      }
    },
    
    watch: {
      js: {
        files: "<%= '../src/js/**/*.js' %>",
        tasks: ["default", "reload"]
      },
      tmpl: {
        files: "<%= '../src/partials/**/*' %>",
        tasks: ["default", "reload"]
      }
    }
  });
};
