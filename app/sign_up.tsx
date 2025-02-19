import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import usersStore from "@/store/UsersStore";
import {useRouter} from "expo-router";

const SignUpForm = () => {
    // State for form inputs
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    // Handle Sign Up Button Press
    const handleSignUp = () => {
        usersStore.registerUser(username, email, password).then((user) => {
                router.push('/')
            }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Sign Up</Text>
            <TextInput
                style={styles.inputField}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
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

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Log In Link */}
            <Text style={styles.linkText}>
                or
                <TouchableOpacity onPress={() => {
                    router.push('/log_in')
                }}>
                    <Text style={{textDecorationLine: 'underline'}}>Log In</Text>
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

export default SignUpForm