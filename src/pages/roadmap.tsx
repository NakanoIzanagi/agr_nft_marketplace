import type { NextPage } from "next";
import { RoadmapView } from "../views";
import HeadContent from "components/HeadContent";

const Whitepaper: NextPage = (props) => {
    return (
        <div>
            <HeadContent />
            <RoadmapView />
        </div>
    );
};

export default Whitepaper;
