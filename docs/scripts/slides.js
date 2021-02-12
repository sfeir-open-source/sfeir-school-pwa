function schoolSlides() {
  return ['00-school/00-TITLE.md', '00-school/speaker-jef.md'];
}

function introSlides() {
  const directory = '01-intro';
  return [
    `${directory}/00-TITLE.md`,
    `${directory}/01-contexte.md`,
    `${directory}/02-definition.md`,
    `${directory}/03-FIRE.md`,
    `${directory}/05-webapp.md`,
    `${directory}/06-fil-rouge.md`
  ];
}

function serviceWorkersSlides() {
  const directory = '02-serviceworkers';
  return [
    `${directory}/00-TITLE.md`,
    /* intro */
    `${directory}/01-intro.md`,
    `${directory}/02-subscription.md`,
    `${directory}/03-recap-promise.md`,
    `${directory}/04-recap-function.md`,
    `${directory}/05-exercice.md`,
    /* tooling */
    `${directory}/06-outils.md`,
    `${directory}/07-no-window.md`,
    /* events */
    `${directory}/08-events-intro.md`,
    /* lifecycle */
    `${directory}/09-lifecycle-intro.md`,
    `${directory}/10-lifecycle-exercice.md`,
    /* control-lifecycle */
    `${directory}/11-control-lifecycle-intro.md`,
    `${directory}/12-control-lifecycle-exercice.md`,
    /*  fetch-api */
    `${directory}/13-fetch-api-intro.md`,
    `${directory}/14-fetch-api-exercice.md`
  ];
}

function cacheSlides() {
  const directory = '03-cache';
  return [
    /* App-Shell */
    `${directory}/00-TITLE.md`,
    `${directory}/01-app-shell-intro.md`,
    /* offline */
    `${directory}/05-offline-intro.md`,
    `${directory}/06-offline-ex-sw-5-2.md`,
    `${directory}/07-offline-ex-sw-5-3.md`,
    `${directory}/08-offline-ex-sw-5-4.md`,
    `${directory}/09-offline-ex-sw-5-5.md`,
    /* sw-window */
    `${directory}/10-workbox-import.md`,
    `${directory}/11-workbox-precache.md`,
    `${directory}/12-workbox-routing.md`,
    `${directory}/13-workbox-exercice.md`,
    /* cache-strategies */
    `${directory}/50-cache-strategies-intro.md`,
    /* Advanced Cache */
    `${directory}/51-cache-only.md`,
    `${directory}/52-network-only.md`,
    `${directory}/53-cache-first.md`,
    `${directory}/54-network-first.md`,
    `${directory}/55-cache-then-network.md`,
    `${directory}/56-stale-while-revalidate.md`,
    `${directory}/57-generic-fallback.md`,
    `${directory}/58-offline-cookbook.md`
  ];
}

function advancedServiceWorkersSlides() {
  const directory = '04-advanced-sw';
  return [
    /* sw-channels */
    `${directory}/00-TITLE.md`,
    `${directory}/01-sw-channels-intro.md`,
    `${directory}/02-sw-channels-message-all.md`,
    `${directory}/03-sw-channels-exercice-all.md`,
    `${directory}/04-sw-channels-message-one.md`,
    `${directory}/05-sw-channels-exercice-one.md`,
    /* Sync */
    `${directory}/06-sync-intro.md`
  ];
}

function installableSlides() {
  const directory = '05-installable';
  return [
    `${directory}/00-TITLE.md`,
    /* install */
    `${directory}/01-intro.md`,
    `${directory}/02-manifest.md`,
    `${directory}/03-install.md`,
    /* Store */
    `${directory}/04-store-stores.md`,
    `${directory}/05-store-windows-store.md`,
    `${directory}/06-store-chrome-web-store.md`,
    `${directory}/07-store-google-play.md`
  ];
}

function engagingSlides() {
  const directory = '06-engaging';
  return [
    `${directory}/00-TITLE.md`,
    /* ux */
    `${directory}/01-ux-tmp.md`,
    /* push */
    `${directory}/02-push.md`,
    `${directory}/03-push-test.md`
  ];
}

function integratedSlides() {
  const directory = '07-integrated';
  return [
    /* API */
    `${directory}/00-TITLE.md`,
    `${directory}/01-device-apis.md`,
    /* responsive */
    `${directory}/02-responsive.md`
  ];
}

function performancesSlides() {
  const directory = '08-performances';
  return [
    `${directory}/00-TITLE.md`,
    `${directory}/01-loading.md`,
    `${directory}/02-rendering.md`,
    /* PRPL */
    `${directory}/03-prpl-principe.md`,
    `${directory}/04-prpl-entry-point-shell.md`,
    `${directory}/05-prpl-http2-em-modules.md`,
    `${directory}/06-prpl-http2-server-push.md`
  ];
}

function librariresSlides() {
  const directory = '09-libraries';
  return [`${directory}/00-TITLE.md`, `${directory}/01-libraries.md`];
}

function conclusionSlides() {
  const directory = '10-conclusion';
  return [
    `${directory}/00-TITLE.md`,
    `${directory}/01-pwa-summary.md`,
    `${directory}/02-conquer.md`,
    `${directory}/03-conclusion.md`,
    `${directory}/04-ressources.md`
  ];
}

function bonusSlides() {
  return ['00-school/99-BONUS.md'];
}

function formation() {
  return [
    ...schoolSlides(),
    ...introSlides(),
    ...serviceWorkersSlides(),
    ...cacheSlides(),
    ...advancedServiceWorkersSlides(),
    ...installableSlides(),
    ...engagingSlides(),
    ...integratedSlides(),
    ...performancesSlides(),
    ...librariresSlides(),
    ...conclusionSlides(),
    ...bonusSlides()
  ].map(slidePath => {
    return { path: slidePath };
  });
}

export function usedSlides() {
  return formation();
}
