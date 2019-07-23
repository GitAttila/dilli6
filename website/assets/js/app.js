/*jshint esversion: 6 */
import './modules/animatecss';
import initMap from './modules/map';
window.initMap = initMap;
import Carousels from './modules/carousels';
import MobileNavigation from './modules/mobilenav';
import './modules/smsetup';
import Projects from './modules/projects';

var carousels = new Carousels();
var mobilenavigation = new MobileNavigation;
var projects = new Projects();
