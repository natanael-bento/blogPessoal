import React, { ChangeEvent, useEffect, useState } from 'react'
import './Login.css'
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import UserLogin from '../../models/UserLogin';
import { login } from '../../services/Service'
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/actions';
import {toast} from 'react-toastify';


function Login() {

    const history = useNavigate();

    const dispatch = useDispatch();

    const [token, setToken] = useState('');

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        token: ''
    })

   /* const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
        id: 0,
        nome: "",
        usuario: "",
        foto: "",
        senha: "",
        token: "",
      });*/

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }
    /*
    useEffect(() => {
        if (token !== '') {
            history('/home')
        }
    }, [token]);*/
    
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/usuarios/logar`, userLogin, setToken)
            toast.success("Você logou com sucesso \(*-*)/", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });

        } catch (error) {
            console.log(error);
            toast.error("Usuário ou senha incorretos! (-_-)", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
           
        }
    }

    useEffect(() => {
        if(token !== "") {
          dispatch(addToken(token))
         // dispatch(addId(respUserLogin.id.toString()))
          history('/home')
        }
      }, [token]) 

    return (
        <>
            <Grid container direction='row' justifyContent='center' alignItems='center' className='fundoLogin'>
                <Grid alignItems='center' xs={6}>
                    <Box paddingX={20}>

                        <form onSubmit={onSubmit}>
                            <Typography variant='h3' gutterBottom color='textPrimary' component='h3'
                                align='center' className="textoLogin">
                                Entrar
                            </Typography>

                            <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updatedModel(e)} id='usuario' label='Usuário' variant='outlined'
                                name='usuario' margin='normal' fullWidth />

                            <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha'
                                margin='normal' type='password' fullWidth />

                            <Box marginTop={2} textAlign='center'>
                                <Button type='submit' variant='contained' color='primary'>
                                    Logar
                                </Button>
                            </Box>

                        </form>
                        <Box display='flex' justifyContent='center' marginTop={2}>
                            <Box marginRight={1}>
                                <Typography variant='subtitle1' gutterBottom align='center'>
                                    Ainda não tem uma conta?
                                </Typography>
                            </Box>
                            <Link to= {'/cadastrousuario'}>
                                <Typography variant='subtitle1' gutterBottom align='center' className="textoLogin">
                                    Cadastre-se
                                </Typography>
                            </Link>

                        </Box>
                    </Box>
                </Grid>

                <Grid xs={6} className='imagemLogin'>

                </Grid>
            </Grid>
        </>
    )
}

export default Login