import * as React from 'react';
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
import { makeStyles } from 'tss-react/mui';
import sizes from "./sizes";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'
import picture from '../../../public/build/images/RH Conseil.4e6a0d33.png'

const useStyles = makeStyles()(() => {
    return {
        homeNav: {
            position: 'absolute',
            top: 0,
            zIndex: '10',
            backgroundColor: 'rgba(31, 41, 55, 1)',
            height: '64px',
            width: '100%',
            maxWidth: '1500px',
            '& .MuiToolbar-root.MuiToolbar-regular': {
                minHeight: '64px'
            },
            color: 'rbga(209, 213, 219, 1)',

        },
        homeNavToolbar: {
            minHeight: '64px',
            height: '64px',
            display: 'flex',
            justifyContent: 'space-between',
            [sizes.down("md")]: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: '58px',
            }
        },
        homeNavMainbox: {
            "& button": {
                marginRight: '1rem'
            }
        },
        homeNavContainer: {
            minHeight: 'unset',
            height: '64px',
            width: '100%'
        },
        homeNavBox: {
            minHeight: 'unset',
            height: '64px',
            maxWidth: '50px'
        },
        navLink: {
            textDecoration: 'none',
            color: 'unset',
            fontWeight: '500'
        },
        homeNavLogo: {
            maxHeight: '40px',
        }
    };
});



function HomeNav(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { classes } = useStyles();
    const settings = ['Profile', 'Account', 'Dashboard'];
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
        <ThemeProvider theme={theme}>
        <AppBar position="static" className={classes.homeNav}>
            <Container maxWidth="xl" className={classes.homeNavContainer}>
                <Toolbar disableGutters className={classes.homeNavToolbar}>
                    <a href={'#'}>
                        <img className={classes.homeNavLogo} src={picture} alt='rh conseil'/>
                    </a>
                    <Box className={classes.homeNavBox} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{color: '#1abc9c'}} />
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
                            <MenuItem key='menu_accueil' onClick={handleCloseNavMenu}>
                                <Button variant="text" color='success'>
                                    <a href="#" className={classes.navLink}>Accueil</a>
                                </Button>
                            </MenuItem>
                            <MenuItem key='menu_articles' onClick={handleCloseNavMenu}>
                                <Button variant="text" color='success'>
                                    <a href="#" className={classes.navLink}>Articles</a>
                                </Button>
                            </MenuItem>
                            <MenuItem key='menu_painters' onClick={handleCloseNavMenu}>
                                <Button variant="text" color='success'>
                                    <a href="#" className={classes.navLink}>Peintres</a>
                                </Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                    {/* <WorkIcon sx={{ display: { xs: 'flex', md: 'none', color: '#1abc9c' }, mr: 1 }} />*/}
                    {/*<Box className={classes.homeNavMainbox} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>*/}

                    <Box sx={{ flexGrow: 0 }}>
                        { props.user ?
                        <div>
                        <Tooltip title="Open settings" sx={{ my: 2, display: 'block', marginRight: '1rem' }}>
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
                            <MenuItem key='logout' onClick={handleCloseUserMenu}>
                                <a href={props.logout}><Typography textAlign="center">Logout</Typography></a>
                            </MenuItem>
                        </Menu>
                        </div>
                            :
                            <div>
                                <div style={{display: 'flex'}}>
                                    <MenuItem key='register' >
                                    <Button onClick={handleOpenUserMenu} sx={{ borderRadius: '8px', textTransform: 'capitalize'}} color="success" variant="outlined">Créer un compte</Button>
                                    </MenuItem>
                                <MenuItem key='connexion' >
                                    <a href={props.loginLink}><Button variant="contained" color="success" sx={{ borderRadius: '8px', textTransform: 'capitalize'}}>Connexion</Button></a>
                                </MenuItem>
                                </div>
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

                                    <MenuItem key='candidate-register' onClick={handleCloseUserMenu}>
                                        <a href={props.registerCandidate}><Typography textAlign="center">Candidat</Typography></a>
                                    </MenuItem>
                                    <MenuItem key='recruiter-register' onClick={handleCloseUserMenu}>
                                        <a href={props.registerRecruiter}><Typography textAlign="center">Employeur</Typography></a>
                                    </MenuItem>
                                </Menu>
                            </div>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    );
}
export default HomeNav;