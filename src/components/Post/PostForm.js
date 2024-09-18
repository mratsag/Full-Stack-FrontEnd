import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'; // Alert component
import "./Post.scss";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function PostForm({ userId, userName, refreshPosts }) {
    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

    const savePost = () => {
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log("error"));
    }

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setOpenSnackbar(true); // Open Snackbar on submit
        setText("");
        setTitle("");
        refreshPosts();
    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return; // Prevent closing on clicking away
        }
        setOpenSnackbar(false); // Close Snackbar
    };

    return (
        <div>
            <Card sx={{ width: '100%', maxWidth: 1000, textAlign: "left", margin: '0 auto' }}>
                <CardHeader
                    avatar={
                        <Link className='link' to={{ pathname: '/users/' + userId }}>
                            <Avatar className='avatar' aria-label="user-avatar" >
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Title"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            value={title}
                            onChange={(i) => handleTitle(i.target.value)}
                        />
                    }
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Text"
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        endIcon={<SendIcon />}
                                        style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%', color: 'white' }}
                                        onClick={handleSubmit}
                                    >
                                        Post
                                    </Button>
                                </InputAdornment>
                            }
                        />
                    </Typography>
                </CardContent>
            </Card>

            {/* Snackbar with success Alert */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert
                    onClose={handleCloseSnackbar}
                    severity="success" 
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Post submitted successfully!
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

PostForm.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default PostForm;
