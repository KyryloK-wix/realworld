import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';
import CommentList from "@/components/CommentList";

const CommentsSection = () => {
    const [comment, setComment] = useState('');

    // Handle post comment
    const handlePostComment = () => {
        if (comment) {
            console.log('Comment posted:', comment);
            setComment('');
        }
    };

    return (
        <View style={styles.commentBox}>
            <CommentList/>
            <TextInput
                style={styles.textarea}
                placeholder="Leave your comment"
                value={comment}
                onChangeText={setComment}
                multiline
            />
            {/*</View>*/}

            <View style={{backgroundColor: 'rgba(0, 0, 255, 0.1)', padding: 0}}>
                <TouchableOpacity
                    style={styles.postButtonContainer}
                    onPress={handlePostComment}
                >
                    <View style={styles.postButton}>
                        <Text style={styles.buttonText}>Post</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // Outer container for the comment box
    commentBox: {
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, // For Android shadow
    },

    // Textarea style for the comment input field
    textarea: {
        flex: 1,
        height: 150,
        padding: 10,
        margin: 10,
        fontSize: 16,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
    },

    // Container for the post button (with background color for opacity effect)
    postButtonContainer: {
        alignSelf: 'flex-end',
        // backgroundColor: 'rgba(0, 0, 255, 0.1)', // Light blue background for opacity
        // paddingVertical: 10,
        // borderRadius: 8,
    },

    // Button style (transparent with blue border)
    postButton: {
        margin:5,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Button text style (blue text)
    buttonText: {
        color: 'blue',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CommentsSection;
