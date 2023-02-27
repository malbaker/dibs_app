import React from "react";
import ReactDOM from "react-dom";
import HomePage from "../components/HomePage";
import PostPage from "../components/Postpage";
import "/index.css";


ReactDOM.render(
    <React.StrictMode>
        <PostPage/>
    </React.StrictMode>,
    document.getElementById("root")
)