import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import cleanCSS from 'gulp-clean-css';

const sass = gulpSass(dartSass);
const scssPath = '_scss/*.scss';
const destPath = '_site/css';

async function loadAutoprefixer() {
  const { default: autoprefixer } = await import('gulp-autoprefixer');
  return autoprefixer;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (gulp: any): void => {
  gulp.task('sass', async () => {
    const autoprefixer = await loadAutoprefixer();
    return gulp
      .src(scssPath)
      .pipe(sass({ includePaths: ['scss'], outputStyle: 'expanded' }))
      .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'], cascade: false }))
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(gulp.dest(destPath))
      .pipe(gulp.dest('css'));
  });
};
