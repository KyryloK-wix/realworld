import React from "react";
import {View} from 'react-native-ui-lib';
import {SafeAreaProvider} from "react-native-safe-area-context";
import UserProfile from "@/components/UserProfile";
import LogInSuggestion from "@/components/LogInSuggestion";
import usersStore from "@/store/UsersStore";
import Header from "@/components/Header";


export default function ProfileScreen() {
    return (
        <SafeAreaProvider>
            <Header/>
            <View style={{flex: 1, alignItems: `stretch`}}>
                {
                    usersStore.loggedInUser ? <UserProfile user={usersStore.loggedInUser}/> : <LogInSuggestion/>
                }
            </View>
        </SafeAreaProvider>
    );
}
