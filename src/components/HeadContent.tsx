import type { NextPage } from "next";
import Head from "next/head";

const HeadContent: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      </Head>
    </div>
  );
};

export default HeadContent;
