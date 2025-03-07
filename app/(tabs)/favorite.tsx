import {ScrollView, StyleSheet} from 'react-native';
import React from "react";
import {Text, View} from 'react-native-ui-lib';
import {SafeAreaProvider} from "react-native-safe-area-context";
import Header from "@/components/Header";


export default function FavoriteScreen() {
    return (
        <SafeAreaProvider>
            <Header/>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text>Favorite</Text>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    }
});
