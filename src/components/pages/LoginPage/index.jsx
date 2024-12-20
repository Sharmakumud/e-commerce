import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import { useToast } from 'hooks/useToast';

import { Loader } from 'components/common';

import styles from './index.module.scss';

const LoginPage = () => {
  const { state: routerState } = useLocation();

  const { login, googleSignIn, isLoading, error, defaultValue } = useAuth();
  const { sendToast } = useToast();

  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
  };

  const handleGoogleSignIn = async () => {
    await googleSignIn();
  };

  useEffect(() => {
    if (error) {
      sendToast({ error: true, content: { message: error.message } });
    }
  }, [error]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <section className={styles.nav_section}></section>
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={`${styles.wrapper} main-container`}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h2 className={styles.title}>Log into your account</h2>
                  <label className={styles.label}>
                    <span>Email:</span>
                    <input
                      defaultValue={defaultValue?.email || ''}
                      className={styles.input}
                      type="email"
                      placeholder="yourname@email.com"
                      required
                      ref={emailInput}
                    />
                  </label>
                  <label className={styles.label}>
                    <span>Password:</span>
                    <input
                      className={styles.input}
                      type="password"
                      required
                      ref={passwordInput}
                    />
                  </label>
                  <button className={styles.button} type="submit">
                    Login
                  </button>
                </form>
                
                {/* Google Sign-In Button */}
                <button className={styles.googleButton} onClick={handleGoogleSignIn}>
                  Sign in with Google
                </button>

                <p className={styles.no_account}>
                  New to Sharma Fashion?{' '}
                  <Link to="/account/signup" state={routerState}>
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default LoginPage;