import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import articlesStore from "@/store/ArticlesStore";
import LogInSuggestion from "@/components/LogInSuggestion";

const ArticleView = ({title, author, date, authorImage, likes, content, onLike}) => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.articleTitle}>{title}</Text>

                <View style={styles.topRow}>
                    <Image source={{uri: authorImage}} style={styles.authorImage}/>
                    <View style={styles.textContainer}>
                        <Text style={styles.authorName}>{author.authorName}</Text>
                        <Text style={styles.articleDate}>{formattedDate}</Text>
                    </View>

                    <View style={styles.likeContainer}>
                        <Text style={styles.likeCount}>{likes}</Text>
                        <TouchableOpacity onPress={onLike} style={styles.likeButton}>
                            <FontAwesome name="heart-o" size={20} color="red"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Body Section */}
            <View style={styles.body}>
                <Text style={styles.articleContent}>{content}</Text>
            </View>
            <LogInSuggestion/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
    },
    header: {
        marginBottom: 15,
    },
    articleTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorImage: {
        width: 70,
        height: 70,
        borderRadius: 35, // Circular image
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
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeCount: {
        fontSize: 16,
        marginRight: 5,
    },
    likeButton: {
        padding: 10,
    },
    body: {
        marginTop: 10,
    },
    articleContent: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
});

export default ArticleView;
