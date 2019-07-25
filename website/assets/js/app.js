/*jshint esversion: 6 */

import initMap from './modules/map';
window.initMap = initMap;
import Carousels from './modules/carousels';
import MobileNavigation from './modules/mobilenav';
import './modules/smsetup';
import Projects from './modules/projects';
import OpeningHours from './modules/openinghours';

var carousels = new Carousels();
var mobilenavigation = new MobileNavigation;
var projects = new Projects();
var oh = new OpeningHours();
