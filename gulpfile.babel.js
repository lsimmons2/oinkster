
import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import babel from 'gulp-babel'
import mocha from 'gulp-mocha'
import gutil from 'gulp-util'



// ============ TEST ============

gulp.task('components', () => {
  process.env.NODE_ENV = 'test';
  gulp.src('test/client/components/**/*.spec.js')
    .pipe(babel())
    .pipe(mocha())
    .on('error', gutil.log)
});

gulp.task('actions', () => {
  process.env.NODE_ENV = 'test';
  gulp.src('test/client/actions/**/*.js')
    .pipe(babel())
    .pipe(mocha())
    .on('error', gutil.log)
})

gulp.task('reducers', () => {
  process.env.NODE_ENV = 'test';
  gulp.src('test/client/reducers/**/*.js')
    .pipe(babel())
    .pipe(mocha())
    .on('error', gutil.log)
})

gulp.task('test:client', ['components', 'actions', 'reducers']);

gulp.task('test:client:watch', () => {
  gulp.watch(['test/client/**/*.js', 'src/client/**/*.js'], ['test:client']);
});

gulp.task('test:server', ['build'], () => {
  process.env.NODE_ENV = 'test';
  gulp.src('test/server/**/*.js')
    .pipe(babel())
    .pipe(mocha())
    .on('error', gutil.log)
});

gulp.task('test:server:watch', () => {
  gulp.watch(['test/server/**/*.js', 'src/server/**/*.js'], ['test:server']);
});




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
