import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <a
          className="App-link"
          href="https://discord.com/api/oauth2/authorize?client_id=817438308823990312&redirect_uri=http%3A%2F%2F172.17.89.177%3A3000%2Fredirect&response_type=code&scope=identify%20guilds"
          rel="noopener noreferrer"
        >
          Test
        </a>
      </header>
    </div>
  );
}

export default Home;
