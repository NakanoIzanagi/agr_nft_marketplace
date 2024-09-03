import type { NextPage } from "next";
import { NftView } from "../views";
import HeadContent from "components/HeadContent";

const Whitepaper: NextPage = (props) => {
    return (
        <div>
            <HeadContent />
            <NftView />
        </div>
    );
};

export default Whitepaper;
