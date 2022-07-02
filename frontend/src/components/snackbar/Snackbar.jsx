// import React from 'react';
// import { ToastContainer, toast } from 'react-toastify'; //desestructura los modulos que utilizare
// import 'react-toastify/dist/ReactToastify.css';//estilo de la notificacion



// function SnackBar() {
//     const dispatch = useDispatch()

//   const snackbar = useSelector((state) => state.usersReducer.snackbar)
//   console.log(snackbar);
//   const useStyles = makeStyles(theme => ({
//     icon: {
//       marginTop: '.1rem',
//       color: snackbar.success ? '#4c8a4c' :'#c62b27',
//       width: '1rem',
//       height: '1rem',
//       fontSize: '1rem',
//       alignSelf: 'flex-start'
//     },
//     iconHover:{
//       marginTop: '.1rem',
//       color: snackbar.success ? '#4c8a4c' :'#c62b27',
//       width: '2rem',
//       height: '2rem',
//       fontSize: '1rem',
//       alignSelf: 'flex-start'
//     }
//   }));
//   const MySnackbar = styled(Snackbar)({
//     backgroundColor: snackbar.success ? 'RGBA(223, 240, 214, 0.7)' : 'RGBA(250, 225, 220, 0.7)',
//     color:snackbar.success ? 'RGBA(47, 123, 48, 0.9)' : 'RGBA(194, 25, 20, 0.9)' ,
//     borderRadius: '10px',
//     boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',  
//     padding: '6px 16px',
//     fontWeight: '700',
//     lineHeight: '1.43',
//     letterSpacing: '0.01071em',
//     textAlign: 'center',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignContent: 'center',
//   });

//   const classes = useStyles();

//   const handleClose = (event, reason) => {
//     if(reason === "clickaway"){
//       return;
//     }
//     dispatch({
//       type: 'MESSAGE',
//       payload: {
//         view: false,
//         message: '',
//         success: false
//       }
//     });
//   };

//   return (
//     <div>
//        {snackbar.view === true && (
//         <MySnackbar
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'center',
//           }}
//           open={snackbar.view}
//           onClose={handleClose}
//           autoHideDuration={7000}
//         >
//           <>
//             {snackbar.success ?
//               (
//                 <>
//                 <CheckIcon />
//               <p style={{textAlign: "center", margin:'.5rem'}}>{snackbar.message}</p>
//               </>
//               ) :
//               (<>
//               {!snackbar.success?(snackbar.map(e => {
//                 <>
//              <ErrorIcon/>
//               <p style={{textAlign: "center", margin:'.5rem'}}>{e.message}</p>
//               </>
//               })):(null)
               
//             }</>)
//             }
//             <IconButton 
//             className={classes.iconHover}
//             size="small" 
//             aria-label="close" 
//             color="inherit"
//             onClick={handleClose}>
//               <CloseIcon 
//               className={classes.icon}
//               fontSize="small" />
//             </IconButton>
//           </>
//         </MySnackbar> 
//        )} 

//     </div>
//   );
// }
// export default SnackBar;