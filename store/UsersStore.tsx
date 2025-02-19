import {makeAutoObservable} from 'mobx';
import {backendHost} from "@/store/Host";

interface User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
}


interface UserResponse {
    user: User
}


class UsersStore {
    users: User[] = [];
    loggedInUser: User = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    logIn = async (email: string, password: string) => {
        try {
            const response = await fetch(`${backendHost}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        email,
                        password,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error('Log In failed');
            }
            const data: UserResponse = await response.json();
            this.loggedInUser = data.user
            return data.user
        } catch (error) {
            console.error('Error signing up:', error);
        }
    }


    registerUser = async (username: string, email: string, password: string) => {
        try {
            const response = await fetch(`${backendHost}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username,
                        email,
                        password,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error('Sign Up failed');
            }
            const data: UserResponse = await response.json();
            return data.user
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };
}

const usersStore = new UsersStore();

export default usersStore;
