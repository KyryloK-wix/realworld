import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from 'react';
import {useRouter} from "expo-router";

const LogInSuggestion = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.linksContainer}>
                <TouchableOpacity onPress={() => router.push('/sign_up')}>
                    <Text style={styles.linkText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>or</Text>
                <TouchableOpacity onPress={() => router.push('/log_in')}>
                    <Text style={styles.linkText}>Log In</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.bodyText}>to add comments to this article</Text>
        </View>
    );
};

export default LogInSuggestion

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        color: 'blue',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    orText: {
        marginHorizontal: 5,
        color: '#333',
        fontSize: 16,
    },
    bodyText: {
        color: '#333',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
})
