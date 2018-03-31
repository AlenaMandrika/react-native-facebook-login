import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FBSDK from 'react-native-fbsdk'
import axios from 'axios'
const {
  LoginManager,
  AccessToken
} = FBSDK;

export default class App extends React.Component {
  loginToFacebook() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log('Login success with permissions: '
            +result.grantedPermissions.toString());
        }
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            console.log(data.accessToken.toString())
            axios.post(`http://192.168.1.100:3005/api/v1/user/facebook/token?access_token=${data.accessToken}`)
              .then(user => {
                console.log('New user', user)
              })
              .catch(console.error)
          }
        )
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <TouchableOpacity onPress={this.loginToFacebook.bind(this)}>
          <Text style={styles.facebookBtn}>Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookBtn: {
    backgroundColor: 'blue',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 10,
    borderRadius: 5
  }
});
