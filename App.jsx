import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import CustomSplashScreen from './src/screens/Splash';
import Routes from './src/navigation/Routes';
import {Text} from 'react-native';
import auth from '@react-native-firebase/auth';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      setUser(authUser);
    });
    return unsubscribe;
  }, []);

  // Function to handle hiding the splash screen
  const hideSplash = () => {
    setShowSplash(false);
  };

  console.log('user in App======', user);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <>
          {showSplash ? (
            <CustomSplashScreen hideSplash={hideSplash} />
          ) : (
            <>
              <Routes user={user} />
            </>
          )}
        </>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
