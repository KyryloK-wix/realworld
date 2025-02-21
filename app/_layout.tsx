import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import "@/global.css";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <GluestackUIProvider mode="light"><ThemeProvider value={DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown: false, title: 'Home'}}/>
                <Stack.Screen name="+not-found" options={{headerShown: false}}/>
                <Stack.Screen name="log_in" options={{title: 'Log In'}}/>
                <Stack.Screen name="sign_up" options={{title: 'Sign Up'}}/>
                <Stack.Screen name="create_article" options={{title: 'Create Article'}}/>
            </Stack>
        </ThemeProvider></GluestackUIProvider>
    );
}

export default RootLayout