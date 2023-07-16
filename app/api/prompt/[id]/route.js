import { connectToDB } from '../../../../utils/database';
import Prompt from '../../../../models/prompt';

export const GET = async (req, { params }) => {
  try {
    const { id } = params;
    await connectToDB();

    const propmt = await Prompt.findById(id).populate('creator');
    if (!propmt) return new Response(`no post matching: ${id}`, { status: 404 });

    return new Response(JSON.stringify(propmt), { status: 200 });
  } catch (e) {
    new Response(`Fail to get post`, { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) return new Response(`no post matching: ${params.id}`, { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (e) {
    new Response(`Fail to edit post`, { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (req, {params}) => {

  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response(`Prompt deleted successfully`, { status: 200 });

  } catch (e) {
    return new Response(`Fail to delete prompt:${params.id}`, { status: 500 });
  }
}
