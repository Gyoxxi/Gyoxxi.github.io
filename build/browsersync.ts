import browserSync from 'browser-sync';
import { spawn } from 'child_process';

const bs = browserSync.create();
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const scssPath = '_scss/**/*.scss';
const jsPath = '_scripts/*.ts';
const templatePath = [
  '*.html',
  '+(_includes|_layouts)/*.html',
  '*.yml',
  '_data/*.yml',
  '_posts/*',
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (gulp: any): void => {
  const reloadBrowser = (done: () => void): void => {
    bs.reload();
    done();
  };

  gulp.task('jekyll-build', (done: () => void) => {
    return spawn(jekyll, ['build'], { stdio: 'inherit' }).on('close', done);
  });

  gulp.task('jekyll-dev', (done: () => void) => {
    return spawn(jekyll, ['build', '--config', '_config.yml,_config_dev.yml'], {
      stdio: 'inherit',
    }).on('close', done);
  });

  gulp.task('jekyll-rebuild', gulp.series(['jekyll-dev', reloadBrowser]));

  gulp.task(
    'serve',
    gulp.series('jekyll-dev', () => {
      bs.init({ server: { baseDir: '_site' } });

      gulp.watch(scssPath, gulp.series(['sass', reloadBrowser]));
      gulp.watch(jsPath, gulp.series(['scripts', reloadBrowser]));
      gulp.watch(templatePath, gulp.task('jekyll-rebuild'));
    })
  );
};
