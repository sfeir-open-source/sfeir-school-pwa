export class WebAuthService {
  constructor(SERVER_URL) {
    this.API_WEBAUTH = `${SERVER_URL}/webauth`;
  }

  /***
   * *******************
   * WEBAUTHN API
   * *******************
   */

  getChallenge(username) {
    return fetch(`${this.API_WEBAUTH}/challenge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    }).then(response => response.json());
  }

  registerResponse(credential) {
    return fetch(`${this.API_WEBAUTH}/registerResponse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credential)
    }).then(response => response.json());
  }
}
