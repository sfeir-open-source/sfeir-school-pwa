class SfeirTheme {
  constructor() {
    Reveal.addEventListener('ready', () => setTimeout(this._pageload.bind(this), 500));
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

    // ManageListFragements
    this._manageListFragment();

    // Manage Hack to speakers images
    this._manageSpeakersBorders();

    if (Reveal) {
      Reveal.sync();
    }
  }
  _extractPath() {
    const scripts = document.getElementsByTagName('script');

    for (let idx = 0; idx < scripts.length; idx++) {
      const script = scripts.item(idx);

      if (script.src && script.src.match(/sfeir-theme\.js$/)) {
        const path = script.src;
        return path.substring(0, path.indexOf('js/sfeir-theme'));
      }
    }
    return '';
  }

  _manageFavIcon() {
    const resolutions = ['16x16', '32x32', '96x96'];
    for (let resolution of resolutions) {
      const link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.sizes = resolution;
      link.href = `${this.path}images/favicon-${resolution}.png`;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = `${this.path}images/favicon.ico`;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  _manageBackgrounds() {
    const map = {
      'first-slide': `${this.path}images/bg-grey-axololt.png`,
      transition: `${this.path}images/bg-grey-axololt.png`,
      'school-presentation': `${this.path}images/bg-school.png`,
      'speaker-slide': `${this.path}images/bg-grey-axololt.png`,
      'sfeir-slide': `${this.path}images/bg-grey-axololt.png`,
      'bg-white': `${this.path}images/bg-grey-axololt.png`,
      'bg-pink': `${this.path}images/bg-grey-axololt.png`,
      'bg-blue': `${this.path}images/bg-grey-axololt.png`,
      'bg-green': `${this.path}images/bg-grey-axololt.png`,
      'sfeir-bg-axololt': `${this.path}images/bg-grey-axololt.png`,
      'transition-bg-grey-1': `${this.path}images/bg-grey-1.png`,
      'transition-bg-grey-2': `${this.path}images/bg-grey-2.png`,
      'transition-bg-grey-3': `${this.path}images/bg-grey-3.jpg`,
      'transition-bg-grey-4': `${this.path}images/bg-grey-4.jpg`,
      'transition-bg-grey-5': `${this.path}images/bg-grey-5.jpg`,
      'transition-bg-grey-6': `${this.path}images/bg-grey-6.jpg`,
      'transition-bg-grey-7': `${this.path}images/bg-grey-7.jpg`
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
        '.reveal .slides section:not([data-background]):not(.sfeir-specific-slide):not(.no-background):not(.with-code-dark):not([class*=transition])'
      )
    ];
    for (let genericSlide of genericsSlides) {
      genericSlide.classList.add('sfeir-basic-slide');
    }

    this._manageFirstSlide();
  }

  _manageFirstSlide() {
    const firstSlides = [...document.querySelectorAll('.reveal .slides section.first-slide')];
    for (let firstSlideSection of firstSlides) {
      const imgLogo = document.createElement('DIV');
      imgLogo.classList.add('sfeir-logo');
      imgLogo.style['background-image'] = `url(${this.path}images/logo_empty.png)`;

      const level = firstSlideSection.hasAttribute('sfeir-level') ? +firstSlideSection.getAttribute('sfeir-level') : 1;
      const techno = firstSlideSection.hasAttribute('sfeir-techno')
        ? firstSlideSection.getAttribute('sfeir-techno')
        : '';
      imgLogo.setAttribute('data-sfeir-level', level);
      imgLogo.setAttribute('data-sfeir-techno', techno);

      firstSlideSection.insertAdjacentElement('afterbegin', imgLogo);
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
        // Have to rewrite block due to override of reveal
        if (parentSlide.nodeName === 'SECTION' && parentSlide.classList.contains('two-column-layout')) {
          const state = Reveal.getState();
          state.indexv = 2;
          Reveal.setState(state);
          parentSlide.style.display = 'grid';

          // Have to rewrite block due to bug
          const subSections = [...parentSlide.querySelectorAll('section')];
          subSections[0].style.display = 'block';
        }
      });
    }
  }

  _manageListFragment() {
    const listItemWithFragments = [...document.querySelectorAll('.reveal .slides section .list-fragment')];
    for (let lisItemWithFragmentTag of listItemWithFragments) {
      let parentOfListItem = lisItemWithFragmentTag.parentElement; // Ul or OL
      if (parentOfListItem.nodeName === 'LI') {
        // Specific case when you have some markdown bold or italic
        parentOfListItem = parentOfListItem.parentElement;
      }
      if (parentOfListItem.nodeName === 'UL' || parentOfListItem.nodeName === 'OL') {
        const listItemsOfParent = [...parentOfListItem.querySelectorAll('li')];
        for (let listItem of listItemsOfParent) {
          listItem.classList.add('fragment');
        }
      }
    }
  }

  _manageSpeakersBorders() {
    const imgOfSpeakersToReplaces = [...document.querySelectorAll('.reveal .slides section img[alt*=speaker]')];
    for (let imgToReplace of imgOfSpeakersToReplaces) {
      let parentOfImg = imgToReplace.parentElement;
      const divWithBgElement = document.createElement('DIV');
      divWithBgElement.classList.add('speaker');
      divWithBgElement.style['background-image'] = `url(${imgToReplace.src})`;
      parentOfImg.appendChild(divWithBgElement);
      parentOfImg.removeChild(imgToReplace);
    }
  }
}

new SfeirTheme();
