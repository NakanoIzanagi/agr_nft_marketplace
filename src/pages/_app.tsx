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
import CustomLayout from 'components/customLayout';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps, router }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const getLayout = () => {
    // Add routing logic here to determine which layout to use
    if (router.pathname === '/landing') {
      return (
        <CustomLayout>
          <Component {...pageProps} />
        </CustomLayout>
      );
    }
    // Default layout for other pages
    return (<>
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

  return getLayout();
};

export default App;
