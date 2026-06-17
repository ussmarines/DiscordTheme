const { buildAll } = require('./lib/build-theme');

try {
    const { outputs } = buildAll();
    console.log('[sibnight] release build completed');
    outputs.forEach((output) => console.log(`  wrote ${output}`));
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
