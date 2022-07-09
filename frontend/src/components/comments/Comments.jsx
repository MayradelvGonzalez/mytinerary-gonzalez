import React from 'react';
import { useEffect, useState } from 'react'
import { useParams, Link as LinkRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import itinerariesActions from '../../redux/actions/itinerariesActions';
import usersActions from '../../redux/actions/usersActions';
import commentsActions from '../../redux/actions/commentActions';


const Comments = ({ userId, comments }) => {
    const users = useSelector(store => store.usersReducer.user);
    const { fullName, photo } = userId;
    const { comment } = comments;
    const { id } = useParams()
    const [reload, setReload] = useState(false);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(store => store.commentsActions.addComment(comment))
    }, [comment, reload])


    const data = [
        {
            userId: '01a',
            comId: '012',
            fullName: 'Riya Negi',
            avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
            userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
            text: 'Hey, Loved your blog! ',
            replies: [
                {
                    userId: '02a',
                    comId: '013',
                    userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
                    fullName: 'Adam Scott',
                    avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
                    text: 'Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰'
                },
                {
                    userId: '01a',
                    comId: '014',
                    userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
                    fullName: 'Riya Negi',
                    avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
                    text: 'thanks!😊'
                }
            ]
        },
        {
            userId: '02b',
            comId: '017',
            fullName: 'Lily',
            userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
            text: 'I have a doubt about the 4th point🤔',
            avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
            replies: []
        }
    ]
    return (
        <div style={{ width: '100%' }}>
            <a
                style={{ color: 'black', cursor: 'pointer' }}
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/RiyaNegi/react-comments-section/blob/main/example/src/components/DefaultComponent.tsx'
            >
                <span className='title'>Comentarios</span>
            </a>
            <CommentSection
                currentUser={{
                    currentUserId: '01a',
                    currentUserImg:
                        'https://ui-avatars.com/api/name=Riya&background=random',
                    currentUserProfile:
                        'https://www.linkedin.com/in/riya-negi-8879631a9/',
                    currentUserFullName: 'Riya Negi'
                }}
                commentData={data}
                logIn={{
                    loginLink: 'http://localhost:3001/',
                    signupLink: 'http://localhost:3001/'
                }}
            // onSubmitAction={(data: {
            //     userId: string
            //     comId: string
            //     avatarUrl: string
            //     userProfile?: string
            //     fullName: string
            //     text: string
            //     replies: any
            //     commentId: string
            // }) => console.log('check submit, ', data)}
            // currentData={(data: any) => {
            //     console.log('curent data', data)
            // }}
            />
        </div>
    )
}

export default Comments