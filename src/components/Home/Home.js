import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import "./Home.scss";

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refreshPosts();
    }, []);

    if (error) {
        return <div>Error !!!</div>;
    } else if (!isLoaded) {
        return <div>Loading ...</div>;
    } else {
        return (
            <div className="container">
                <div className="post-form-container">
                    <PostForm userId={1} userName={"ddd"} refreshPosts={refreshPosts} />
                </div>
                <div className="post-list">
                    {postList.map(post => (
                        <Post
                            key={post.id}
                            userId={post.userId}
                            userName={post.userName}
                            title={post.title}
                            text={post.text}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;
