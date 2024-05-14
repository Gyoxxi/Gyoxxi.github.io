const gulp = require('gulp');

const imgPath = 'img/**/*.+(png|jpg|gif|svg)';
const destPath = '_site/img';

// Function to dynamically import gulp-imagemin
async function loadImagemin() {
  const { default: imagemin } = await import('gulp-imagemin');
  return imagemin;
}

module.exports = gulp => {
  gulp.task('images', async () => {
    const imagemin = await loadImagemin();
    return gulp
        .src(imgPath)
        .pipe(imagemin())
        .pipe(gulp.dest(destPath));
  });
};
