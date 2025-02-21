import {observer} from "mobx-react";
import articlesStore from "@/store/ArticlesStore";
import React, {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {RefreshControl, ScrollView, TouchableOpacity, Text} from "react-native";
import ArticlePreview from "@/components/ArticlePreview";

export const ArticlesFlatList = observer(({tags, favouritesOnly = false, author}) => {

    function articlesFromStore() {
        if (author) {
            return articlesStore.articlesForUser;
        } else {
            return favouritesOnly ? articlesStore.articlesFeed : articlesStore.articles;
        }
    }

    const [articles, setArticles] = useState(articlesFromStore());

    console.log(`articles in ArticlesFlatList: ${JSON.stringify(articles)}`)

    function loadArticles() {
        console.log(`Selected tags: ${JSON.stringify(tags)}`);
        (favouritesOnly ? articlesStore.fetchFavouriteArticles(tags) : articlesStore.fetchLatestArticles(tags, author)).then(() => {
                setArticles(articlesFromStore())
            }
        );
    }


    useEffect(() => {
        loadArticles();
    }, [tags, favouritesOnly]);

    const router = useRouter();

    return (
        <ScrollView style={{flex: 1, paddingTop: 20}}
                    refreshControl={
                        <RefreshControl
                            refreshing={articlesStore.loading}  // Whether it's refreshing or not
                            onRefresh={() => {
                                loadArticles();
                            }}  // Function to call when refresh is triggered
                            tintColor="blue"  // Color of the refresh indicator
                            title="Pull to refresh..."  // Title of the refresh indicator
                        />
                    }>
            {
                articles.length == 0 ? <Text>You dont have articles yet.</Text> :
                    articles.map((article, index) => (
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