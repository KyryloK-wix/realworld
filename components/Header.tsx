import {View} from "react-native-ui-lib";
import React from "react";
import {StyleSheet} from "react-native";

function Header() {
    // users.
    return (<View style={styles.header}>
    </View>)
}

const styles = StyleSheet.create({
    header: {
        height: 105,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Header