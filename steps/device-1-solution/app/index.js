import 'babel-polyfill';
import { setupErrorListener } from '../../../common/utils/setupErrorListener';
import '../../../common/app/components/HomeComponent';
import '../../../common/app/components/PeopleCardComponent';
import './components/PeopleListComponent';
import '../../../common/app/components/PeopleApp';

import 'normalize.css';
import '../../../assets/css/app.css';

setupErrorListener();
