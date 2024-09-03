import type { NextPage } from "next";
import { TeamView } from "../views";
import HeadContent from "components/HeadContent";

const Whitepaper: NextPage = (props) => {
    return (
        <div>
            <HeadContent />
            <TeamView />
        </div>
    );
};

export default Whitepaper;
