import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePostButton = () => {
    // usenavigate to change url to /createpost
    const navigator = useNavigate();

    function handleClick(){
        navigator("/createpost");
        console.log("Clicked!")
    }

    return(
        <button onClick={handleClick}>Create Post</button>
    );
}

export default CreatePostButton;
