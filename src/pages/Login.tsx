import { useState } from 'react';

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

export default function Login({ setIsLoggedIn }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true); // Go to dashboard
      setLoading(false);
    }, 1500);
  };

  // ... rest of your login JSX stays SAME
}
