const { execFileSync } = require('child_process');
execFileSync(process.execPath, ['scripts/build.js'], { stdio: 'inherit' });
execFileSync(process.execPath, ['scripts/check.js'], { stdio: 'inherit' });
