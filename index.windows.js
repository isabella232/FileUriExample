/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const RNFS = require('react-native-fs');

class FileUriExample extends Component {
    async componentWillMount() {
        try {
            let fromPath = `${RNFS.MainBundlePath}\\Images\\flowers.jpg`;
            let toPath = `${RNFS.DocumentDirectoryPath}\\appFlowers.jpg`;
            let exists = await RNFS.exists(toPath);
            if (!exists) {
                await RNFS.copyFile(fromPath, toPath);
            }
        } catch (error) {
            console.error(error);
        }
    }

  render() {
      let filePath = `file:///${RNFS.DocumentDirectoryPath}/appFlowers.jpg`;
      return (
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Image from Javascript directory
            </Text>
            <Image source={require('./flowers.jpg')} style={{width: 40, height: 40}} />
            <Text style={styles.welcome}>
              Image from App directory
            </Text>
            <Image source={{uri: filePath}} style={{width: 40, height: 40}} />
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FileUriExample', () => FileUriExample);