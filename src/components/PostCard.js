import moment from "moment";
import { Card, Image, Icon, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import MyPopup from "./MyPopup";

import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/postcart/postcart.actions";
import { selectCurrentUser } from "../redux/user/user.selector";
import { selectPostCart } from "../redux/postcart/postcart.selectors";
import SaveButton from "./SaveButton";

const PostCard = (post) => {
    const user = useSelector(selectCurrentUser);
    const dispatch=useDispatch();
    const { body, createdAt, id, username, likesCount, commentsCount, likes }=post.post;
    // postcart.map(post=>console.log(post.post.username,user.username))
    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>

            <Card.Content extra>
                <LikeButton user={user} post={post.post} />
                <MyPopup content="Comment on post">
                    <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                        <Button color="blue" basic>
                            <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                            {commentsCount}
                        </Label>
                    </Button>
                </MyPopup>
                <SaveButton user={user} post={post.post}/>
                {user && user.username === username && (
                    <DeleteButton postId={id} />
                )}
            </Card.Content>
        </Card>
    );
};

export default PostCard;
