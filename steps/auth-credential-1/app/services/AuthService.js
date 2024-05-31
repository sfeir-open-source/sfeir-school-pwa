export class AuthService {
  constructor() {
    this.user = undefined;
  }

  isSignedIn() {
    return this.user !== undefined;
  }

  getSingedInUser() {
    return new Promise((resolve, reject) => {
      // TO DO
      resolve(this.user);
    });
  }

  setSignedInUser(user) {
    this.user = user;
    // TO DO
  }
}
