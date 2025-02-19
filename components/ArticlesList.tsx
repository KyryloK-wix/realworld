import {ScrollView, TouchableOpacity} from "react-native";
import React, {useEffect} from "react";
import ArticlePreview from "@/components/ArticlePreview";
import {useRouter} from 'expo-router';
import {observer} from "mobx-react";
import articlesStore from "@/store/ArticlesStore";

export const HardCodedArticles = [
    {
        id: 1,
        author: "John Doe",
        date: "Feb 18, 2025",
        title: "React Native: The Future of Mobile Development",
        content: "React Native has transformed the way mobile apps are built. By allowing developers to write a single codebase for both iOS and Android, it has significantly reduced development time and costs...",
        authorImage: "https://randomuser.me/api/portraits/men/1.jpg",
        onLike: () => alert('Liked!')
    },
    {
        id: 2,
        author: "Jane Smith",
        date: "March 5, 2025",
        title: "Understanding React Hooks in Depth",
        content: "React Hooks have revolutionized the way we manage state and side effects in functional components. By replacing class components with a simpler API...",
        authorImage: "https://randomuser.me/api/portraits/women/2.jpg",
        onLike: () => alert('Jane’s article liked!')
    }
];


const ArticlesList = ({favouritesOnly = false}) => {

    useEffect(() => {
        // Fetch articles when the component mounts
        favouritesOnly ? articlesStore.fetchFavouriteArticles() : articlesStore.fetchLatestArticles();
    }, []);

    const router = useRouter();

    return (
        <ScrollView style={{flex: 1}}>
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
                            authorImage={"https://randomuser.me/api/portraits/men/1.jpg"}
                        />
                    </TouchableOpacity>
                ))}
        </ScrollView>
    )
}

export default observer(ArticlesList)