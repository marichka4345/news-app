const errorTemplate = require('../views/error/error.handlebars');

class ErrorsService {
  constructor(){
    if (!ErrorsService.instance){
      ErrorsService.instance = this;
    }

    return ErrorsService.instance;
  }

  showError = message => {
    const errorWrapper = document.querySelector('.error-wrapper');

    if (!errorWrapper) {
      const div = document.createElement('div');
      div.className += 'error-wrapper';
      document.body.appendChild(div);
    }

    if (errorWrapper) {
      errorWrapper.insertAdjacentHTML('afterBegin', errorTemplate({message}));
    }

    setTimeout(() => {
      if (errorWrapper) {
        errorWrapper.innerHTML = '';
      }
    }, 3000);
  };
}

const errors = new ErrorsService();

export { errors };