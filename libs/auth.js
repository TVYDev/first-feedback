import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUser } from './db';
import firebase from './firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);

  const signInWithGithub = async () => {
    const { user } = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());

    const formattedUser = formatUser(user);
    setUser(formattedUser);
    createUser(formattedUser.uid, formattedUser);
  };

  const signOut = async () => {
    await firebase.auth().signOut();

    setUser(false);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(formatUser(user) ?? false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGithub,
    signOut,
  };
}

function formatUser(user) {
  if (!user) return user;
  // console.log(user.providerData[0].providerId);
  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
    providerId: user.providerData[0].providerId,
  };
}
