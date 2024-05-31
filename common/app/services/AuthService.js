export class AuthService {
  constructor() {
    this.user = undefined;
  }

  isSignedIn() {
    return this.user !== undefined;
  }

  getSingedInUser() {
    return Promise.resolve(this.user);
  }

  setSignedInUser(user) {
    this.user = user;
  }
}
