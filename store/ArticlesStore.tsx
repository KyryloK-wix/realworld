import {makeAutoObservable} from 'mobx';

// export const backendHost = 'http://localhost:3000'
export const backendHost = "https://node-express-conduit.appspot.com"

interface ArticlesResponse {
    articles: Article[];
    articlesCount: number;
}

interface ArticleByIdResponse {
    article: Article
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
            const data: ArticlesResponse = await response.json();
            this.articles = data.articles;
            this.articlesCount = data.articlesCount
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            this.loading = false;
        }
    };

    fetchArticle = async (slug: string) => {
        if (this.articles.find(a => a.slug === slug)) {
            console.log("Article already exists")
        } else {
            this.loading = true;
            try {
                const response = await fetch(`${backendHost}/api/articles/${slug}`, {
                    method: 'GET',
                    headers: {'accept': 'application/json',}
                });
                const data: ArticleByIdResponse = await response.json();
                this.articles.push(data.article);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                this.loading = false;
            }
        }
    };
}

const articlesStore = new ArticlesStore();

export default articlesStore;
