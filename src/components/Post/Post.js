import React from "react";
import "./Post.scss";

function Post({ title, text }) {
    return (
        <div className="postContainer">
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    );
}

export default Post;
