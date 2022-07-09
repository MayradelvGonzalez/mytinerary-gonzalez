import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import itinerariesActions from '../../redux/actions/itinerariesActions'
import commentsActions from '../../redux/actions/commentsActions';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const Comments = (props) => {
    const { id } = useParams()
    const [itinerary, setItinerary] = useState()
    const [inputText, setInputText] = useState("")
    const [modifyComment, setModifyComment] = useState()
    const [reload, setReload] = useState(false)

    useEffect(() => {
        dispatch(commentsActions.addComment(props));
        dispatch(commentsActions.deleteComment(props));
        dispatch(commentsActions.modifyComment(props))
    }, [props, !reload])
    // useEffect(() => {
    //     props.getOneItinerary(id)
    //         .then(response => setItinerary(response.data.response.itineraries))
    // }, [reload])

    const user = useSelector(state.usersReducer.user)

    async function cargarComentario(event) {

        const commentData = {
            itinerary: itinerary._id,
            comment: inputText,
        }

        await props.addComment(commentData)
            .then(response => setItinerary(response.data.response.nuevoComment), setInputText(""))
        document.querySelector("#nuevoComentario").textContent = ""


    }

    async function modificarComentario(event) {
        const commentData = {
            commentID: event.target.id,
            comment: modifiyComment,
        }
        console.log(modifyComment)
        await props.modifyComment(commentData)
        setReload(!reload)

    }
    async function eliminarComentario(event) {
        await props.deleteComment(event.target.id)
        setReload(!reload)
    }


    return (
        <>
            <div className="card mb-3 cardDetail" >
                {itinerary?.comments.map(comment =>
                    <>
                        {comment.userId?._id !== props.user?.id ?
                            <div className="card cardComments " key={comment._id}>
                                <div className="card-header cardHeader">
                                    <p>{comment.userId.fullName}</p> <p>{new Date(comment.date).toUTCString()}</p>
                                </div>
                                <div className="card-body">
                                    <p className="card-text cardText">{comment.comment}</p>
                                </div>
                            </div> :

                            <div className="card cardComments">
                                <div className="card-header cardHeader">
                                    <p>{comment.userId.fullName}</p> <p>{new Date(comment.date).toUTCString()}</p>
                                </div>
                                <div className="card-body ">

                                    <div type="text" className="card-text textComments" onInput={(event) => setModifi(event.currentTarget.textContent)} contentEditable >{comment.comment}</div>
                                    <button id={comment._id} onClick={modificarComentario} className="btn btn-primary btnComments">Modify</button>
                                    <button id={comment._id} onClick={eliminarComentario} className="btn btn-primary btnComments">Delete</button>
                                </div>
                            </div>
                        }
                    </>
                )}

                {props.user ?
                    <div className="card cardComments">
                        <div className="card-header cardHeaderNew">
                            Your comment
                        </div>
                        <div className="card-body ">
                            <div id="nuevoComentario" placeholder='Ingresa aqui tu comentario...' onInput={(event) => setInputText(event.currentTarget.textContent)} contentEditable className="card-text textComments" ></div>
                            <button onClick={cargarComentario} className="btn btn-primary btnComments">Cargar</button>
                        </div>
                    </div> :
                    <h1>Realiza singIn y dejanos tu comentario</h1>
                }
            </div>



        </>
    )
}

export default Comments;

// import React from 'react';
// import { useEffect, useState } from 'react'
// import { useParams, Link as LinkRouter } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { CommentSection } from 'react-comments-section'
// import 'react-comments-section/dist/index.css'
// import itinerariesActions from '../../redux/actions/itinerariesActions';
// import usersActions from '../../redux/actions/usersActions';
// import commentsActions from '../../redux/actions/commentActions';


// const Comments = ({ userId, comments }) => {
//     const users = useSelector(store => store.usersReducer.user);
//     console.log(users);
//     const { fullName, photo } = userId;
//     console.log(userId)
//     const { comment } = comments;
//     const { id } = useParams()
//     const [reload, setReload] = useState(false);

//     const dispatch = useDispatch()
//     useEffect(() => {
//         dispatch(store => store.commentsActions.addComment(comment))
//     }, [comment, reload])


//     const data = [
//         {
//             userId: '01a',
//             comId: '012',
//             fullName: 'Riya Negi',
//             avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
//             userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
//             text: 'Hey, Loved your blog! ',
//             replies: [
//                 {
//                     userId: '02a',
//                     comId: '013',
//                     userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
//                     fullName: 'Adam Scott',
//                     avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
//                     text: 'Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰'
//                 },
//                 {
//                     userId: '01a',
//                     comId: '014',
//                     userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
//                     fullName: 'Riya Negi',
//                     avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
//                     text: 'thanks!😊'
//                 }
//             ]
//         },
//         {
//             userId: '02b',
//             comId: '017',
//             fullName: 'Lily',
//             userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
//             text: 'I have a doubt about the 4th point🤔',
//             avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
//             replies: []
//         }
//     ]
//     return (
//         <div style={{ width: '100%' }}>
//             <a
//                 style={{ color: 'black', cursor: 'pointer' }}
//                 target='_blank'
//                 rel='noopener noreferrer'
//                 href='https://github.com/RiyaNegi/react-comments-section/blob/main/example/src/components/DefaultComponent.tsx'
//             >
//                 <span className='title'>Comentarios</span>
//             </a>
//             <CommentSection
//                 currentUser={{
//                     currentUserId: '01a',
//                     currentUserImg:
//                         'https://ui-avatars.com/api/name=Riya&background=random',
//                     currentUserProfile:
//                         'https://www.linkedin.com/in/riya-negi-8879631a9/',
//                     currentUserFullName: 'Riya Negi'
//                 }}
//                 commentData={data}
//                 logIn={{
//                     loginLink: 'http://localhost:3001/',
//                     signupLink: 'http://localhost:3001/'
//                 }}
//             // onSubmitAction={(data: {
//             //     userId: string
//             //     comId: string
//             //     avatarUrl: string
//             //     userProfile?: string
//             //     fullName: string
//             //     text: string
//             //     replies: any
//             //     commentId: string
//             // }) => console.log('check submit, ', data)}
//             // currentData={(data: any) => {
//             //     console.log('curent data', data)
//             // }}
//             />
//         </div>
//     )
// }

// export default Comments