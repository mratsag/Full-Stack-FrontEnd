import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import "./Home.scss";

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
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
            );
    }, []);

    if (error) {
        return <div>Error !!!</div>;
    } else if (!isLoaded) {
        return <div>Loading ...</div>;
    } else {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                    <Box sx={{ bgcolor: '#cfe8fc', minHeight: '100vh' }}>
                        <Container fixed className="container">
                            {postList.map(post => (
                                <Post userId = {post.userId} userName = {post.userName} key={post.id} title={post.title} text={post.text} />
                            ))}
                        </Container>
                    </Box>
                </Container>
            </React.Fragment>
        );
    }
}

export default Home;
