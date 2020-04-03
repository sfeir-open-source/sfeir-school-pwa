import { html, render } from '../../web_modules/lit-html.js';

/**
 * Render the html
 */
export function renderSlides(element, slides) {
  return render(
    html`
      ${slides.map(
        slide => html`
          <section
            data-markdown="./markdown/${slide.path}"
            data-separator="##==##"
            data-separator-vertical="##--##"
            data-separator-notes="^Notes:"
          ></section>
        `
      )}
    `,
    element
  );
}
