import DeleteModalProvider from './contexts/DeleteModalContext';
import UserProvider from './contexts/UserContext';
import GlobalStyle from './styles/GlobalStyle';

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