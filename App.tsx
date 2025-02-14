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
const ACS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU3Qjg2NEUwQjM0QUQ0RDQyRTM3OTRBRTAyNTAwRDVBNTE5MjA1RjUiLCJ4NXQiOiJWN2hrNExOSzFOUXVONVN1QWxBTldsR1NCZlUiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOjAzYTJjODE3LTg1MmQtNGFhMC04NDA1LTM4ZjVkODdmY2NhYV8wMDAwMDAyNC01YWY4LTBkMmEtYjViYi1hNDNhMGQwMDIzOGYiLCJzY3AiOjE3OTIsImNzaSI6IjE3Mzg0MzQ1MTEiLCJleHAiOjE3Mzg1MjA5MTEsInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6InZvaXAiLCJyZXNvdXJjZUlkIjoiMDNhMmM4MTctODUyZC00YWEwLTg0MDUtMzhmNWQ4N2ZjY2FhIiwicmVzb3VyY2VMb2NhdGlvbiI6InVuaXRlZHN0YXRlcyIsImlhdCI6MTczODQzNDUxMX0.bUZQ209HU5R_5IfdlYZoFHN-FHygcFMpqmnl-Ca1kWZIcdvSI6Zw43eV0guz-ulcwwCLA_X1g_QXc8BY1l441Y0bJPOFQSyhjAb3m6FCuBwrFUJYaMe-PuS1jghellVwA-rm1Lzap3hH3yJIR7uwElv3QTrEh2uHvES89aj3Zfxf8dehqcENYAh_r_7KLgur9vDc_5zlGw1G_U-k-eSVh7UA10gV9cN_stdJiXXtEVFka_a6JvUwQXOTGxvKJqYjWRimHKJxFRe4lWPXqFFHb5Q8E0RINYfqY2K22sSX_cuBnZEwhwk-BvBXecklmpcrQYGRjUr8aZsJ1KE7anKHkQ';
const ROOM_ID = '99454394513162041';
const DISPLAY_NAME = 'Abhishek Mandingi';
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