const { buildAll } = require('./lib/build-theme');

function logBuildOutputs(outputs) {
    console.log('[sibnight] release build completed');
    for (const outputPath of outputs) {
        console.log(`  wrote ${outputPath}`);
    }
}

function main() {
    const { outputs } = buildAll();
    logBuildOutputs(outputs);
}

try {
    main();
} catch (error) {
    console.error('[sibnight] build failed:', error);
    process.exit(1);
}
