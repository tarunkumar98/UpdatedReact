import moment from "moment";
import { Card, Image, Icon, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import MyPopup from "./MyPopup";

import { useSelector } from "react-redux";

const PostCard = ({
    post: { body, createdAt, id, username, likesCount, commentsCount, likes },
}) => {
    const user = useSelector((state) => state.auth.user);

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
                <LikeButton user={user} post={{ id, likes, likesCount }} />
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
                {user && user.username === username && (
                    <DeleteButton postId={id} />
                )}
            </Card.Content>
        </Card>
    );
};

export default PostCard;
