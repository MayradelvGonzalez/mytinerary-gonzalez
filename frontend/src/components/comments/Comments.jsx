import React from 'react';
import { useEffect, useState } from 'react'
import commentsActions from '../../redux/actions/commentActions'
import { useParams, Link as LinkRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import itinerariesActions from '../../redux/actions/itinerariesActions';
import usersActions from '../../redux/actions/usersActions';

const Comments = () => {

    const { id } = useParams()
    const [reload, setReload] = useState(false)
    const users = useSelector(store => store.usersReducer.user);
    
        const data = [
            {
              userId: '',
              fullName:'',
              photo:'',
              comme: '',
              replies: [
                {
                  userId: '',
                  fullName: '',
                  photo: '',
                  comment:'',
                }
              ]
            },
           
          ]
                              
 
  const dispatch = useDispatch()
//   const [inputText, setInputText] = useState("");
  useEffect(() => {
    dispatch(commentsActions.addComment())
    dispatch(commentsActions.modifyComment(id)) //commentId?
    dispatch(commentsActions.deleteComment(id))
}, [id, reload]);

  return (
    <div className='coments' style={{ width: '100%' }}>
      <a
        style={{ color: 'black', cursor: 'pointer' }}
        target='_blank'
        rel='noopener noreferrer'
>
        <span className='title'>Comment</span>
      </a>
      <CommentSection
        currentUser={{
          currentUserId:"",
          currentUserImg:
            'https://ui-avatars.com/api/name=Riya&background=random',
          currentUserProfile:
            'https://www.linkedin.com/in/riya-negi-8879631a9/',
          currentUserFullName: 'Riya Negi'
        }}
        commentData={data}
        logIn={{
          loginLink: 'http://localhost:3000/signin',
          signupLink: 'http://localhost:3000/signup'
        }}
        // onSubmitAction={(data: {
        //   userId: string
        //   fullName: string
        //   text: string
        //   replies: any
        //   commentId: string
        //   fullName: string,
        //   photo: string,

        // }) => console.log('check submit, ', data)}
        // currentData={(data: any) => {
        //   console.log('curent data', data)
        // }}
      />
    </div>
  )
    }
export default Comments