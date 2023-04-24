import React from "react";
import './Navbar.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link, useNavigate,  } from 'react-router-dom';
import { Box } from '@mui/material';
import useLocalStorage from 'react-use-localstorage';


function Navbar() {
    const [token, setToken] = useLocalStorage('token');
    const history = useNavigate();

    

    function goLogout(){
        setToken('')
        alert('Usuario foi dar um rolê')
        history('/login')
    }

    return (
        <>
            <AppBar position="static" style={{ backgroundColor: "#1d3557" }}>
                <Toolbar variant="dense" >
                    <Box display={'flex'} justifyContent={'space-between'} width={'100%'} >

                        <Box className="cursor">
                            <Typography variant="h5" color="inherit">
                                GeekyCritters
                            </Typography>
                        </Box>


                        <Box display="flex" justifyContent="start">

                            <Link to='/home' className='text'>
                                <Box mx={1} className="cursor">
                                    <Typography variant="h6" color="inherit">
                                        home
                                    </Typography>
                                </Box>
                            </Link>

                            <Link to='/posts' className='text'>
                                <Box mx={1} className="cursor">
                                    <Typography variant="h6" color="inherit">
                                        postagens
                                    </Typography>
                                </Box>
                            </Link>

                            <Link to='/temas' className='text'>
                                <Box mx={1} className="cursor">
                                    <Typography variant="h6" color="inherit">
                                        temas
                                    </Typography>
                                </Box>
                            </Link>

                            <Link to='/formularioTema' className='text'>
                                <Box mx={1} className="cursor">
                                    <Typography variant="h6" color="inherit">
                                        cadastrar tema
                                    </Typography>
                                </Box>
                            </Link>

                            <Link to='/login' className='text'>
                                <Box mx={1} className="cursor" onClick={goLogout}>            
                                    <Typography variant="h6" color="inherit">
                                        logout
                                    </Typography>
                                </Box>
                            </Link>
                
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar >
        </>
    );
}

export default Navbar;