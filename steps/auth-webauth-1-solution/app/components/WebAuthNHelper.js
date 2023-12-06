import { base64decode, base64encode } from '../utils/base64.js';

export class WebAuthNHelper {
  constructor(webauthService) {
    this.webauthService = webauthService;
  }

  registration(username) {
    return this.webauthService
      .getChallenge(username)
      .then(publicKey => {
        publicKey.challenge = base64decode(publicKey.challenge);
        publicKey.user.id = base64decode(publicKey.user.id);
        return navigator.credentials.create({
          publicKey
        });
      })
      .then(cred => {
        console.log('navigator.credentials.create response', cred);
        const credential = { response: {} };
        credential.id = cred.id;
        credential.rawId = base64encode(cred.rawId);
        credential.response.clientDataJSON = base64encode(cred.response.clientDataJSON);
        credential.response.attestationObject = base64encode(cred.response.attestationObject);
        return this.webauthService.registerResponse(credential);
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  }
}
