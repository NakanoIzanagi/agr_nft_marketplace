import type { NextPage } from "next";
import { HomeView } from "../views";
import HeadContent from "components/HeadContent";

const Home: NextPage = (props) => {
  return (
    <div>
      <HeadContent />
      <HomeView />
    </div>
  );
};

export default Home;
