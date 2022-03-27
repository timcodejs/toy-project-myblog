import React, { useCallback, useState } from "react";
import moment from 'moment';
import styled from "styled-components";
import Avatar from './avatar';
import Comment from './comment';
import CommentForm from './commentForm';

moment.locale("ko");

const Post = () => {
    const [editPost, setEditPost] = useState(false);
    const [commentBox, setCommentBox] = useState(false);

    const onToggleComment = useCallback((e) => {
        e.preventDefault();
        setCommentBox((prev) => !prev);
    }, []);

    return(
        <StyledPost>
            <div className="info">
                <div className="inner">
                    <Avatar />
                    <div className="name-date">
                        <div className="name">태원님</div>
                        <div className="date">{moment().format("YYYY.MM.DD")}</div>
                    </div>
                </div>
                <div>
                    <button className="editBtn" onClick={() => {
                        setEditPost((prev) => !prev)
                    }}>
                        수정
                    </button>
                    <button className="editBtn">삭제</button>
                </div>
            </div>
            {editPost 
            ? (
                <>
                    <textarea cols="80" row="5" />
                    <button className="editBtn updateBtn">수정하기</button>
                </>
            ) 
            : (
                <div className="content">내용</div>
            )}
            <div className="comment" onClick={onToggleComment}>
                <div className="total">댓글 1개</div>
                <div className="commentBtn">댓글 달기</div>
            </div>
            {commentBox && (
                <>
                    <CommentForm />
                    <Comment />
                </>
            )}
        </StyledPost>
    )
}

export default Post;

const StyledPost = styled.div`
    box-sizing: border-box;
    max-width: 50rem;
    min-width: 18.75rem;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 0.5rem;
    border: 1px solid #ddd;
    padding: 1rem;
    & .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        padding-bottom: 0.6rem;
    }
    & .inner {
        display: flex;
        justify-content: left;
        align-items: center;
    }
    & textarea {
        box-sizing: border-box;
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        resize: none;
        font-size: 0.875rem;
        color: #666;
    }
    & .name-date {
        display: inline-block;
        padding-left: 0.5rem;
        & .name {
            font-size: 0.875rem;
            color: #666;
        }
        & .date {
            font-size: 0.75rem;
            color: #999;
        }
    }
    & .editBtn {
        border: none;
        font-size: 0.75rem;
        color: #666;
        background: none;
        cursor: pointer;
    }
    & .editBtn:hover {
        color: #000;
    }
    & .updateBtn {
        width: 100%;
        text-align: right;
        padding-bottom: 0.7rem;
        font-weight: bold;
    } 
    & .content {
        box-sizing: border-box;
        padding: 1rem;
        font-size: 0.875rem;
        color: #666;
    } 
    & .comment {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #ddd;
        padding-top: 0.6rem;
        font-size: 0.75rem;
        color: #999;
        cursor: pointer;
    }
`;