import {makeAutoObservable} from 'mobx';

const backendHost = 'http://localhost:3000'

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

    fetchLatestArticles = async () => {
        this.loading = true;
        try {
            const response = await fetch(`${backendHost}/api/articles?limit=20&offset=0`, {
                method: 'GET',
                headers: {'accept': 'application/json',}
            });
            // console.log(JSON.stringify(response));
            // console.log(JSON.stringify(response.json()));
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

const articlesStore = new ArticlesStore();

export default articlesStore;
