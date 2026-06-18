const { buildAll } = require('./lib/build-theme');

function main() {
    const { outputs } = buildAll();
    console.log('[sibnight] release build completed');
    outputs.forEach((output) => console.log(`  wrote ${output}`));
}

try {
    main();
} catch (error) {
    console.error('[sibnight] build failed:', error);
    process.exit(1);
}
