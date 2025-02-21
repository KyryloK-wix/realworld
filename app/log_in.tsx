import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import usersStore from "@/store/UsersStore";
import {useRouter} from "expo-router";
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlLabel,
    FormControlLabelText
} from "@/components/ui/form-control";
import {Input, InputField} from "@/components/ui/input";
import {AlertCircleIcon} from "@/components/ui/icon";

import {Button, ButtonText} from "@/components/ui/button"
import {observer} from "mobx-react";

const LogInForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [apiError, setApiError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const router = useRouter();
    let loggedInUser = usersStore.loggedInUser;

    const handleLogIn = () => {
        setApiError(''); // Clear any previous errors
        setEmailError(''); // Clear email error
        setPasswordError(''); // Clear password error

        let valid = true;
        if (!email) {
            setEmailError('Email is required');
            valid = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        }

        if (valid) {
            // If all fields are valid, proceed with login
            usersStore.logIn(email, password).then(() => {
                router.push('/');
            }).catch((err) => {
                setApiError(err.message);
                console.log(`Error was set ${err.message}`)
            });
        }
    };

    return (
        loggedInUser ? (
            <View style={styles.container}>
                <Text style={{textDecorationLine: 'underline'}}>You are already logged
                    in, {loggedInUser.username}</Text>
            </View>
        ) : (
            <View style={styles.container}>
                <Text style={styles.headerText}>Log In</Text>
                <FormControl isInvalid={!!emailError} size="md" isRequired>
                    <FormControlLabel>
                        <FormControlLabelText>Email</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size="md">
                        <InputField
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Email"
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon}/>
                        <FormControlErrorText>{emailError}</FormControlErrorText>
                    </FormControlError>
                </FormControl>

                <FormControl isInvalid={!!passwordError} size="md" isRequired>
                    <FormControlLabel>
                        <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size="md">
                        <InputField
                            type="password"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon}/>
                        <FormControlErrorText>{passwordError}</FormControlErrorText>
                    </FormControlError>
                </FormControl>
                {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}
                <Button className="w-full self-center mt-4" onPress={handleLogIn}>
                    <ButtonText>Log In</ButtonText>
                </Button>
                <View style={styles.linkContainer}>
                    <Text style={{fontSize: 16,}}>or </Text>
                    <TouchableOpacity onPress={() => router.push('/sign_up')}>
                        <Text style={[styles.linkText, {textDecorationLine: 'underline'}]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    );
};

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
    linkContainer: {
        flexDirection: 'row', // Arrange items horizontally
        justifyContent: 'center', // Center them horizontally
        alignItems: 'center', // Align them vertically
        marginTop: 20, // Add spacing from the previous content
    },
    linkText: {
        color: 'blue',
        fontSize: 16,
    },
    headerText: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 24,
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default observer(LogInForm);
