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


const ArticlesList = observer(() => {
    useEffect(() => {
        // Fetch articles when the component mounts
        articlesStore.fetchLatestArticles();
    }, []);

    const router = useRouter();

    console.log(JSON.stringify(articlesStore.articles))

    return (
        <ScrollView>
            {
                articlesStore.articles.map((article, index) => (
                    <TouchableOpacity
                        onPress={() => {
                            router.push(`/blog/${article.slug}`);
                        }}>
                        <ArticlePreview
                            key={index}
                            author={article.author.username}
                            date={article.createdAt}
                            title={article.title}
                            content={article.description}
                            authorImage={"https://randomuser.me/api/portraits/men/1.jpg"}
                            onLike={() => alert('Liked!')}
                        />
                    </TouchableOpacity>
                ))}
        </ScrollView>
    )
})

export default ArticlesList