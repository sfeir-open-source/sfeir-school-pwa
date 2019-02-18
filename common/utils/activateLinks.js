export const activateLinks = (element, appRouter) => {
  element.querySelectorAll('[data-link]').forEach(el => {
    const route = el.getAttribute('data-link');
    el.setAttribute('href', '');
    el.addEventListener('click', e => {
      e.preventDefault();
      appRouter.navigate(route);
    });
  })
}
