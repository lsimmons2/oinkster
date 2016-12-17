
import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import babel from 'gulp-babel'

gulp.task('build', () => {
  return gulp.src('src/server/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/server'));
});

gulp.task('build:watch', () => {
  gulp.watch('src/server/*', ['build']);
})

gulp.task('server', () => {
  nodemon({
    watch: [
      'dist/server/*'
    ],
    env: {
      NODE_ENV: 'dev'
    },
    script: 'dist/server/index.js'
  })
});

gulp.task('server:debug', ['build:watch'], () => {
  nodemon({
    watch: [
      'dist/server/*'
    ],
    env: {
      NODE_ENV: 'dev'
    },
    script: 'dist/server/index.js',
    exec: 'node --inspect'
  })
});

gulp.task('default', ['build:watch', 'server']);
