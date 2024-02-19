// src/components/LogoutButton.tsx
import { getAuth, signOut } from 'firebase/auth';
import { Button } from './ui/button';

const LogoutButton = () => {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  return (
    <Button className="bg-white hover:bg-gray-300 text-black font-bold" onClick={handleLogout}>
      ログアウト
    </Button>
  );
};

export default LogoutButton;
