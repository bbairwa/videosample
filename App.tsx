import React, {useState, useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  PlatformColor,
  Appearance,
} from 'react-native';
import RNAzureCommunicationUICalling from './native/RNAzureCommunicationUICalling';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const ACS_TOKEN ='';
const ROOM_ID = '';
const DISPLAY_NAME = '';
const App = () => {
  function HomeScreen() {
    const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
    useEffect(() => {
      const startCallComposite = async () => {
        try {
          const localAvatarImageResource = resolveAssetSource(''); // Default avatar
          const remoteAvatarImageResource = resolveAssetSource(''); // Default avatar
          await RNAzureCommunicationUICalling.startCallComposite(
            // local options
            {
              displayName: DISPLAY_NAME,
              title: '',
              subtitle: '',
              disableLeaveCallConfirmation: false,
            },
            localAvatarImageResource,
            // remote options
            {
              token: ACS_TOKEN,
              meeting: ROOM_ID,
            },
            remoteAvatarImageResource,
            // localization options
            {locale: 'en', layout: false},
            {setupOrientation: 'PORTRAIT', callOrientation: 'PORTRAIT'},
          );
        } catch (e: any) {
          Alert.alert('Error', e.message, [{text: 'Dismiss'}]);
        }
      };
      startCallComposite();
    }, []);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F8F8F8'}}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text style={styles.title}>Initializing call...</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Join" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    padding: 10,
    marginTop: 10,
    fontSize: 17,
  },
});
export default App;