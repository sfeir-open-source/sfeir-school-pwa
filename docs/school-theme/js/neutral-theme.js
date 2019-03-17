class SfeirTheme {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => setTimeout(this._pageload.bind(this), 500));
    this.path = '';
  }

  _pageload() {
    this.path = this._extractPath();

    // FavIcon
    this._manageFavIcon();

    // ManageBackground
    this._manageBackgrounds();

    // ManageShowContent
    this._manageShowTypeContent();

    // ManageSpecificsColumnsSlides
    this._manageSpecificsColumnsSlides();

    if (Reveal) {
      Reveal.sync();
    }
  }
  _extractPath() {
    const scripts = document.getElementsByTagName('script');

    for (let idx = 0; idx < scripts.length; idx++) {
      const script = scripts.item(idx);

      if (script.src && script.src.match(/neutral-theme\.js$/)) {
        const path = script.src;
        return path.substring(0, path.indexOf('js/neutral-theme'));
      }
    }
    return '';
  }

  _manageFavIcon() {
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = `${this.path}images/logo_sfeir_burger.png`;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  _manageBackgrounds() {
    const map = {
      'first-slide.first-red': `${this.path}images/background_red.png`,
      'first-slide.first-pink': `${this.path}images/background_pink.png`,
      'first-slide': `${this.path}images/background_blue.png`,
      'school-presentation': `${this.path}images/background_shcool.png`,
      'speaker-slide': `${this.path}images/background_white_3.png`,
      'sfeir-slide': `${this.path}images/background_white_3.png`,
      'sfeir-bg-blue': `${this.path}images/background_blue.png`,
      'sfeir-bg-pink': `${this.path}images/background_pink.png`,
      'sfeir-bg-red': `${this.path}images/background_red.png`,
      'sfeir-bg-white-1': `${this.path}images/background_white_3.png`,
      'sfeir-bg-white-2': `${this.path}images/background_white_3.png`,
      'sfeir-bg-white-3': `${this.path}images/background_white_3.png`,
      'sfeir-bg-white-4': `${this.path}images/background_white_4.png`,
      'sfeir-bg-white-5': `${this.path}images/background_white_3.png`,
      'sfeir-bg-white-6': `${this.path}images/background_white_6.png`,
      'sfeir-bg-white-7': `${this.path}images/background_white_7.png`,
      'sfeir-bg-white-8': `${this.path}images/background_white_3.png`
    };

    for (let key in map) {
      const queryElementList = document.querySelectorAll('.reveal .slides section:not([data-background]).' + key);

      for (let i = 0; i < queryElementList.length; i++) {
        const element = queryElementList[i];
        element.classList.add('sfeir-specific-slide');
        element.setAttribute('data-background', map[key]);
      }
    }

    // Add default background for slides
    const genericsSlides = [
      ...document.querySelectorAll(
        '.reveal .slides section:not([data-background]):not(.sfeir-specific-slide):not(.no-background):not(.with-code-dark)'
      )
    ];
    for (let genericSlide of genericsSlides) {
      genericSlide.classList.add('sfeir-basic-slide');
      genericSlide.setAttribute('data-background', `${this.path}images/background_white_3.png`);
    }
  }

  _manageShowTypeContent() {
    const showTypeContent = document.querySelector('.reveal .slides').getAttribute('data-type-show');
    if (showTypeContent) {
      const showTypeSlides = document.querySelectorAll('.reveal .slides section[data-type-show]');
      for (let i = 0; i < showTypeSlides.length; i++) {
        const tmpSlide = showTypeSlides[i];
        if (tmpSlide.getAttribute('data-type-show') != showTypeContent) {
          tmpSlide.parentNode.removeChild(tmpSlide);
        }
      }
    }
  }

  _manageSpecificsColumnsSlides() {
    const twoColSlides = [...document.querySelectorAll('.reveal .slides section.two-column-layout')];
    for (let twoColSection of twoColSlides) {
      const parentSection = twoColSection.parentElement;
      parentSection.classList.add('two-column-layout');
      // Need to overrides reveal inlinestyles
      parentSection.style.display = 'grid';
      if (parentSection.nodeName === 'SECTION') {
        const subSections = [...parentSection.querySelectorAll('section')];
        for (let subSection of subSections) {
          subSection.classList.remove('two-column-layout');
          subSection.style.display = 'block';
        }
      }
    }
    if (Reveal) {
      // Need to overrides reveal inlinestyles
      Reveal.addEventListener('slidechanged', event => {
        console.log(event);
        const currentSlide = event.currentSlide;
        const parentSlide = currentSlide.parentElement;
        if (parentSlide.nodeName === 'SECTION' && parentSlide.classList.contains('two-column-layout')) {
          const state = Reveal.getState();
          state.indexv = 2;
          Reveal.setState(state);
          parentSlide.style.display = 'grid';
        }
      });
    }
  }
}

new SfeirTheme();
