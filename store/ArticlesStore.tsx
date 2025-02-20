import {makeAutoObservable, runInAction} from 'mobx';
import usersStore from "@/store/UsersStore";
import {backendHost} from "@/store/Host";

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
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    fetchData = (url: string, method: string = 'GET', body: any = null, headers: any = {}) => {
        runInAction(() => {
            this.loading = true;
        });

        let headersToUse = {
            'Accept': 'application/json',
            ...headers,
        };

        if (usersStore.loggedInUser?.token) {
            headersToUse['Authorization'] = `Bearer ${usersStore.loggedInUser.token}`;
        }

        const options: RequestInit = {
            method,
            headers: headersToUse,
            body: body ? JSON.stringify(body) : null,
        };

        console.log(`Url: ${url}. Options: ${JSON.stringify(options, null, 2)}`);

        return fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                runInAction(() => {
                    this.loading = false;
                });
            });
    };


    fetchLatestArticles = async (tags: string[] = [], author?: string) => {
        const data: ArticlesResponse = await this.fetchData(
            `${backendHost}/api/articles?limit=20&offset=0${tags.length == 0 ? '' : `&tag=${tags[0]}`}${author ? `&author=${author}` : ''}`
        );
        if (data) {
            console.log(JSON.stringify(data.articles))
            runInAction(() => {
                this.articles = data.articles
            })
        }
    };

    fetchFavouriteArticles = async (tags: string[] = []) => {
        const data: ArticlesResponse = await this.fetchData(
            `${backendHost}/api/articles/feed?limit=20&offset=0${tags.length == 0 ? '' : `&tag=${tags[0]}`}`
        );
        if (data) {
            // action(() => {
            this.articlesFeed = data.articles;
            // })
        }
    };

    updateFavouredArticle = (article: Article) => {
        let articleToUpdate = this.articles.find(a => a.slug === article.slug)
        if (article)
            articleToUpdate.favorited = article.favorited
    }


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
