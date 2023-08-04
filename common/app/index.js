import 'babel-polyfill';

import { setupErrorListener } from '../utils/setupErrorListener';
import './components/HomeComponent';
import './components/LoginComponent';
import './components/PeopleCardComponent';
import './components/PeopleListComponent';
import './components/PeopleApp';

import 'normalize.css';
import '../../assets/css/app.css';

setupErrorListener();
