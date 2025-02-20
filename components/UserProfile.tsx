import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import articlesStore from "@/store/ArticlesStore";
import {ArticlesFlatList} from "@/components/ArticlesList";

const UserProfile = ({user}) => {
    return (
        <View style={styles.container}>

            {/* Section 1: Profile Image, Username, and Edit Button */}
            <View style={styles.profileSection}>
                {/* Edit Button placed outside the profile image */}
                <TouchableOpacity style={styles.editButton}>
                    <FontAwesome name="edit" size={24} color="#007BFF"/>
                </TouchableOpacity>

                <Image
                    source={{uri: user.image}}
                    style={styles.profileImage}
                />

                <Text style={styles.username}>{user.username}</Text>
            </View>

            {/* Section 2: Create Article Button */}
            <View style={styles.createArticleSection}>
                <TouchableOpacity style={styles.createArticleButton}>
                    <FontAwesome name="plus" size={16} color="#007BFF"/>
                    <Text style={styles.createArticleText}>Create Article</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <ArticlesFlatList favouritesOnly={false} articlesStore={articlesStore} author={user.username}/>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    profileSection: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 20,
    },
    editButton: {
        position: 'absolute',
        top: 0, // Moves the button above the profile image
        left: '50%', // Centers the button horizontally
        // transform: [{ translateX: 0 }], // Adjusts for the button size to keep it centered
        // backgroundColor: '#007BFF',
        borderRadius: 20,
        padding: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#007BFF',
        marginBottom: 10,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    createArticleSection: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    createArticleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#007BFF',
        borderRadius: 5,
    },
    createArticleText: {
        fontSize: 16,
        color: '#007BFF',
        marginLeft: 5,
    },
});

export default UserProfile;
