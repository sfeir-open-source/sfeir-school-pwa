export const setupErrorListener = () => {
  const handleError = (message, stackTrace) => {
    if (!document.querySelector('#error-container')) {
      const errorContainer = document.createElement('div');
      errorContainer.id = 'error-container';
      Object.assign(errorContainer.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '18px 12px 30px',
        fontFamily: 'sans-serif',
        background: '#aa3333',
        color: 'white',
      });

      document.body.appendChild(errorContainer);
    }

    const errorContainer = document.querySelector('#error-container');
    errorContainer.innerHTML = `
            <div>
                <strong>Error:</strong> ${message}
            </div>

            <div style="margin-top: 18px">(Check the DevTools console (<code>F12</code>) for the stack trace.)</div>
        `;
  };

  window.addEventListener('error', event => {
    const error = event.error || {};
    return handleError(error.message);
  });

  window.addEventListener('unhandledrejection', event => {
    const error = event.reason || {};
    return handleError(error.message || error);
  });
};
