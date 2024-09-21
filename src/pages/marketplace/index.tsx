import type { NextPage } from "next";
import { NftView } from "../../views";
import HeadContent from "components/HeadContent";
import { UsernftsView } from "views/marketplace";

const Marketplace: NextPage = (props) => {
 
  return (<div>
    <HeadContent />
    <UsernftsView />
  </div>
  );
};

export default Marketplace;
