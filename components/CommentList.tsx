import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Hardcoded comment data
const comments = [
    {
        id: '1',
        authorImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        authorName: 'John Doe',
        date: 'Feb 18, 2025',
        comment: 'This is a great article. Thanks for sharing!',
    },
    {
        id: '2',
        authorImage: 'https://randomuser.me/api/portraits/women/2.jpg',
        authorName: 'Jane Smith',
        date: 'Feb 20, 2025',
        comment: 'I agree with the points made here. Well written!',
    },
    {
        id: '3',
        authorImage: 'https://randomuser.me/api/portraits/men/2.jpg',
        authorName: 'Alex Brown',
        date: 'Feb 22, 2025',
        comment: 'Very informative, looking forward to more posts like this!',
    },
];

const CommentList = () => {
    // Handle delete comment
    const handleDelete = (id: string) => {
        console.log(`Delete comment with ID: ${id}`);
    };

    // Render comment item
    const renderItem = ({ item }: any) => (
        <View style={styles.commentContainer}>
            {/* Section 1: Author's Image */}
            <View style={styles.section1}>
                <Image source={{ uri: item.authorImage }} style={styles.authorImage} />
            </View>

            {/* Section 2: Author's Info and Comment */}
            <View style={styles.section2}>
                <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>{item.authorName}</Text>
                    <Text style={styles.commentDate}>{item.date}</Text>
                </View>
                <Text style={styles.commentText}>{item.comment}</Text>
            </View>

            {/* Section 3: Delete Button */}
            <View style={styles.section3}>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <FontAwesome name="trash" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </View>

    );

    return (
        <FlatList
            data={comments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, // For Android shadow
        flexDirection: 'row', // Ensure all sections are aligned horizontally
    },

    section1: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    authorImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    section2: {
        flex: 1,
    },

    authorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },

    authorName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 5,
    },

    commentDate: {
        fontSize: 14,
        color: '#888',
    },

    commentText: {
        fontSize: 16,
        marginTop: 5,
    },

    section3: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 5,
    },

    deleteButton: {
        padding: 5,
    },
});

export default CommentList;
