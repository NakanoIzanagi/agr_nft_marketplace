import type { NextPage } from "next";
import {TokenomicsView} from "../views";
import HeadContent from "components/HeadContent";

const Tokenomics: NextPage = (props) => {
    return (
        <div>
            <HeadContent />
            <TokenomicsView />
        </div>
    );
};

export default Tokenomics;
