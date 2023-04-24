import React, { ChangeEvent, useEffect, useState } from 'react'
import './Login.css'
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage';
import UserLogin from '../../models/UserLogin';
import { login } from '../../services/Service'


function Login() {
    const history = useNavigate();

    const [token, setToken] = useLocalStorage('token');

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        token: ''
    });

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        });
    }
    useEffect(() => {
        if (token !== '') {
            history('/home')
        }
    }, [token]);

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/usuarios/logar`, userLogin, setToken)
            alert('Você logou com sucesso :)');

        } catch (error) {
            console.log(error);
            alert('Usuário ou senha incorretos! (-_-)');
        }
    }


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
                            <Link to='/cadastrousuario'>
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