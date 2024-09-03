import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Head>
        <title>FoodSply</title>
      </Head>

      <ContextProvider>
        <div className="flex flex-col h-screen">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <AppBar setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
          <ContentContainer setShowSidebar={setShowSidebar} showSidebar={showSidebar}>
            <Component {...pageProps} />
            <Footer />
          </ContentContainer>
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
