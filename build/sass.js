const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

const scssPath = '_scss/*.scss';
const destPath = '_site/css';

// Function to dynamically import gulp-autoprefixer
async function loadAutoprefixer() {
    const { default: autoprefixer } = await import('gulp-autoprefixer');
    return autoprefixer;
}

module.exports = gulp => {
    gulp.task('sass', async () => {
        const autoprefixer = await loadAutoprefixer();
        return gulp
            .src(scssPath)
            .pipe(
                sass({
                    includePaths: ['scss'],
                    outputStyle: 'expanded',
                })
            )
            .pipe(
                autoprefixer({
                    overrideBrowserslist: ['last 2 versions'],
                    cascade: false,
                })
            )
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(gulp.dest(destPath))
            .pipe(gulp.dest('css'));
    });
};
