/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

AppRegistry.registerComponent(appName, () => App);
