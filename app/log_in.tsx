import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import usersStore from "@/store/UsersStore";
import {useRouter} from "expo-router";

const LogInForm = () => {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    let loggedInUser = usersStore.loggedInUser


    const handleLogIn = () => {
        usersStore.logIn(email, password).then((user) => {
                router.push('/')
            }
        );
    };

    return (
        loggedInUser ?
            <View style={styles.container}>
                <Text style={{textDecorationLine: 'underline'}}>You are already loggedIn {loggedInUser.username}</Text>
            </View> :
            <View style={styles.container}>
                <Text style={styles.headerText}>Log In</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.inputField}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogIn}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <Text style={styles.linkText}>
                    or
                    <TouchableOpacity onPress={() => {
                        router.push('/sign_up')
                    }}>
                        <Text style={{textDecorationLine: 'underline'}}>Sign Up</Text>
                    </TouchableOpacity>
                </Text>
            </View>
    );
};

// Styles using StyleSheet.create()
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    inputField: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingLeft: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 16,
    },
    headerText: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 24,
        marginBottom: 20,
    },
});

export default LogInForm