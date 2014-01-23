module.exports = function (grunt) {
  
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-ngmin");
  
  // if you simply run "grunt" these default tasks will execute, IN THE ORDER THEY APPEAR!
  grunt.registerTask('default', ["jshint", "clean", "ngmin", "uglify", "cssmin", "copy"]);
  
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
          src: ['partials/*.html', 'js/*.js'],
        }]
      }
    },

    uglify: {
      options: {
        banner: '/* generated: <%= grunt.template.today("yyyy-mm-dd @ HH:MM:ss") %> */\n'
      },
      butcher: {
        src: ['../src/tmp/butcher.ngmin.js'],
        dest: '../dist/js/butcher.min.js'
      }
    },
    
    ngmin: {
      butcher: {
        src: ['../src/js/butcher.js', '../src/js/**/*.js'],
        dest: '../src/tmp/butcher.ngmin.js'
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
              '../src/bower_components/peity/jquery.peity.min.js',
              '../src/bower_components/dkCircles/dk-circles.min.js'
            ],
            dest: '../dist/js/',
            filter: 'isFile'
          }
        ]
      },
      
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
