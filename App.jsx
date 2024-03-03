import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import CustomSplashScreen from './src/screens/Splash';
import Routes from './src/navigation/Routes';
import {Text} from 'react-native';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';
  const [showSplash, setShowSplash] = useState(true);

  // Function to handle hiding the splash screen
  const hideSplash = () => {
    setShowSplash(false);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <>
          {showSplash ? (
            <CustomSplashScreen hideSplash={hideSplash} />
          ) : (
            <>
              <Routes />
            </>
          )}
        </>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
