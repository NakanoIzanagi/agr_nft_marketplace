import type { NextPage } from "next";
import { NftView, UsernftsView } from "../../views";
import HeadContent from "components/HeadContent";

const UserPage: NextPage = (props) => {
    return (
        <div className="w-full bg-black">
            <HeadContent />
            <UsernftsView />
            <NftView />
        </div>
    );
};

export default UserPage;
