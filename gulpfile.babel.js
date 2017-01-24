
import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import babel from 'gulp-babel'
import mocha from 'gulp-mocha'
import gutil from 'gulp-util'
import webpack from 'webpack-stream'
import runSequence from 'run-sequence'
import changed from 'gulp-changed'


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

gulp.task('build:users', () => {
  gulp.src('src/server/users/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/server/users'));
});

gulp.task('test:users', () => {
process.env.NODE_ENV = 'test';
  gulp.src('test/server/users/**/*.js')
    .pipe(babel())
    .pipe(mocha())
    .on('error', gutil.log)
});

gulp.task('users', (done) => {
  runSequence('build:users', 'test:users', () => {
    done();
  })
});

gulp.task('build:oinks', () => {
  gulp.src('src/server/oinks/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/server/oinks'));
});

gulp.task('test:oinks', () => {
process.env.NODE_ENV = 'test';
  gulp.src('test/server/oinks/**/*.js')
    .pipe(babel())
    .pipe(mocha())
    .on('error', gutil.log)
});

gulp.task('oinks', (done) => {
  runSequence('build:oinks', 'test:oinks', () => {
    done();
  })
});

gulp.task('build:auth', () => {
  gulp.src('src/server/auth/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/server/auth'));
});

gulp.task('test:auth', () => {
process.env.NODE_ENV = 'test';
  gulp.src('test/server/auth/**/*.js')
    .pipe(babel())
    .pipe(mocha())
    .on('error', gutil.log)
});

gulp.task('auth', (done) => {
  runSequence('build:auth', 'test:auth', () => {
    done();
  })
});

gulp.task('test:server', ['build'], () => {
  process.env.NODE_ENV = 'test';
  gulp.src('test/server/**/*.js')
    .pipe(babel())
    .pipe(mocha())
    .on('error', gutil.log)
});

gulp.task('test:server:watch', () => {
  gulp.watch(['test/server/users/**/*.js', 'src/server/users/**/*.js'], ['users']);
  gulp.watch(['test/server/oinks/**/*.js', 'src/server/oinks/**/*.js'], ['oinks']);
  gulp.watch(['test/server/auth/**/*.js', 'src/server/auth/**/*.js'], ['auth']);
});




// ============ BUILD ============

gulp.task('webpack', () => {
	return gulp.src('src/client/index.js')
		.pipe(webpack(require('./webpack.production.config.js')))
		.pipe(gulp.dest('dist/client'))
});

gulp.task('copy-html', () => {
	gulp.src('src/client/index.html')
		.pipe(gulp.dest('dist/client'));
});

gulp.task('build', () => {
  return gulp.src('src/server/**/*')
    .pipe(changed('dist/server'))
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

gulp.task('production', ['copy-html', 'build', 'webpack']);

gulp.task('default', ['server']);
