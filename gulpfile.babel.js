
import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import babel from 'gulp-babel'
import mocha from 'gulp-mocha'
import gutil from 'gulp-util'



// ============ TEST ============

gulp.task('test:back', ['build'], () => {
  process.env.NODE_ENV = 'test';
  gulp.src('test/server/**/*.js')
    .pipe(babel())
    .pipe(mocha())
    .on('error', gutil.log)
})

gulp.task('test:back:watch', () => {
  gulp.watch(['test/server/**/*.js', 'src/server/**/*.js'], ['test:back']);
})




// ============ BUILD ============

gulp.task('build', () => {
  return gulp.src('src/server/**/*')
    .pipe(babel())
    .pipe(gulp.dest('dist/server'));
});

gulp.task('build:watch', ['build'], () => {
  gulp.watch('src/server/**/*', ['build']);
})

gulp.task('server', ['build:watch'], () => {
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

gulp.task('default', ['server']);
