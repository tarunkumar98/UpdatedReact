import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import {
    Form,
    Button,
    Card,
    Grid,
    Icon,
    Image,
    Label,
} from "semantic-ui-react";
import {
    CREATE_COMMENT_MUTATION,
    FETCH_POST_QUERY,
    NEW_COMMENT_SUBSCRIPTION,
} from "../utils/graphql";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import MyPopup from "../components/MyPopup";

const SinglePost = (props) => {
    const user = useSelector((state) => state.auth.user);
    const commentInputRef = useRef(null);
    const postId = props.match.params.postId;
    const [comment, setComment] = useState("");

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update() {
            setComment("");
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment,
        },
        onError(er) {},
    });

    const { data, subscribeToMore } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId,
        },
    });

    let getPost;
    let postMarkup;

    useEffect(() => {
        subscribeToMore({
            document: NEW_COMMENT_SUBSCRIPTION,
            updateQuery(prevData, { subscriptionData }) {
                const newPost = subscriptionData.data.newComment;
                return {
                    getPost: newPost,
                };
            },
        });
    }, [subscribeToMore]);

    if (data) getPost = data.getPost;
    if (!getPost) {
        postMarkup = <p>Loading post...</p>;
    } else {
        const {
            id,
            body,
            createdAt,
            likesCount,
            commentsCount,
            username,
            comments,
            likes,
        } = getPost;

        const deletePostCallback = () => {
            props.history.push("/");
        };

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            floated="right"
                            size="small"
                            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>
                                    {moment(createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton
                                    user={user}
                                    post={{
                                        id,
                                        likesCount,
                                        likes,
                                    }}
                                />
                                <MyPopup content="Comment on Post">
                                    <Button
                                        as="div"
                                        labelPosition="right"
                                        onClick={createComment}
                                    >
                                        <Button basic color="blue">
                                            <Icon name="comments" />
                                        </Button>
                                        <Label
                                            basic
                                            color="blue"
                                            pointing="left"
                                        >
                                            {commentsCount}
                                        </Label>
                                    </Button>
                                </MyPopup>

                                {user && user.username === username && (
                                    <DeleteButton
                                        postId={id}
                                        callback={deletePostCallback}
                                    />
                                )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input
                                                type="text"
                                                placeholder="Comment..."
                                                name="comment"
                                                value={comment}
                                                ref={commentInputRef}
                                                onChange={(event) =>
                                                    setComment(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                type="submit"
                                                className="ui button teal"
                                                disabled={comment.trim() === ""}
                                                onClick={createComment}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map((comment) => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user &&
                                        user.username === comment.username && (
                                            <DeleteButton
                                                postId={id}
                                                commentId={comment.id}
                                            />
                                        )}
                                    <Card.Header>
                                        {comment.username}
                                    </Card.Header>
                                    <Card.Meta>
                                        {moment(comment.createdAt).fromNow()}
                                    </Card.Meta>
                                    <Card.Description>
                                        {comment.body}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return postMarkup;
};

export default SinglePost;
