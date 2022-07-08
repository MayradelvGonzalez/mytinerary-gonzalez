import React, (useEffect) from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import { useSelector, useDispatch } from 'react-redux';
import { Link as LinkRouter } from 'react-router-dom';
import commentsActions from '../../redux/actions/commentActions'

const Comments = () => {
    const user = useSelector(store => store.usersReducer.user);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(commentsActions.addComment())
        dispatch(commentsActions.modifyComment(modifyComment)) //porque commentId?
        dispatch(commentsActions.deleteComment(id))

    }, [modifyComment, reload])

    async function comentar(props) {
        await dispatch(commentsActions.addComment(props))
        setReload(!reload)
    }
    // const data = [
    //     <div key={userId._id}>
    //         {user?.map(userId => {

    //             userId = { userId._id },

    //                 fullName = { userId.fullname },
    //                 photo = { userId.photo },

    //                 comment = { userId.comment },
    //         //         replies: [
    // {
    //     userId: {userId._id},

    // fullName: {userId.fullname},
    // photo: {userId.photo},

    // comment: {userId.comment},
    //     },]
    //          })


    // }</div>
    //     ]
    return (

        <div style={{ width: '100%' }}>
            <a
                style={{ color: 'black', cursor: 'pointer' }}
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/RiyaNegi/react-comments-section/blob/main/example/src/components/LogInComponent.tsx'>
                <span className='title'>Login Component</span>
            </a>
            {user ?
                (<CommentSection
                    userId={userL.userId}
                    comment={userL.comment} />)
                : (<LinkRouter to='/signin'>Sign In to comment</LinkRouter>)

            } </div>

    )
}




export default Comments
  // {userlogIn={{
            //     loginLink: 'http://localhost:3000/signin',
            //     signupLink: 'http://localhost:3000/signup'
            // }}
