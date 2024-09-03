import type { NextPage } from "next";
import { WhitepaperView } from "../views";
import HeadContent from "components/HeadContent";

const Whitepaper: NextPage = (props) => {
    return (
        <div>
            <HeadContent />
            <WhitepaperView />
        </div>
    );
};

export default Whitepaper;
