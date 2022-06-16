import React from 'react';
import logoNuevo from '../../img/logoNuevo.jpg';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link as LinkRouter } from 'react-router-dom';



 const pages = ['Home', 'Cities'];
 const settings = [{to:'/singin', name:'Sing In'},{to:'/logout', name:'Log Out'}];
const opcionesNavBar = [{to:'/index', name:'Home'}, {to:'/cities', name:'Cities'}]

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
    <AppBar position="static">
      <Container maxWidth="xl" className="nav">
        <Toolbar disableGutters className='caja-menu'>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1}}>
          <img src={logoNuevo} alt="LogoMyTinerary" style={{width:"60px"}}/></Box>
      

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
              }}
            >
              {opcionesNavBar.map((cadaOpcion, index) => (
              <LinkRouter key={index} to={cadaOpcion.to} onClick={handleCloseNavMenu}>
                <MenuItem>
                  <Typography className='OpcionesMenu' textAlign="center">{cadaOpcion.name}</Typography>
                </MenuItem>
              </LinkRouter>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width:"100%", justifyContent:"center"}}>
              <img src={logoNuevo} alt="LogoMyTinerary" style={{width:"40px"}} />
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', width:'100px', justifyContent:'center'} }}>
            {pages.map((page, index) => (
              <LinkRouter>
              <Button
              className='OpcionesMenu'
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
              </LinkRouter>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting,index) => (
                 <LinkRouter key={index} to={setting.to} onClick={handleCloseNavMenu}>
                <MenuItem>
                  <Typography className='OpcionesMenu' textAlign="center">{setting.name}</Typography>
                </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
              }
export default Nav;

    
