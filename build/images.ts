const imgPath = 'img/**/*.+(png|jpg|gif|svg)';
const destPath = '_site/img';

async function loadImagemin() {
  const { default: imagemin } = await import('gulp-imagemin');
  return imagemin;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (gulp: any): void => {
  gulp.task('images', async () => {
    const imagemin = await loadImagemin();
    return gulp.src(imgPath).pipe(imagemin()).pipe(gulp.dest(destPath));
  });
};
