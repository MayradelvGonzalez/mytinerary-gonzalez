import React, { useEffect, useState } from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as LinkRouter } from 'react-router-dom';
import commentsActions from '../../redux/actions/commentActions'

const Comments = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const [reload, setReload] = useState(false);
    const [inputText, setInputText] = useState("");
    const [itinerary, setItinerary] = useState("");

    const user = useSelector(store => store.usersReducer.user);

    useEffect(() => {
        dispatch(commentsActions.addComment())
        dispatch(commentsActions.modifyComment(id)) //commentId?
        dispatch(commentsActions.deleteComment(id))
    }, [id, reload]);
    //     async function comentar(props) {
    //         await dispatch(commentsActions.addComment(props))
    //         setReload(!reload)
    //     }
    //     async function Comments(event) {
    //         const commentData = { itinerary: itinerary._id, comment: inputText }

    //     await props.addComment(commentData)
    //         .then(response => setItinerary(response.data.response.nuevoComment), setInputText(""))
    //     document.querySelector("#nuevoComment").textContent = ""
    // }
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
                    userId={user.userId}
                    comment={user.comment} />)
                : (<LinkRouter to='/signin'>Sign In to comment</LinkRouter>)

            } </div>

    )
}




export default Comments



//     < div className = "card3 cardComments" >
//           <div className="card-header">
//             <h2 className="text2">Add commnet</h2>
//           </div>
//           <div className="card-body">
//             <input
//               onChange={(event) => setInputText(event.target.value)}
//               className="card-text textComments"
//               value={inputText}
//             />
//             <button onClick={cargarUnComentario} className="btn btn-primary">
//               Update
//             </button>
//           </div>
//         </div >
//       ) : (
//     <div className="ConteinerUsercomment">
//         <h3 className="text2">Sign up to comment ...</h3>
//     </div>
// )}
//     </div >
