import {LitElement, html} from 'lit-element';
import {installRouter} from 'pwa-helpers/router';

export class PeopleApp extends LitElement{
    constructor(){
        super();
        this.page = 'home';
        installRouter((location)=> {
            console.log(location);
            if (location.pathname === '/people'){
                this.page = 'people';
            }else {
                this.page = 'home';
            }
            this.render();
            console.log(this.page)});
    }

    render(){
        return html`
            ${this.page === 'home' ?
                html`<home-component></home-component>`
            :
                html`<people-list></people-list>`
            }
        `
    }
}

customElements.define('people-app', PeopleApp);