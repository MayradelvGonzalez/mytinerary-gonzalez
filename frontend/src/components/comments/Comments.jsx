import { useEffect, useState } from 'react';
import itinerariesActions from '../../redux/actions/itinerariesActions'
import commentsActions from '../../redux/actions/commentActions'
import { useParams, Link as LinkRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Comments({ coment, id, reload, setReload }) {

    const user = useSelector(store => store.usersReducer.user)

    const dispatch = useDispatch()
    console.log(coment)
    console.log(id)

    const [comment, setComments] = useState()
    const [itinerary, setItinerary] = useState()
    const [inputText, setInputText] = useState("")
    const [modifyComment, setModifyComment] = useState()
    // const [reload, setReload] = useState(false)

    // let handleReload = () => {
    //     setReload(!reload);
    // };

    useEffect(() => {
        dispatch(itinerariesActions.getOneItinerary(itinerary))//byOneItinerary(itinerary)
            .then(res => setComments(res))
    }, [reload])

    useEffect(() => {
        dispatch(itinerariesActions.getItinerariesByCity(id))
    }, [reload])

    async function cargarComentario() {
        const comments = {
            itineraries: id,
            comment: inputText,
        }
        const res = await dispatch(commentsActions.addComment(comments))//requiere el id del itinerario y el comentario
        setReload(!reload)
        console.log(res)
    }

    function inputSet(event) {
        setInputText(event.target.value)
    }

    async function modificarComentario(id) {
        const comment = {
            comment: modifyComment
        }
        const res = await dispatch(commentsActions.modifyComment(id, comment))
        setReload(!reload)


    }

    async function eliminarComentario(id) {
        await dispatch(commentsActions.deleteComment(id))
        setReload(!reload)
    }
    return (
        <>
            {coment?.map((comment) =>
                <div className='cajaMensaje' key={comment._id}>
                    <div className='contenidoMensaje'>
                        <div className='fotoPerfil'><img src={comment.userId.photo} alt="imagenPerfil" /></div>
                        <h4>{comment.userId.fullName}</h4>
                    </div>
                    <div className="mensaje">
                        {/* <div type="text" onInput={(event) => setModifi(event.currentTarget.textContent)} contentEditable >{comment.comment}</div> */}
                        <div className="inputMensaje" contentEditable type="text" onChange={(event) => setModifyComment(event.target.value)}>{comment.comment}</div>
                        <div>
                            <button onClick={() => eliminarComentario(comment._id)} className='botonEliminar'>Delete</button>
                            <button onClick={() => modificarComentario(comment._id)} className='botonEditar'>Edit</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="inputMensajes">
                <input type='text' placeholder='Enter your comment' onChange={inputSet}></input>
                <button onClick={cargarComentario}>Send</button>
            </div>

            {/* {user? 
  
    (<div className='cajaMensaje'>
    <div className='contenidoMensaje'>
        <img src={photo} alt="imagenPerfil" className='fotoPerfil' />
        <h3>{fullName}</h3>
    </div>
    <div className="mensaje">
       <input type="text" className="inputMensaje" onChange={(event) => setModifyComment(event.target.value)}></input>
        <button onClick={eliminarComentario} className='botonEliminar'>Delete</button>
        <button onClick={modificarComentario} className='botonEditar'>Edit</button>
    </div>
</div>)
:
 (<div>Please, sign in to comment<LinkRouter to='/signin'>🔗</LinkRouter></div>)

    
}  */}

        </>)
}
export default Comments



