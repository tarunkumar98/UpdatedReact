import { useQuery } from "@apollo/client";
import { FETCH_POSTS_QUERY, POST_SUBSCRIPTION } from "../utils/graphql";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
    // const client = useApolloClient();
    // const dataGetPosts = client.readQuery({ query: FETCH_POSTS_QUERY });
    // console.log(dataGetPosts);
    const user = useSelector((state) => state.auth.user);
    const { loading, data, subscribeToMore } = useQuery(FETCH_POSTS_QUERY); //, { pollInterval: 5000,}

    useEffect(() => {
        subscribeToMore({
            document: POST_SUBSCRIPTION,
            updateQuery: (prevData, { subscriptionData }) => {
                if (!subscriptionData) return prevData;
                const newPost = subscriptionData.data.newPost;
                const clonePosts = prevData.getPosts.slice();
                clonePosts.unshift(newPost);
                return {
                    getPosts: clonePosts.map((post) => {
                        return {
                            ...post,
                        };
                    }),
                };
            },
        });
    }, [subscribeToMore]);

    // const { loading:subLoading, data:subData } = useSubscription(POST_SUBSCRIPTION);

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading && <h1>Loading...</h1>}
                <Transition.Group>
                    {!loading &&
                        data.getPosts &&
                        data.getPosts.map((post) => (
                            <Grid.Column
                                key={post.id}
                                style={{ marginBottom: 20 }}
                            >
                                <PostCard post={post} />
                            </Grid.Column>
                        ))}
                </Transition.Group>
            </Grid.Row>
        </Grid>
    );
};

export default Home;
