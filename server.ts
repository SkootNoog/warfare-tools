require('dotenv').config()
import 'zone.js/dist/zone-node';
import './server/main';
import 'localstorage-polyfill';
global.localStorage = localStorage;
export * from './src/main.server';
