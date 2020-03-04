import { renderSlides } from './import-slides.js';
import { usedSlides } from './pwa-slides.js';

(() => {
  const importSlideElement = document.querySelector('.slides');
  renderSlides(importSlideElement, usedSlides());

  setTimeout(() =>
    Reveal.initialize(
      {
        controls: true,
        progress: true,
        history: true,
        center: false,
        width: 1920,
        height: 1080,

        theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
        transition: Reveal.getQueryHash().transition || 'none', // default/cube/page/concave/zoom/linear/fade/none

        keyboard: {
          32: function() {
            var video = document.querySelector('.present video');
            if (video.paused == true) {
              video.play();
            } else {
              video.pause();
            }
          }
        },

        slideNumber: 'c/t',
        showSlideNumber: 'speaker',

        // Optional libraries used to extend on reveal.js
        dependencies: [
          {
            src: './libs/revealjs/js/classList.js',
            condition: function() {
              return !document.body.classList;
            }
          },
          {
            src: './libs/revealjs/plugin/markdown/marked.js',
            condition: function() {
              return !!document.querySelector('[data-markdown]');
            }
          },
          {
            src: './libs/revealjs/plugin/markdown/markdown.js',
            condition: function() {
              return !!document.querySelector('[data-markdown]');
            }
          },
          {
            src: './libs/revealjs/plugin/highlight/highlight.js',
            async: true,
            callback: function() {
              hljs.initHighlightingOnLoad();
            }
          },
          {
            src: './libs/revealjs/plugin/zoom-js/zoom.js',
            async: true,
            condition: function() {
              return !!document.body.classList;
            }
          },
          {
            src: 'school-theme/js/reveal-notes.js',
            async: true,
            condition: function() {
              return !!document.body.classList;
            }
          }
          // { src: 'node_modules/reveal.js/plugin/search/search.js', async: true, condition: function() { return !!document.body.classList; } }
          // { src: 'node_modules/reveal.js/plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } }
        ]
      },
      1000
    )
  );
})();
