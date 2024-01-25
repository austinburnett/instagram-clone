import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*
 * CreatePostButton
 * @desc Takes user to the create post page.
 */
const CreatePostButton = () => {
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
