const mockPeoples = [
  {
    email: 'hogandickerson@sfeir.com',
    lastname: 'Powers',
    firstname: 'Black',
    gender: 'male',
    photo: 'img/randomuser/86.jpg',
    id: 9927,
    twitter: 'labore',
    slack: 'reprehenderit',
    github: 'aliquip',
    linkedin: 'qui',
    url: 'ex',
    contactInfoPro: {
      mail: 'blackpowers@sfeir.com',
      fixedPhone: '+33182449424',
      mobilePhone: '+33684850125',
      street: '220 Ide Court',
      postalCode: '20636',
      city: 'Winchester'
    },
    functionName: 'Mcpherson',
    functionDescription: 'Wendi',
    entity: 'Sfeir-Paris',
    currentClient: 'Adeo',
    workcity: 'Luxembourg',
    workCoords: {
      lat: 49.8154033,
      long: 5.8524553
    },
    workAdress: 'rue...',
    manager: 'Didier',
    department: 'Compta',
    skills: ['Java', 'AngularJS', 'React', 'git', 'ES6', 'JavaScript'],
    entryDate: '21/10/2014',
    birthDate: '11/12/2001',
    socialNumber: '4785882151',
    contactInfoPerso: {
      mail: 'wendipowers@sfeir.com',
      fixedPhone: '+33197859629',
      mobilePhone: '+33682956737',
      street: '789 Nolans Lane',
      postalCode: '36734',
      city: 'Loretto'
    },
    emergencyContact: '',
    emergencyPhoneNumber: '',
    driverLicence: '',
    tshirtSize: 'XL',
    numberOfChild: 4,
    firstNameChild1: 'Warren',
    birthDateChild1: '13/06/2007',
    firstNameChild2: 'Gutierrez',
    birthDateChild2: '01/01/2008',
    firstNameChild3: 'Johnston',
    birthDateChild3: '29/08/2011',
    firstNameChild4: 'Bernard',
    birthDateChild4: '',
    firstNameChild5: 'Luann',
    birthDateChild5: ''
  },
  {
    email: 'luannpowers@sfeir.com',
    lastname: 'Shaffer',
    firstname: 'Vargas',
    gender: 'male',
    photo: 'img/randomuser/57.jpg',
    id: 4013,
    twitter: 'irure',
    slack: 'pariatur',
    github: 'aute',
    linkedin: 'enim',
    url: 'do',
    contactInfoPro: {
      mail: 'vargasshaffer@sfeir.com',
      fixedPhone: '+33197542822',
      mobilePhone: '+33688258827',
      street: '108 Covert Street',
      postalCode: '66205',
      city: 'Saranap'
    },
    functionName: 'Greta',
    functionDescription: 'Teresa',
    entity: 'Sfeir-Nantes',
    currentClient: 'Adeo',
    workcity: 'Nantes',
    workCoords: {
      lat: 47.2383171,
      long: -1.6302674
    },
    workAdress: 'Place...',
    manager: 'Bruno',
    department: 'Recrutement',
    skills: ['ad', 'dolore', 'ullamco', 'sunt', 'exercitation', 'Lorem', 'sint'],
    entryDate: '27/03/2005',
    birthDate: '17/10/2008',
    socialNumber: '16499299613',
    contactInfoPerso: {
      mail: 'teresashaffer@sfeir.com',
      fixedPhone: '+33180943636',
      mobilePhone: '+33684757129',
      street: '949 Montgomery Street',
      postalCode: '51008',
      city: 'Tampico'
    },
    emergencyContact: '',
    emergencyPhoneNumber: '',
    driverLicence: '',
    tshirtSize: 'XL',
    numberOfChild: 2,
    firstNameChild1: 'Diaz',
    birthDateChild1: '20/03/2000',
    firstNameChild2: 'Burch',
    birthDateChild2: '17/04/2006',
    firstNameChild3: 'Robin',
    birthDateChild3: '06/03/2010',
    firstNameChild4: 'Stephanie',
    birthDateChild4: '',
    firstNameChild5: 'Sofia',
    birthDateChild5: ''
  }
];

export class PeoplesService {
  constructor() {
    const SERVER = 'http://localhost:3000';
    this.API_URL = `${SERVER}/api/people`;
    this.API_AUTH = `${SERVER}/auth`;
    this.peoples = null;
    this.peopleMap = new Map();
    this.hasRequestPending = false;
    this.networkPromise = this.initialize();
  }

  async initialize() {
    this.hasRequestPending = true;
    try {
      const data = mockPeoples;
      this.hasRequestPending = false;
      if (this.peoples) {
        //Replace this.peoples
        Array.prototype.splice.apply(this.peoples, [0, this.peoples.length].concat(data));
      } else {
        this.peoples = data;
      }
    } catch (e) {
      console.error(e);
      this.peoples = [];
    }
  }

  onResult() {
    this.peoples.forEach(people => {
      people.name = people.firstname + ' ' + people.lastname;
      this.peopleMap.set(people.email, people);
    });
    return this.peoples;
  }

  async getPeoples() {
    await this.networkPromise;
    return this.onResult();
  }

  getPeopleById(id) {
    return this.peopleMap.get(id);
  }

  async updatePeope(people) {
    return await Promise.resolve(mockPeoples);
  }

  getCollab(email) {
    var response = { isManager: false, collab: [] };
    angular.forEach(
      this.peopleMap,
      function(value, key) {
        if (value.manager === email) {
          response.isManager = true;
          response.collab.push(key);
        }
      },
      response
    );
    return response;
  }

  /**
   * *******************
   * AUTHENTICATION API
   * *******************
   */

  /**
   * Register a user
   * @param {*} email
   * @param {*} username
   * @param {*} password
   * @returns
   */
  register(email, username, password) {
    return Promise.resolve({
      json: () => {
        return {
          email,
          username,
          password,
          federated: false
        };
      }
    });
  }

  /**
   * Signin a user
   * @param {*} username
   * @param {*} password
   * @returns
   */
  signin(username, password) {
    return Promise.resolve({
      json: () => {
        return { email: 'fakeemail@mail.com', username, password, federated: false };
      }
    });
  }

  googleSignin(token) {
    return Promise.resolve({
      json: () => {
        return { email: 'fakeemail@mail.com', username: 'fakeuser', password: token, federated: true };
      }
    });
  }

  googleSignup(token) {
    return Promise.resolve({
      json: () => {
        return { email: 'fakeemail@mail.com', username: 'fakeuser', password: token, federated: true };
      }
    });
  }
}
