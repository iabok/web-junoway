/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),


        /**
        *  Watching
        *  ========
        *
        *  Automatically tests and builds your code
        *  whenever you edit the source files or tests.
        */
        watch: {
            scripts: {
                files: ['src/**/!(templates).js', 'src/**/*.html', 'test/**/*.js'],
                tasks: ['build'],
                options: {
                    interrupt: true
                }
            }
        },


        /**
        *  Linting
        *  =======
        *
        *  Catch errors quickly with JS Hint
        */
        jshint: {
            all: ['Gruntfile.js', 'src/**/!(templates).js', 'test/!(libs)/*.js'],
            options: {
                curly: true, // Always use curlys {}
                eqeqeq: true, // No more == for you, === only
                immed: true, // prohibits the use of immediate function invocations without wrapping them in parentheses
                latedef: true, // no setting variables before they are defined
                newcap: true, // Always call constructors with a Cap
                noarg: true, // prohibits arguments.caller and arguments.callee
                sub: true, // This option suppresses warnings about using [] notation when it can be expressed in dot notation: person['name'] vs. person.name.
                undef: true, // prohibits the use of explicitly undeclared variables
                boss: true, // Allows assignments in ifs - if (a = 10) {}
                eqnull: true, // Allows == null check for null or undefined
                browser: true, // Sets up globals for browser like window and document
                maxdepth: 3, // Max nesting of methods 3 layers deep
                unused: true, // Warns on unused variables
                expr: true, // Allowed for chais expect(false).to.be.false; assertion style.
                devel: true, // Allows console.log's etc
                trailing: true, // Prohibits trailing whitespace

                globals: {
                    require: true,
                    define: true,
                    requirejs: true,
                    suite: true,
                    expect: true,
                    test: true,
                    setup: true,
                    teardown: true,
                    sinon: true,
                    mocha: true
                }
            }
        },


        /**
        *  Testing
        *  =======
        *
        *  Run your unit tests in headless phantomJS
        */
        mocha: {
            index: ['test/test-runner.html']
        },


        /**
        *  Templating
        *  ==========
        *
        *  Pre-compile your handlebars templates
        */
        ejs: {
            all: {
              src: ['src/templates/**/*.ejs', '!src/templates/_partials/**/*', '!src/templates/_layouts/**/*'],
              //cwd: 'src/',
              //dest: 'templates/subscription',
              expand: true,
              ext: '.html',
              options: {
                title: 'Junoway-scriptions',
              },
            }
        },

        handlebars: {
            compile: {
                options: {
                    amd: true,
                    wrapped: true,
                    processName: function(filename) {
                        return filename.replace("src/templates/", "");
                    }
                },
                files: {
                    "src/templates.js": "src/**/*.html"
                }
            }
        },


        /**
        *  Building
        *  ========
        *
        *  Build your amd modules into a single minified JS file
        */
        requirejs: {
            compile: {
                options: {
                    name: "../components/almond/almond", // Path to almond requirejs production runner for built js
                    baseUrl: "src",
                    mainConfigFile: "./require.config.js",
                    include: ['main',
                    'helpers/utils',
                    'collections/countries',
                    'collections/subscription/practitioner',
                    'collections/subscription/facilitator',
                    'models/subscription/practitioner',
                    'models/subscription/facilitator',
                    'views/subscription/homepage',
                    'views/subscription/practitioner',
                    'views/subscription/facilitator'
                                      
                    
                    ], // Include the main module defined
                    insertRequire: ['main',
                    'helpers/utils',
                    'collections/countries',
                    'collections/subscription/practitioner',
                    'collections/subscription/facilitator',
                    'models/subscription/practitioner',
                    'models/subscription/facilitator',
                    'views/subscription/homepage',
                    'views/subscription/practitioner',
                    'views/subscription/facilitator'
                    
                     
                    ], // Add a require step in at the end for the main module.
                    wrap: true, // Wrap everything up in a closure
                    generateSourceMaps: true, // Experimental
                    preserveLicenseComments: false, // Needs turned off for generateSourceMaps
                    optimize: "uglify2", // Supports generateSourceMaps
                    out: "assets/javascripts/build.js"
                }
            }
        },

        /**
         *  Stylesheets
         *  ===========
         *
         *  Compile, concat & lint css and less files into a single output file
         */
      /*watch: {
            src: {
                files: ['**//*/*.scss', '**//*.php'],
                tasks: ['compass:dev']
            },
           options: {
                livereload: true,
            },
        },*/
        compass: {
            dev: {
                options: {
                    sassDir: 'src/styles/sass',
                    cssDir: 'assets/stylesheets',
                    imagesPath: 'assets/img',
                    noLineComments: false,
                    outputStyle: 'expanded'
                }
            }
        },
        htmlmin: {
            options: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeOptionalTags: true
            },
            compress: {
            src: 'htmls/index.html',
            dest: "../index.html"
            }
        }
    });




    // Version assets
    grunt.registerTask('version-assets', 'version the static assets just created', function() {

        var Version = require("node-version-assets");
        var versionInstance = new Version({
            assets: ['assets/stylesheets/style.css', 'assets/javascripts/build.js'],
            grepFiles: ['../index.html']
        });

        var cb = this.async(); // grunt async callback
        versionInstance.run(cb);
    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha');
    //grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks('grunt-ejs-locals');
    grunt.loadNpmTasks("grunt-contrib-htmlmin");

    // Define tasks
    grunt.registerTask('test', ['jshint', 'ejs', 'handlebars', 'mocha']);
    grunt.registerTask('styles', ['compass']);
    grunt.registerTask('html', ['htmlmin']);
    grunt.registerTask('build', ['test', 'requirejs', 'styles', 'html', 'version-assets']);
    grunt.registerTask('default', 'build');

};
