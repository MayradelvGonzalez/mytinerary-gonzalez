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
                        <h5>{comment.userId.fullName}</h5>
                    </div>
                    <div className="mensaje">
                        {/* <div type="text" onInput={(event) => setModifi(event.currentTarget.textContent)} contentEditable >{comment.comment}</div> */}
                        <div className="inputMensaje" type="text">{comment.comment}</div>
                        {comment.userId?._id === user?.id  ?
                       
                        <div>
                            <button onClick={() => eliminarComentario(comment._id)} className='botonEliminar'>Delete</button>
                            <button onClick={() => handleClickOpen(comment._id, comment.comment )} className='botonEditar'>Edit</button> 
                        </div>
                        :
                        null
                         }

                    </div>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We
                                will send updates occasionally.
                            </DialogContentText>

                            {/* <input  onChange={(event) =>setInputModify(event.target.value)}  id="nuevoComentario" placeholder='Ingresa aqui tu comentario...' className="inputChat" ></input> */}
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
                            <Button onClick={() => modificarComentario(idComment)}>Edit</Button>
                            <Button onClick={handleClose}>Finalize</Button>

                        </DialogActions>


                    </Dialog>



                </div>

            )
            }
            {user?
            <div className="inputMensajes">
                <input type='text' placeholder='Enter your comment' onChange={inputSet}></input>
                <button onClick={cargarComentario}>Send</button>
            </div>
            :
            <div>Please, sign in to comment<LinkRouter to='/signin'>sign in🔗</LinkRouter>or <LinkRouter to='/signup'>sign up</LinkRouter></div>
            }
        
        </>
        
        )
}
export default Comments



