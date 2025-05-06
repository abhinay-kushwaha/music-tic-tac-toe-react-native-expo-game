import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../Splash Screen/SplashScreen';
import MainCompo from '../pages/MainCompo';


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="MainCompo" component={MainCompo} />
        </Stack.Navigator>
    );
};

export default Navigation;
