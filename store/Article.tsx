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
    createdAt: string;  // Use `Date` if you want to convert it to Date object later
    updatedAt: string;  // Same as above
    favorited: boolean;
    favoritesCount: number;
    author: Author;
}