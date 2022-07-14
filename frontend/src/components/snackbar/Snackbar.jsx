import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles/';
import { useDispatch } from 'react-redux'
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { useSelector } from 'react-redux'


function SnackBar() {
  const dispatch = useDispatch()

  const snackbar = useSelector((state) => state.usersReducer.snackbar)

  const useStyles = makeStyles(theme => ({
    icon: {
      marginTop: '.5rem',
      color: snackbar.success ? '#4c8a4c' : '#c62b27',
      width: '1.2rem',
      height: '1.2rem',
      fontSize: '2.8rem',
      alignSelf: 'flex-start',

    },
    iconHover: {
      marginTop: '.5rem',
      color: snackbar.success ? '#4c8a4c' : '#c62b27',
      width: '1.2rem',
      height: '1.2rem',
      fontSize: '1.8rem',
      alignSelf: 'flex-start'
    }
  }));
  const MySnackbar = styled(Snackbar)({
    backgroundColor: snackbar.success ? 'RGBA(223, 240, 214, 0.7)' : 'RGBA(250, 225, 220, 0.7)',
    color: snackbar.success ? 'RGBA(47, 123, 48, 0.9)' : 'RGBA(194, 25, 20, 0.9)',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    padding: '6px 16px',
    fontWeight: '700',
    lineHeight: '1.43',
    letterSpacing: '0.01071em',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

  });

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: 'MESSAGE',
      payload: {
        view: false,
        message: '',
        success: false
      }
    });
  };

  return (
    <div>
      {snackbar.view === true && (
        <MySnackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={snackbar.view}
          onClose={handleClose}
          autoHideDuration={7000}>
          <>
            {typeof snackbar.message === "string" ? (
              <p> {snackbar.message} </p>
            ) : (
              <ul>
                {snackbar.message.map((message) => (
                  <li>{message.message}</li>
                ))}
              </ul>
            )}
            <IconButton
              className={classes.iconHover}
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}>
              <CloseIcon
                className={classes.icon}
                fontSize="small" />
            </IconButton>
          </>
        </MySnackbar>
      )}

    </div>
  );
}
export default SnackBar;
