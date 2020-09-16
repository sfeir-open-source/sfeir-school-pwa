const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild
    .injectManifest({
      swSrc: 'steps/workbox-2/src/service-worker.js',
      swDest: 'steps/workbox-2/service-worker.js',
      globDirectory: 'steps/workbox-2',
      globPatterns: ['**/*.{js,css,html,png}']
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
};

buildSW();
