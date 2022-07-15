import React from 'react';
import { useSelector } from 'react-redux';
import logo_transparent from '../../img/logo_transparent.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import usersActions from '../../redux/actions/usersActions';
import { useDispatch } from 'react-redux';
import SnackBar from '../snackbar/Snackbar';
import avatarNoUsuario from '../../img/avatarNoUsuario.png';

const settings = [{ to: '/signup', name: 'Sign Up' }, { to: '/signin', name: 'Sign In' }];
const opcionesNavBar = [{ to: '/', name: 'Home' }, { to: '/cities', name: 'Cities' }]

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const users = useSelector(store => store.usersReducer.user);
  console.log(users)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  async function signOut() {
    await dispatch(usersActions.signOut())
      .then(navigate("/signup", { replace: true, message: "Bye!👋 come back soon!" }))//me lleva de nuevo al home al hacer sign out
  }
  
  return (
    <AppBar position="static">
      <Container maxWidth="xl" className="nav">
        <Toolbar disableGutters className='caja-menu'>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src={logo_transparent} alt="LogoMyTinerary" style={{ width: "6.5rem" }} /></Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }} >
              {opcionesNavBar.map((cadaOpcion, index) => (
                <LinkRouter key={index} to={cadaOpcion.to} onClick={handleCloseNavMenu}>
                  <MenuItem>
                    <Typography className='OpcionesMenu' textAlign="center">{cadaOpcion.name}</Typography>
                  </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: "100%", justifyContent: "center" }}>
            <img src={logo_transparent} alt="LogoMyTinerary" style={{ width: "40px" }} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', width: '100px', justifyContent: 'center' } }}>
            <LinkRouter to='/' className="botonMenu">
              <button className="boton-menu">Home</button>
            </LinkRouter>
            <LinkRouter to='/Cities' className="botonMenu">
              <button className="boton-menu">Cities</button>
            </LinkRouter>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                {users ? <Box sx={{ display: 'flex', flexDirection: 'column', WebkitJustifyContent: 'center', color: 'white', alignItems: 'center', }} >
                  <Avatar alt="imageUser" src={users.userData?.photo} sx={{ width: 50, height: 50 }} sm={{ width: 40, height: 40 }} />
                  <h6 className='nombreAvatar'>{users.userData?.fullName}</h6>
                </Box>
                  :
                  <Box sx={{ display: 'flex', flexDirection: 'column', WebkitJustifyContent: 'center', alignItems: 'center', color: 'white' }} > <Avatar alt="nombre" src={avatarNoUsuario} />
                    <h6 className='nombreAvatar'>user no registered</h6></Box>

                }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {users ? (
                <Box>
                  <MenuItem
                    sx={{ '&:hover': { bgcolor: 'rgb(224,224,224)' } }} onClick={handleCloseUserMenu}>
                    <Typography sx={{ padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'rgb(2,0,3)' }} onClick={signOut}>Sign Out</Typography>
                    <SnackBar />
                  </MenuItem>
                </Box>
              )
                : settings.map((setting, index) => (
                  <LinkRouter key={index} to={setting.to} onClick={handleCloseNavMenu}>
                    <MenuItem>
                      <Typography className='OpcionesMenu' textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  </LinkRouter>
                )
                )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
     
    </AppBar>
  )
}

export default Nav