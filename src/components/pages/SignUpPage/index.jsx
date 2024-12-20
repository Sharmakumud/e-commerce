import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import { useToast } from 'hooks/useToast';

import { Loader } from 'components/common';

import styles from './index.module.scss';

const SignUpPage = () => {
  const { state: routerState } = useLocation();

  const { signUp, googleSignUp, isLoading, error, defaultValue } = useAuth();
  const { sendToast } = useToast();

  const nameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUp({
      name: nameInput.current.value,
      lastName: lastNameInput.current.value,
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
  };

  const handleGoogleSignUp = async () => {
    await googleSignUp();
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
                  <h2 className={styles.title}>Create Account</h2>
                  <label className={styles.label}>
                    <span>Name:</span>
                    <input
                      defaultValue={defaultValue?.name || ''}
                      className={styles.input}
                      type="text"
                      placeholder="Name"
                      required
                      ref={nameInput}
                    />
                  </label>
                  <label className={styles.label}>
                    <span>Last Name:</span>
                    <input
                      defaultValue={defaultValue?.lastName || ''}
                      className={styles.input}
                      type="text"
                      placeholder="Last Name"
                      required
                      ref={lastNameInput}
                    />
                  </label>
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
                    Create Account
                  </button>
                </form>
                <button className={styles.googleButton} onClick={handleGoogleSignUp}>
                  Sign Up with Google
                </button>
                <p className={styles.login}>
                  Already have an account?{' '}
                  <Link to="/account/login" state={routerState}>
                    Login
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

export default SignUpPage;