import { exec } from 'child_process';

const destPath = '_site/js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (gulp: any): void => {
  gulp.task('scripts', (done: (err?: Error | null) => void) => {
    exec('npx tsc', (err, _stdout, stderr) => {
      if (err) {
        process.stderr.write(stderr);
        return done(new Error('TypeScript compilation failed'));
      }
      gulp
        .src('js/*.js')
        .pipe(gulp.dest(destPath))
        .on('end', done)
        .on('error', done);
    });
  });
};
