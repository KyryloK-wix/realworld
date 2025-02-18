import {ScrollView, TouchableOpacity} from "react-native";
import React from "react";
import ArticlePreview from "@/components/ArticlePreview";
import {useRouter} from 'expo-router';

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

const ArticlesList = () => {
    const router = useRouter();

    return (
        <ScrollView>
            {HardCodedArticles.map((article, index) => (
                <TouchableOpacity
                    onPress={() => {
                        router.push(`/blog/${article.id}`);
                    }}>
                    <ArticlePreview
                        key={index}
                        author={article.author}
                        date={article.date}
                        title={article.title}
                        content={article.content}
                        authorImage={article.authorImage}
                        onLike={article.onLike}
                    />
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default ArticlesList