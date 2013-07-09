/*global module:false*/

process.env.NODE_ENV = 'development'; // default

module.exports = function (grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-devtools');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({
    connect : {
      slides : {
        options : {
          port : 8080
        }
      }
    },
    sass : {
      options : {
        debugInfo : true,
        sourcemap :  true,
        compass : './config.rb',
      },
      theme_default : {
        files : {
          'theme/scss/default.css' : 'theme/scss/default.scss',
        }
      },
      theme_sandiegojs : {
        files : {
          'theme/scss/sandiegojs/sandiegojs.css' : 'theme/scss/sandiegojs/sandiegojs.scss'
        }
      },
      theme_phone : {
        files : {
          'theme/scss/phone.css' : 'theme/scss/phone.scss',
        }
      },
    },
    open : {
      slides : {
        path : 'http://127.0.0.1:<%= connect.slides.options.port %>/index.html'
      },
      github_profile : {
        path : 'http://github.com/mbostock'
      },
      backbone_training : {
        path : 'http://backbonetraining.net/resources'
      },
      twitter_bootstrap_example : {
        path : 'http://twitter.github.io/bootstrap/examples/fluid.html'
      },
      html5rocks : {
        path : 'http://html5rocks.com/'
      },
      console_api : {
        path : 'https://developers.google.com/chrome-developer-tools/docs/commandline-api'
      }
    },
    watch : {
      sass_default : {
        files : ['theme/scss/default.scss', 'theme/scss/_variables.scss', 'theme/scss/_base.scss'],
        tasks : ['sass:theme_default'],
        options : {
          rewatch : true
        }
      },
      sass_sandiegojs : {
        files : [
          'theme/scss/sandiegojs/**/*.scss'
        ],
        tasks : ['sass:theme_sandiegojs'],
        options : {
          rewatch : true
        }
      },
      sass_phone : {
        files : ['theme/scss/phone.scss'],
        tasks : ['sass:theme_phone'],
        options : {
          rewatch : true
        }
      }
    }
  });

  grunt.registerTask('default', [
    'devtools',
  ]);
  
  grunt.registerTask('setup',[
    'build',
    'connect',
    'watch'
  ]);
  
  grunt.registerTask('build', [
    'sass'
  ]);
  
  grunt.registerTask('open-tabs', [
    'open:slides',
    'open:github_profile',
    'open:backbone_training',
    'open:html5rocks',
    'open:console_api',
    'open:twitter_bootstrap_example'
  ]);

  grunt.registerTask('present', [
    'build',
    'connect',
    'open-tabs',
    'watch'
  ]);

};
