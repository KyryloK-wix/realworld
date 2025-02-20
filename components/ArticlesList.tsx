import {FlatList, Modal, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import ArticlePreview from "@/components/ArticlePreview";
import {useRouter} from 'expo-router';
import {observer} from "mobx-react";
import articlesStore from "@/store/ArticlesStore";
import {FontAwesome} from '@expo/vector-icons';

import {
    Checkbox,
    CheckboxIndicator,
    CheckboxLabel,
    CheckboxIcon,
} from "@/components/ui/checkbox"
import {CheckIcon} from "@/components/ui/icon"
import tagsStore from "@/store/TagsStore";


const ArticlesList = ({favouritesOnly = false}) => {
    useEffect(() => {
        // Fetch articles when the component mounts
        // loadArticles();
        tagsStore.fetchTags();
    }, []);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const tags = tagsStore.tags

    const toggleTagSelection = (tag: string) => {
        setSelectedTags(prevSelectedTags =>
            prevSelectedTags.includes(tag)
                ? prevSelectedTags.filter(selectedTag => selectedTag !== tag)
                : [...prevSelectedTags, tag]
        );
    };

    const removeTag = (tag: string) => {
        setSelectedTags(prevSelectedTags => prevSelectedTags.filter(selectedTag => selectedTag !== tag));
    };

    function renderModal() {
        return <Modal
            transparent
            animationType="slide"
            visible={isDropdownVisible}
            onRequestClose={() => setIsDropdownVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.dropdownContainer}>
                    <Text style={{justifyContent: 'center', textAlign: 'center'}}>Choose Tags</Text>
                    <FlatList
                        data={tags}
                        renderItem={({item}) => (
                            <View style={styles.checkboxItem}>
                                <Checkbox size="md" isInvalid={false} isDisabled={false} value={item}
                                          isChecked={selectedTags.includes(item)}
                                          onChange={() => toggleTagSelection(item)}>
                                    <CheckboxIndicator>
                                        <CheckboxIcon as={CheckIcon}/>
                                    </CheckboxIndicator>
                                    <CheckboxLabel>{item}</CheckboxLabel>
                                </Checkbox>
                                )
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setIsDropdownVisible(false)}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>;
    }

    return (
        <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
                <TouchableOpacity onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
                    <Text style={styles.filterButton}>Tags</Text>
                </TouchableOpacity>
            </View>
            {/* List of selected tags */}
            <View style={styles.selectedTagsContainer}>
                {selectedTags.map((tag, index) => (
                    <View key={index} style={styles.selectedTag}>
                        <Text style={styles.selectedTagText}>{tag}</Text>
                        <TouchableOpacity onPress={() => removeTag(tag)}>
                            <FontAwesome name="times" size={16} color="#808080"/>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            {isDropdownVisible && renderModal()}
            <ArticlesFlatList tags={selectedTags} favouritesOnly={favouritesOnly} articlesStore={articlesStore}/>
        </View>

    )
}


export const ArticlesFlatList = observer(({tags, favouritesOnly = false, articlesStore, author}) => {

    function loadArticles(tags: string[], favouritesOnly: boolean) {
        console.log(`Selected tags: ${JSON.stringify(tags)}`);
        favouritesOnly ? articlesStore.fetchFavouriteArticles(tags) : articlesStore.fetchLatestArticles(tags, author);
    }

    useEffect(() => {
        loadArticles(tags, favouritesOnly);
    }, [tags, favouritesOnly]);

    const router = useRouter();


    return (
        <ScrollView style={{flex: 1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={articlesStore.loading}  // Whether it's refreshing or not
                            onRefresh={() => {
                                loadArticles(tags, favouritesOnly);
                            }}  // Function to call when refresh is triggered
                            tintColor="blue"  // Color of the refresh indicator
                            title="Pull to refresh..."  // Title of the refresh indicator
                        />
                    }>
            {
                articlesStore.articles.map((article, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            router.push(`/blog/${article.slug}`);
                        }}>
                        <ArticlePreview
                            key={index}
                            slug={article.slug}
                            author={article.author.username}
                            date={article.updatedAt}
                            title={article.title}
                            content={article.description}
                            favourite={article.favorited}
                            authorImage={article.author.image}
                            tags={article.tagList}
                        />
                    </TouchableOpacity>
                ))}
        </ScrollView>);
})


const styles = StyleSheet.create({
    filterSection: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
        marginBottom: 15,
    },
    filterHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
    },
    filterButton: {
        fontSize: 16,
        color: 'blue',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dropdownContainer: {
        backgroundColor: 'white',
        width: 300,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    closeButton: {
        marginTop: 15,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    articlesList: {
        paddingHorizontal: 15,
    },
    articleText: {
        fontSize: 16,
        marginVertical: 5,
    },
    selectedTagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    selectedTag: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedTagText: {
        fontSize: 14,
        color: '#333',
    },
    removeTag: {
        marginLeft: 8,
        fontSize: 18,
    },
});

export default observer(ArticlesList)