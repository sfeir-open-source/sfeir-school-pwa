const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const del = require('del');

/**
 * Cleans the prpl-server build in the server directory.
 */
gulp.task('prpl-server:clean', () => {
  return del('server/build');
});

/**
 * Copies the prpl-server build to the server directory while renaming the
 * node_modules directory so services like App Engine will upload it.
 */
gulp.task('prpl-server:build', () => {
  const pattern = 'node_modules';
  const replacement = 'node_assets';

  return gulp
    .src('build/**')
    .pipe(
      rename(path => {
        path.basename = path.basename.replace(pattern, replacement);
        path.dirname = path.dirname.replace(pattern, replacement);
      })
    )
    .pipe(replace(pattern, replacement))
    .pipe(gulp.dest('server/build'));
});

/**
 * Copies the assets to the server directory
 */
gulp.task('prpl-server:assets', () => {
  return gulp.src(['img/**', 'css/**', 'mdl/**'], { base: '.' }).pipe(gulp.dest('server/build'));
});

gulp.task('prpl-server', gulp.series('prpl-server:clean', 'prpl-server:build', 'prpl-server:assets'));
