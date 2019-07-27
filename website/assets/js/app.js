/*jshint esversion: 6 */

import initMap from './modules/map';
window.initMap = initMap;
import Carousels from './modules/carousels';
import Navigation from './modules/navigation';
import './modules/animsetup';
import Projects from './modules/projects';
import OpeningHours from './modules/openinghours';

var carousels = new Carousels();
var navigation = new Navigation;
var projects = new Projects();
var oh = new OpeningHours();
