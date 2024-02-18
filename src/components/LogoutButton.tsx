// src/components/LogoutButton.tsx
import { getAuth, signOut } from 'firebase/auth';
import { Button } from './ui/button';

const LogoutButton = () => {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  return <Button onClick={handleLogout}>ログアウト</Button>;
};

export default LogoutButton;
