// Define the types for author and article
interface Author {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: Author;
}