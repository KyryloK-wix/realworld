import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import usersStore from "@/store/UsersStore";
import {useRouter} from "expo-router";

const Header = () => {
    // Access loggedInUser variable from the store
    const loggedInUser = usersStore.loggedInUser;
    const router = useRouter();

    // Handle login/logout actions
    const handleAuthAction = () => {
        if (loggedInUser) {
            // Log out logic here
            // usersStore.logOut();
            Alert.alert(
                'Log Out',
                'Are you sure you want to log out?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Log Out',
                        onPress: () => {
                            usersStore.logOut();
                            Alert.alert('Logged Out', 'You have successfully logged out.');
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            // Log in logic here
            router.push('/log_in')
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.authButton} onPress={handleAuthAction}>
                <MaterialIcons
                    name={loggedInUser ? 'exit-to-app' : 'login'}
                    size={24}
                    color="white"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#007AFF',
        height: 105,
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    authButton: {
        backgroundColor: 'transparent',
    },
});

export default Header;
