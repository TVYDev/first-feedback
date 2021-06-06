import React, {createContext, useContext, useEffect, useState} from 'react';
import firebase from './firebase';

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProviderAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
}

function useProviderAuth() {
    const [user, setUser] = useState(null);

    const signInWithGithub = async () => {
        const { user } = await firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider());

        setUser(user);
    }

    const signOut = async () => {
        await firebase
            .auth()
            .signOut();

        setUser(false);
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user ?? false)
        })

        return () => unsubscribe();
    }, []);

    return {
        user,
        signInWithGithub,
        signOut
    }
}