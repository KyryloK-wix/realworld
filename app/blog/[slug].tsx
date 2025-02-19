import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import ArticleView from "@/components/ArticleView";
import {useLocalSearchParams} from 'expo-router';
import articlesStore from "@/store/ArticlesStore";
import {observer} from "mobx-react";


const ArticleViewPage = () => {
    const {slug} = useLocalSearchParams();
    console.log(`slug : ${slug}`)
    useEffect(() => {
        // Fetch articles when the component mounts
        articlesStore.fetchArticle(slug);
    }, []);


    let article = articlesStore.articles.find((element) => element.slug == slug);

    return (
        <ScrollView>
            <ArticleView
                author={article?.author.username}
                date={article?.updatedAt}
                title={article?.title}
                content={article?.body}
                authorImage={"https://randomuser.me/api/portraits/men/1.jpg"}
                onLike={() => alert('Liked!')}
            />
        </ScrollView>
    );
}

export default observer(ArticleViewPage)