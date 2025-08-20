const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
  .copy('src/**/*.html', 'dist/')
  .copyDirectory('src/assets', 'dist/assets')
  .js('src/scripts/app.js', 'dist/scripts/')
  .sass('src/styles/app.scss', 'styles/', { 
    sassOptions: { 
      outputStyle: mix.inProduction() ? 'compressed' : 'expanded' 
    } 
  })
  .options({
    processCssUrls: false,
    autoprefixer: {
      options: {
        overrideBrowserslist: [
          'last 2 versions',
          '> 1%',
          'not dead'
        ],
        grid: true
      }
    },
    // Enable tree shaking
    terser: {
      terserOptions: {
        compress: {
          drop_console: mix.inProduction(),
        },
      },
    },
    // Optimize CSS
    postCss: [
      require('cssnano')({
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }]
      })
    ]
  })
  .sourceMaps(!mix.inProduction(), 'source-map')
  .setPublicPath('dist')
  .browserSync({
    proxy: false,
    server: 'dist',
    files: [
      'dist/**/*'
    ],
    // Optimize browser sync
    ghostMode: false,
    open: true
  })
  .webpackConfig({
    devtool: mix.inProduction() ? false : 'source-map',
    resolve: {
      modules: [
        'src/scripts',
        'node_modules'
      ]
    },
    // Production optimizations
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    // Performance hints
    performance: {
      hints: mix.inProduction() ? 'warning' : false,
      maxAssetSize: 250000,
      maxEntrypointSize: 250000,
    }
  })
  .disableSuccessNotifications();

// Version files in production for cache busting
if (mix.inProduction()) {
  mix.version();
}
