import {makeAutoObservable} from 'mobx';

const backendHost = 'https://localhost:3000'

// Define the response type
interface ArticlesResponse {
    articles: Article[];
    articlesCount: number;
}


class ArticlesStore {
    articles: Article[] = [];
    articlesCount = 0;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Action to fetch posts from an API
    fetchPosts = async () => {
        this.loading = true;
        try {
            const response = await fetch(`${backendHost}/articles`);
            const data: ArticlesResponse = await response.json();
            this.articles = data.articles;
            this.articlesCount = data.articlesCount
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            this.loading = false;
        }
    };
}

const postStore = new ArticlesStore();

export default postStore;
