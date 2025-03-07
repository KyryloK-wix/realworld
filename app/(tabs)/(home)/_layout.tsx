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
        SpaceMono: require('/assets/fonts/SpaceMono-Regular.ttf'),
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
                <Stack.Screen name="index" options={{headerShown: false, title: 'Articles'}}/>
                <Stack.Screen name="blog/[slug]" options={{title: 'Article'}}/>
            </Stack>
        </ThemeProvider></GluestackUIProvider>
    );
}

export default RootLayout