// src/pages/Login.tsx
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { Button } from '@/components/ui/button';

const Login = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <div className="flex flex-grow items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Todoリスト</h1>
        <p className="mb-4">始めるにはGoogleアカウントによるログインが必要です。</p>
        <Button onClick={signInWithGoogle}>Googleアカウントでログイン</Button>
      </div>
    </div>
  );
};

export default Login;
