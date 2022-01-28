import DeleteModalProvider from '../src/contexts/DeleteModalContext';
import UserProvider from '../src/contexts/UserContext';
import GlobalStyle from '../src/styles/GlobalStyle';

function MyApp({ Component, pageProps }) {

  return (
    <UserProvider>
      <DeleteModalProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </DeleteModalProvider>
    </UserProvider>
  )
}

export default MyApp;