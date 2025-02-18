import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';
import {IconSymbol} from "@/components/ui/IconSymbol";


export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="favorite"
                options={{
                    title: 'Favorite',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="heart.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="profile.fill" color={color}/>,
                }}
            />
        </Tabs>
    );
}
