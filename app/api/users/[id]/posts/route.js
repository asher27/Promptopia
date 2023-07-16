import {connectToDB} from "../../../../../utils/database";
import Prompt from "../../../../../models/prompt";

export const GET = async (req, {params}) => {

    try {
        const userId = params.id;
        await connectToDB();
        const response = await Prompt.find({
            creator: userId,
        }).populate('creator');

        return new Response(JSON.stringify(response), {
            status: 200
        });
    } catch (e) {
        return new Response('Fail to get posts', {
            status: 500
        });
    }
}
