import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import articlesStore from "@/store/ArticlesStore";
import usersStore from "@/store/UsersStore";

const ArticlePreview = ({slug, author, date, title, content, authorImage, favourite}) => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    let onLike = () => {
        if (usersStore.loggedInUser) {
            favourite ? articlesStore.unfavouriteArticle(slug) : articlesStore.favouriteArticle(slug)
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Image source={{uri: authorImage}} style={styles.authorImage}/>
                <View style={styles.textContainer}>
                    <Text style={styles.authorName}>{author}</Text>
                    <Text style={styles.articleDate}>{formattedDate}</Text>
                </View>
                {usersStore.loggedInUser ?
                    <TouchableOpacity onPress={onLike} style={styles.likeButton}>
                        <FontAwesome name={favourite ? 'heart' : 'heart-o'} size={20} color="red"/>
                    </TouchableOpacity> : <View/>
                }
            </View>

            {/* Article Title */
            }
            <Text style={styles.articleTitle}>{title}</Text>

            {/* Article Preview */
            }
            <Text style={styles.articleContent}>
                {content.length > 200 ? content.substring(0, 200) + '...' : content}
            </Text>
        </View>
    )
        ;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: 'white',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    authorImage: {
        width: 70,
        height: 70,
        borderRadius: 35, // Makes it a circle
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    authorName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    articleDate: {
        fontSize: 14,
        color: 'gray',
    },
    likeButton: {
        padding: 10,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    articleContent: {
        fontSize: 14,
        color: '#555',
    },
});

export default ArticlePreview;
