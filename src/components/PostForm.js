import React, { Fragment } from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../hooks/hooks";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY, CREATE_POST_MUTATION } from "../utils/graphql";

const PostForm = () => {
    const { onSubmit, onChange, values } = useForm(createPostCallback, {
        body: "",
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: {
            createPostBody: values.body,
        },
        update(proxy, result) {
            const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts],
                },
            });
            values.body = "";
        },
        onError(err) {
            console.log(err);
        },
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <Fragment>
            <Form onSubmit={onSubmit}>
                <h2>Create a post</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi world!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0]?.message}</li>
                    </ul>
                </div>
            )}
        </Fragment>
    );
};

export default PostForm;
