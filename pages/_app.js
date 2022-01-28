import UserProvider from './contexts/UserContext';
import GlobalStyle from './styles/GlobalStyle';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp;