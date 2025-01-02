import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const navigate = useNavigate(); // useNavigate ile yönlendirme işlevi

    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
            setListOfPosts(response.data);
        });
    }, []);

    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                    <div
                        key={key} // Her liste elemanı için "key" belirtmek önemli
                        className="post"
                        onClick={() => {
                            navigate(`/post/${value.id}`); // Yönlendirme işlemi
                        }}
                    >
                        <div className="title">{value.title}</div>
                        <div className="body">{value.postText}</div>
                        <div className="footer">{value.username}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;
