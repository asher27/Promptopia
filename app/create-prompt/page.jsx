'use client';

import React, {useState} from 'react';

import {useRouter} from "next/navigation";
import Form from "../../components/Form";
import {useSession} from "next-auth/react";

const CreatePrompt = () => {
    const router = useRouter();
    const {data: session} = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) => {
        e.preventDefault();

        if (!session) {

            alert('no session, please log in.');
            return;
        }
        if (!post.prompt || !post.tag) {

            alert('no propmt or tag, please check.');
            return;
        }


        setSubmitting(true);

        try {
            const response = await fetch(`/api/prompt/new`, {
                method: 'POSt',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id,
                }),
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (e) {
            console.log(e);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <Form
            type={'Create'}
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}

        />
    );
}

export default CreatePrompt;
