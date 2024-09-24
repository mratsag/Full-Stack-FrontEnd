import React from "react";
import { CardContent, InputAdornment, OutlinedInput, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import './Comment.scss'; 

function Comment({ text, userId, userName }) {
    return (
        <CardContent className="comment">
            <OutlinedInput
                disabled
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 25 }}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Link className="link" to={{ pathname: '/users/' + userId }}>
                            <Avatar className="small-avatar" aria-label="user-avatar">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                className="input"
            />
        </CardContent>
    );
}

export default Comment;
