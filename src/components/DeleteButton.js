import React, { Fragment, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";
import {
    FETCH_POSTS_QUERY,
    DELETE_COMMENT_MUTATION,
    DELETE_POST_MUTATION,
} from "../utils/graphql";
import MyPopup from "./MyPopup";

const DeleteButton = ({ commentId, postId, callback }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
    const [deleteEntity] = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false);
            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                });
                let newData = data.getPosts.filter(
                    (post) => post.id !== postId
                );
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        ...data,
                        getPosts: [...newData],
                    },
                });
            }
            if (callback) callback();
        },
        variables: {
            postId,
            commentId,
        },
    });

    return (
        <Fragment>
            <MyPopup content={commentId ? "Delete Comment" : "Delete Post"}>
                <Button
                    as="div"
                    color="red"
                    floated="right"
                    onClick={() => setConfirmOpen(true)}
                >
                    <Icon name="trash" style={{ margin: 0 }} />
                </Button>
            </MyPopup>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteEntity}
            />
        </Fragment>
    );
};

export default DeleteButton;
