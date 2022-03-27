import React from "react";
import styled from "styled-components";
import { useInput } from "../../../hook/useinput";

const PostForm = () => {
    const [content, inChangeCOntent] = useInput("");

    return(
        <StyledPostForm>
            <textarea cols="80" row="5" value={content} onChange={inChangeCOntent} placeholder="태원님, 오늘은 어떤 일이 있었나요?" autoComplete="off" />
            <button>등록</button>
        </StyledPostForm>
    )
}

export default PostForm;

const StyledPostForm = styled.form`
    box-sizing: border-box;
    max-width: 50rem;
    min-width: 18.75rem;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 1rem;
    & textarea {
        box-sizing: border-box;
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        resize: none;
        font-size: 0.875rem;
        color: #666;
    }
    & textarea::placeholder {
        color: #ccc;
        font-size: 0.875rem;
    }
    & textarea:focus {
        outline: none;
        border: 1px solid #7784cc;
        box-shadow: 0 0 0 0.1rem rgb(59 65 99/ 25%);
    }
    & button {
        width: 100%;
        border: none;
        padding: 0.5rem;
        background-color: #4f5681;
        font-size: 0.875rem;
        color: #fff;
        cursor: pointer;
    }
    & button:hover {
        background-color: #3b4163;
    }
`;