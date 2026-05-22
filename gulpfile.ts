import gulp from 'gulp';
import sassTask from './build/sass';
import scriptsTask from './build/scripts';
import imagesTask from './build/images';
import syncTask from './build/browsersync';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
[sassTask, scriptsTask, imagesTask, syncTask].forEach((task: (g: any) => void) => task(gulp));

gulp.task('build', gulp.series('sass', 'scripts', 'images', 'jekyll-build'));
