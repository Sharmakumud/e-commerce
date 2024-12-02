import { useState } from 'react';
import {
  EmailAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from 'db/config';
import { db } from 'db/config';
import { useAuthContext } from './useAuthContext';

export const useAuth = () => {
  const { dispatch: dispatchAuthAction } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValue, setDefaultValue] = useState(false);

  const signUp = async ({ name, lastName, email, password }) => {
    setError(null);
    setIsLoading(true);
    setDefaultValue({ name, lastName, email });

    try {
      const credential = EmailAuthProvider.credential(email, password);
      const userCredential = await linkWithCredential(auth.currentUser  , credential);
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      const userData = {
        name,
        lastName,
        email,
        phoneNumber: null,
        addresses: [],
        isVerified: false, // Initially set to false until verified
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      dispatchAuthAction({ type: 'LOGIN', payload: { user, ...userData } });
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const googleSignIn = async () => { // Renamed from googleSignUp to googleSignIn
    setError(null);
    setIsLoading(true);

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        lastName: '', // You can modify this based on your requirements
        email: user.email,
        phoneNumber: null,
        addresses: [],
        isVerified: true, // Google accounts are generally verified
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      dispatchAuthAction({ type: 'LOGIN', payload: { user, ...userData } });
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await signOut(auth);
      dispatchAuthAction({ type: 'LOGOUT' });
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { signUp, googleSignIn, logout, isLoading, error, defaultValue }; // Ensure googleSignIn is returned
};