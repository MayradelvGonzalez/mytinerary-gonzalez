import React, { useEffect, useState } from 'react';
import itinerariesActions from '../../redux/actions/itinerariesActions'
import commentsActions from '../../redux/actions/commentActions'
import { useParams, Link as LinkRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SnackBar from '../snackbar/Snackbar'

function Comments({ coment, id, idItinerary, reload, setReload }) {

    const user = useSelector(store => store.usersReducer.user)

    const dispatch = useDispatch()
    console.log(coment)
    console.log(id)

    const [comentario, setComentario] = useState()
    const [itinerary, setItinerary] = useState()
    const [inputText, setInputText] = useState("")
    const [modifyComment, setModifyComment] = useState()
    const [open, setOpen] = useState(false)
    const [idComment, setIdComment] = useState("")

    useEffect(() => {
        dispatch(itinerariesActions.getItinerariesByCity(id))
    }, [reload])

    async function cargarComentario() {
        const comments = {
            itineraries: idItinerary,
            comment: inputText,
        }
        const res = await dispatch(commentsActions.addComment(comments))//requiere el id del itinerario y el comentario
        setReload(!reload)
        console.log(res)
    }

    function inputSet(event) {
        setInputText(event.target.value)
    }

    async function modificarComentario(idComment) {
        const res = await dispatch(commentsActions.modifyComment(idComment, modifyComment))
        setReload(!reload)
    }

    async function eliminarComentario(id) {
        await dispatch(commentsActions.deleteComment(id))
        setReload(!reload)
    }

    const handleClickOpen = (id, comment) => { //la ventana de editar, trae los datos del seteo
        setOpen(true);
        setComentario(comment);
        setIdComment(id);
    };

    const handleClose = () => { //para editar
        setOpen(false);
    };

    return (
        <>
            <h2 className='tituloComentarios'>Comments</h2>
            {coment?.map((comment) =>
                <div className='cajaMensaje' key={comment._id}>

                    <div className='contenidoMensaje'>
                        <div className='fotoPerfil'><img src={comment.userId.photo} alt="imagenPerfil" /></div>
                        <div><h5 className="nombreComentario">{comment.userId.fullName}</h5></div>
                    </div>
                    <div className="cajaMensajeInput">


                        <div className="mensaje">
                            <div className="inputMensaje" type="text">{comment.comment}</div>
                            {comment.userId?.id === comment.user?._id ?
                                (<div className="botonesComentario">

                                    <button onClick={() => eliminarComentario(comment._id)} className='botonAccion'>Delete</button>
                                    <button onClick={() => handleClickOpen(comment._id, comment.comment)} className='botonAccion'>Edit</button>


                                </div>)
                                :
                                (null)
                            }
                        </div>


                    </div>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Edite Comment:</DialogTitle>
                        <DialogContent>

                            <TextField
                                autoFocus
                                margin="dense"
                                defaultValue={comentario}
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(event) => setModifyComment(event.target.value)}
                                id="nuevoComentario"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => modificarComentario(idComment)}>Save changes</Button>
                            <Button onClick={handleClose}>Finish</Button>
                        </DialogActions>
                    </Dialog>

                </div>


            )
            }
            {
                user ?
                    <div className="inputMensajes">
                        <input type='text' placeholder='Enter your comment' onChange={inputSet}></input>
                        <button onClick={cargarComentario}>Send</button>

                    </div>
                    :
                    <div>Please, <LinkRouter to='/signin'>sign in🔗</LinkRouter> or <LinkRouter to='/signup'>sign up </LinkRouter>to comment</div>
            }

        </>
    )
}
export default Comments



