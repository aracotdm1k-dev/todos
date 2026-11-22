import { useState } from 'react';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        style={{
          width: '240px',
          height: '30px',
          boxSizing: 'border-box',
          border: '1px solid #767676',
          borderRadius: '2px',
        }}
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: '240px',
          height: '30px',
          boxSizing: 'border-box',
          border: '1px solid #767676',
          borderRadius: '2px',
        }}
      />
      <br />
      <button
        type="submit"
        style={{
          backgroundColor: '#efefef',
          border: '1px solid #767676',
          borderRadius: '3px',
          color: 'black',
          padding: '2px 6px',
        }}
      >
        Send
      </button>
    </form>
  );
}

export default Login;
