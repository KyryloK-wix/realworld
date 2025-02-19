import React from "react";
import {View} from 'react-native-ui-lib';
import {SafeAreaProvider} from "react-native-safe-area-context";
import TabViewHome from "@/components/TabViewHome";
import Header from "@/components/Header";


export default function HomeScreen() {
    return (
        <SafeAreaProvider>
            <Header/>
            <View style={{flex: 1}}>
                <TabViewHome/>
            </View>
        </SafeAreaProvider>
    );
}
