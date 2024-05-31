export class AuthService {
  constructor() {
    this.user = undefined;
  }

  isSignedIn() {
    return this.user !== undefined;
  }

  getSingedInUser() {
    return new Promise((resolve, reject) => {
      navigator.credentials
        .get({
          password: true,
          federated: {
            providers: ['https://accounts.google.com']
          },
          mediation: 'optional'
        })
        .then(cred => {
          console.log('Credential', cred);
          if (cred) {
            resolve({
              federated: cred.type === 'federated',
              username: cred.id,
              email: cred.name,
              password: cred.type === 'password' ? cred.password : undefined
            });
          } else {
            resolve(undefined);
          }
        });
    });
  }

  setSignedInUser(user) {
    this.user = user;
    let cred = undefined;
    if (user.federated) {
      cred = new FederatedCredential({
        id: user.username,
        provider: 'https://accounts.google.com',
        name: user.email
      });
    } else {
      cred = new PasswordCredential({
        id: user.username,
        password: user.password,
        name: user.email
      });
    }

    console.log('Credential to store', cred);
    navigator.credentials.store(cred).then(() => {
      console.log('Credential stored');
    });
  }
}
