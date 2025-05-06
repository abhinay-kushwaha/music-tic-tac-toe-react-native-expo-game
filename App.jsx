import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './components/navigation/Navigation'; // Path to Navigation.js

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
