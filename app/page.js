"use client";

import { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState('');

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      const token = await userCredential.user.getIdToken();
      setIdToken(token);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIdToken('');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Firebase Authentication with Next.js</h1>
      {!user ? (
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						/>
          <br />
          <input
            type="password"
            value={password}

            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br />
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      ) : (
        <div>
          <p>Signed in as: {user.email}</p>
          <p>ID Token: <textarea disable>{idToken}</textarea></p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}
