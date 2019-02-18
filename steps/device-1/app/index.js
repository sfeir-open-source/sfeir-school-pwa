import "babel-polyfill";
import { setupErrorListener } from "../../../common/utils/setupErrorListener";
import { appRouter } from "./app-router";

import 'normalize.css';
import "../../../assets/css/app.css";
import { activateLinks } from "../../../common/utils/activateLinks";

setupErrorListener();

appRouter.resolve();

activateLinks(document, appRouter);

