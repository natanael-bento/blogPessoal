import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import './CadastroUsuario.css';
import {toast} from 'react-toastify';



function CadastroUsuario() {

    const history = useNavigate();

    const [user, setUser] = useState<User>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    });
    const [userResult, setUserResult] = useState<User>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    });

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    };


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (confirmarSenha === user.senha && user.senha.length >= 8 ) {
            try {
                await cadastroUsuario('/usuarios/cadastrar', user, setUserResult);
                toast.success("Usuario cadastrado com sucesso \(*-*)/", {
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
                toast.error("Voçê digitou algum campo errado, presta atenção!", {
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

        } else {
            toast.error("As senhas são diferentes! (-_-)", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });

            setConfirmarSenha('');

            setUser({ ...user, senha: '' });


        }
    }
    useEffect(() => {
        if (userResult.id !== 0) {
            history("/login");
        }
    }, [userResult]);

    function back() {
        history("/login");
    }

    return (
        <>
            <Grid container direction='row' justifyContent='center' alignItems='center'>
                <Grid item xs={6} className='imagemCadastro'></Grid>
                <Grid item xs={6} alignItems='center'>
                    <Box paddingX={10}>
                        <form onSubmit={onSubmit}>
                            <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center'
                                className="textosCadastro">
                                Cadastre-se
                            </Typography>

                            <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updatedModel(e)} id='nome' label='Nome' variant='outlined' name='nome'
                                margin='normal' fullWidth />

                            <TextField value={user.usuario} onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                updatedModel(event)} id='usuario' label='e-mail' variant='outlined'
                                name='usuario' margin='normal' fullWidth />

                            <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha'
                                margin='normal' type='password' fullWidth />

                            <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                confirmarSenhaHandle(e)} id='confirmarSenha' label='ConfirmarSenha'
                                variant='outlined' name='confirmarSenha' margin='normal' type='password'
                                fullWidth />


                            <Box marginTop={2} textAlign='center'>

                                <Link to='/login' className='text'>
                                    <Button variant='contained' color='secondary' className='btnCancelar'>
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type='submit' variant='contained' color='primary'>
                                    Cadastrar
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </>
    )

}

export default CadastroUsuario;
