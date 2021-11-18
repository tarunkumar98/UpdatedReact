import { Icon, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import MyPopup from "./MyPopup";
import { LIKE_POST_MUTATION } from "../utils/graphql";

const LikeButton = ({ user, post: { id, likes, likesCount } }) => {
    const [liked, setLiked] = useState(false);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {
            postId: id,
        },
        onError(err) {},
    });

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const likeButton = user ? (
        liked ? (
            <Button color="teal">
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="teal" basic>
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="teal" basic>
            <Icon name="heart" />
        </Button>
    );

    return (
        <Button as="div" labelPosition="right" onClick={likePost}>
            <MyPopup content={liked ? "Unlike" : "Like"}>{likeButton}</MyPopup>
            <Label basic color="teal" pointing="left">
                {likesCount}
            </Label>
        </Button>
    );
};

export default LikeButton;
