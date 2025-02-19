import {makeAutoObservable} from 'mobx';
import usersStore from "@/store/UsersStore";
import {backendHost} from "@/store/Host";


// export const backendHost = "https://node-express-conduit.appspot.com"

interface ArticlesResponse {
    articles: Article[];
    articlesCount: number;
}

interface ArticleByIdResponse {
    article: Article
}


class ArticlesStore {
    articles: Article[] = [];
    articlesFeed: Article[] = [];
    articlesCount = 0;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    fetchData = async <T>(url: string, method: string = 'GET', body: any = null, headers: any = {}): Promise<T | void> => {
        this.loading = true;
        try {
            let headersToUse = {
                'Accept': 'application/json',
                ...headers,
            }
            if (usersStore.loggedInUser?.token) {
                headersToUse['Authorization'] = `Bearer ${usersStore.loggedInUser.token}`;
            }
            console.log(headersToUse);
            const options: RequestInit = {
                method,
                headers: headersToUse,
                body: body ? JSON.stringify(body) : null,
            };

            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const data: T = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            this.loading = false;
        }
    };

    fetchLatestArticles = async () => {
        const data = await this.fetchData<ArticlesResponse>(`${backendHost}/api/articles?limit=20&offset=0`);
        if (data) {
            console.log(JSON.stringify(data.articles))
            this.articles = data.articles
            this.articlesCount = data.articlesCount;
        }
    };

    updateFavouredArticle = (article: Article) => {
        let articleToUpdate = this.articles.find(a => a.slug === article.slug)
        if (article)
            articleToUpdate.favorited = article.favorited
    }

    fetchFavouriteArticles = async () => {
        const data = await this.fetchData<ArticlesResponse>(`${backendHost}/api/articles/feed?limit=20&offset=0`);
        if (data) {
            this.articlesFeed = data.articles;
        }
    };

    favouriteArticle = async (slug: string) => {
        const data = await this.fetchData<ArticleByIdResponse>(`${backendHost}/api/articles/${slug}/favorite`, 'POST');
        if (data) {
            this.updateFavouredArticle(data.article)
        }
    };

    unfavouriteArticle = async (slug: string) => {
        const data = await this.fetchData<ArticleByIdResponse>(`${backendHost}/api/articles/${slug}/favorite`, 'DELETE');
        if (data) {
            this.updateFavouredArticle(data.article)
        }
    };

    fetchArticle = async (slug: string) => {
        if (this.articles.find(a => a.slug === slug)) {
            console.log("Article already exists")
        } else {
            const data = await this.fetchData<ArticleByIdResponse>(`${backendHost}/api/articles/${slug}`);
            if (data) {
                this.articles.push(data.article);
            }
        }
    };
}

const articlesStore = new ArticlesStore();

export default articlesStore;
