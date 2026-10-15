
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/react';

import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <a href="/" className="logo">
          Sonu<span>Dev.</span>
        </a>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <div className="auth-buttons">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="login-btn">Log In</button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="signup-btn">Get Started</button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>

      <main className="hero">
        <span className="tag">WELCOME TO SONUDEV</span>
        <h1>Build something <span>amazing.</span></h1>
        <p>
          A modern platform with secure authentication.
        </p>

        <Show when="signed-out">
          <SignUpButton mode="modal">
            <button className="hero-btn">Create Your Account →</button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          <h3>You are successfully logged in! 🎉</h3>
        </Show>
      </main>
    </div>
  );
}

export default App;
