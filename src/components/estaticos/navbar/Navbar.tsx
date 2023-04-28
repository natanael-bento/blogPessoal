import React from "react";
import './Navbar.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link, useNavigate, } from 'react-router-dom';
import { Box } from '@mui/material';
import useLocalStorage from 'react-use-localstorage';
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from '../../../store/tokens/actions';
import {toast} from 'react-toastify';

function Navbar() {

    const token = useSelector<TokenState, TokenState['tokens']>(
        (state) => state.tokens
    )

    const history = useNavigate();

    const dispatch = useDispatch();


    //addToken
    function goLogout() {
        dispatch(addToken(''));
        toast.info('Usuario foi dar um rolê', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
      
        history('/login')
    }

    var navbarComponent;

    if (token !== "") {
        navbarComponent = <AppBar position="static">
            <Toolbar variant="dense" >
                <Box display={'flex'} justifyContent={'space-between'} width={'100%'} >

                    <Box className="cursor">
                        <Typography variant="h5" color="inherit">
                            GeekyCritters
                        </Typography>
                    </Box>


                    <Box display="flex" justifyContent="start">

                        <Link to={'/home'} className='text'>
                            <Box mx={1} className="cursor">
                                <Typography variant="h6" color="inherit">
                                    home
                                </Typography>
                            </Box>
                        </Link>

                        <Link to={"/postagens"} className='text'>
                            <Box mx={1} className="cursor">
                                <Typography variant="h6" color="inherit">
                                    Postagens
                                </Typography>
                                
                            </Box>
                        </Link>

                        <Link to={'/temas'} className='text'>
                            <Box mx={1} className="cursor">
                                <Typography variant="h6" color="inherit">
                                    Temas
                                </Typography>
                            </Box>
                        </Link>

                        <Link to={'/formularioTema'} className='text'>
                            <Box mx={1} className="cursor">
                                <Typography variant="h6" color="inherit">
                                    cadastrar tema
                                </Typography>
                            </Box>
                        </Link>

                        <Link to={'/login'} className='text'>
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
    }
        return (
            <>
                {navbarComponent}
            </>
        )
    }

    export default Navbar;
