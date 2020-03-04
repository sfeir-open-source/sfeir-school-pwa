function schoolSlides(full) {
  return ['00-school/00-TITLE.md', '00-school/speaker-jef.md'];
}

function introSlides(full) {
  return [
    '01-intro/00-TITLE.md',
    '01-intro/01-contexte.md',
    '01-intro/02-definition.md',
    '01-intro/03-FIRE.md',
    '01-intro/04-outils.md',
    '01-intro/05-webapp.md',
    '01-intro/06-intro-secu.md'
  ];
}

function serviceWorkersSlides(full) {
  return [
    '02-serviceworkers/00-TITLE.md',
    /* intro */
    '02-serviceworkers/01-intro.md',
    '02-serviceworkers/02-subscription.md',
    '02-serviceworkers/03-recap-promise.md',
    '02-serviceworkers/04-recap-function.md',
    '02-serviceworkers/05-exercice.md',
    '02-serviceworkers/06-no-window.md',
    /* events */
    '02-serviceworkers/07-events-intro.md',
    /* lifecycle */
    '02-serviceworkers/08-lifecycle-intro.md',
    '02-serviceworkers/09-lifecycle-exercice.md',
    /* control-lifecycle */
    '02-serviceworkers/10-control-lifecycle-intro.md',
    '02-serviceworkers/11-control-lifecycle-exercice.md',
    /*  fetch-api */
    '02-serviceworkers/12-fetch-api-intro.md',
    '02-serviceworkers/13-fetch-api-exercice.md'
  ];
}

function cacheSlides(full) {
  return [
    /* App-Shell */
    '03-cache/00-TITLE.md',
    '03-cache/01-app-shell-intro.md',
    '03-cache/02-app-shell-exercice.md',
    '03-cache/03-app-shell-mesure-speed.md',
    /* cache-strategies */
    '03-cache/04-cache-strategies-intro.md',
    /* offline */
    '03-cache/05-offline-intro.md',
    '03-cache/06-offline-ex-sw-5-2.md',
    '03-cache/07-offline-ex-sw-5-3.md',
    '03-cache/08-offline-ex-sw-5-4.md',
    '03-cache/09-offline-ex-sw-5-5.md',
    /* sw-window */
    '03-cache/10-workbox-import.md',
    '03-cache/11-workbox-precache.md',
    '03-cache/12-workbox-routing.md',
    '03-cache/13-workbox-exercice.md'
  ];
}

function advancedServiceWorkersSlides(full) {
  return [
    /* sw-channels */
    '04-advanced-sw/00-TITLE.md',
    '04-advanced-sw/01-sw-channels-intro.md',
    '04-advanced-sw/02-sw-channels-message-all.md',
    '04-advanced-sw/03-sw-channels-exercice-all.md',
    '04-advanced-sw/04-sw-channels-message-one.md',
    '04-advanced-sw/05-sw-channels-exercice-one.md',
    /* Sync */
    '04-advanced-sw/06-sync-intro.md'
  ];
}

function installableSlides(full) {
  return [
    '05-installable/00-TITLE.md',
    /* install */
    '05-installable/01-intro.md',
    '05-installable/02-manifest.md',
    '05-installable/03-install.md',
    /* Store */
    '05-installable/04-store-stores.md',
    '05-installable/05-store-windows-store.md',
    '05-installable/06-store-chrome-web-store.md',
    '05-installable/07-store-google-play.md'
  ];
}

function engagingSlides(full) {
  return [
    '06-engaging/00-TITLE.md',
    /* ux */
    '06-engaging/01-ux-tmp.md',
    /* push */
    '06-engaging/02-push.md',
    '06-engaging/03-push-test.md'
  ];
}

function integratedSlides(full) {
  return [
    /* API */
    '07-integrated/00-TITLE.md',
    '07-integrated/01-device-apis.md',
    /* responsive */
    '07-integrated/02-responsive.md'
  ];
}

function performancesSlides(full) {
  return [
    '08-performances/00-TITLE.md',
    '08-performances/01-loading.md',
    '08-performances/02-rendering.md',
    /* PRPL */
    '08-performances/03-prpl-principe.md',
    '08-performances/04-prpl-entry-point-shell.md',
    '08-performances/05-prpl-http2-em-modules.md',
    '08-performances/06-prpl-http2-server-push.md'
  ];
}

function librariresSlides() {
  return ['09-libraries/00-TITLE.md', '09-libraries/01-libraries.md'];
}

function conclusionSlides() {
  return [
    '10-conclusion/00-TITLE.md',
    '10-conclusion/01-pwa-summary.md',
    '10-conclusion/02-conquer.md',
    '10-conclusion/03-conclusion.md',
    '10-conclusion/04-ressources.md'
  ];
}

function bonusSlides() {
  return ['00-school/99-BONUS.md'];
}

function fullFormation() {
  return [
    ...schoolSlides(true),
    ...introSlides(true),
    ...serviceWorkersSlides(true),
    ...cacheSlides(true),
    ...advancedServiceWorkersSlides(true),
    ...installableSlides(true),
    ...engagingSlides(true),
    ...integratedSlides(true),
    ...performancesSlides(true),
    ...librariresSlides(true),
    ...conclusionSlides(true)
  ]
    .map(slidePath => {
      return {
        path: slidePath
      };
    })
    .slice();
}

function oneDayFormation() {
  return [
    ...schoolSlides(false),
    ...introSlides(false),
    ...serviceWorkersSlides(false),
    ...cacheSlides(false),
    ...advancedServiceWorkersSlides(false),
    ...installableSlides(false),
    ...engagingSlides(false),
    ...integratedSlides(false),
    ...performancesSlides(false),
    ...librariresSlides(false),
    ...conclusionSlides(false),
    ...bonusSlides(false)
  ].map(slidePath => {
    return { path: slidePath };
  });
}

export function usedSlides() {
  //return oneDayFormation();
  return fullFormation();
}
