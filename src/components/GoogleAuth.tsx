import App from '../App';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// サインイン
const SignInButton = () => {
  const signInWithGoogle = () => {
    //firebaseを利用してGoogleでサインインする
    signInWithPopup(auth, provider);
  };

  return (
    <button onClick={signInWithGoogle}>
      <p>Googleでログイン</p>
    </button>
  );
};

// サインアウト
const SignOutButton = () => {
  return (
    <button onClick={() => auth.signOut()}>
      <p>サインアウト</p>
    </button>
  );
};

const UserInfo = () => {
  return (
    <div>
      <img src={auth.currentUser?.photoURL ?? '../assets/default_user_icon.png'} alt="user_icon" />
      <p>{auth.currentUser?.displayName}</p>
    </div>
  );
};

const GoogleAuth = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <SignInButton />;
  }

  return (
    <>
      <UserInfo />
      <SignOutButton />
      <App />
    </>
  )
}

export default GoogleAuth;
