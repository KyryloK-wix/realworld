import React from 'react';
import {ScrollView} from 'react-native';
import ArticleView from "@/components/ArticleView";
import {HardCodedArticles} from "@/components/ArticlesList";
import {useLocalSearchParams} from 'expo-router';


const ArticleViewPage = () => {
    const {slug} = useLocalSearchParams();
    console.log(`slug : ${slug}`)

    let articleProps = HardCodedArticles.find((element) => element.id == slug);
    return (
        <ScrollView>
            <ArticleView
                {...articleProps}
            />
        </ScrollView>
    );
}

export default ArticleViewPage