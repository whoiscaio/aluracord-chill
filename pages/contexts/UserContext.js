import { createContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({children}) {
  const [username, setUsername] = useState('');

  function defineUsername(username) {
    setUsername(username);
  }

  return (
    <UserContext.Provider value={{username, defineUsername}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext };
export default UserProvider;