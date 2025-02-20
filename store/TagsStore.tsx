import {action, makeAutoObservable, runInAction} from 'mobx';
import {backendHost} from '@/store/Host';

interface TagsResponse {
    tags: string[];
}

class TagsStore {
    tags: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    // Fetch tags from the API
    fetchTags = async () => {
        try {
            const response = await fetch(`${backendHost}/api/tags`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch tags');
            }

            const data: TagsResponse = await response.json();
            runInAction(() => {
                this.tags = data.tags;
            })
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };
}

const tagsStore = new TagsStore();

export default tagsStore;
