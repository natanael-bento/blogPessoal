import React from "react";
import { Typography, Grid, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import './Home.css';
import TabPostagem from "../../components/postagens/tabPostagem/TabPostagem";
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';
import { useNavigate, Link } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { useEffect } from 'react';


function Home() {

  const history = useNavigate();
  const [token, setToken] = useLocalStorage('token');

  useEffect(() => {
    if (token == "") {
      alert("Você precisar está logado!");
      history("/login")
    }
  }, [token])

  return (
    <>
      <Grid container direction="row" justifyContent="center" alignItems="center" className="caixa">

        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20}  >
            <Typography
              variant="h3" gutterBottom color="textPrimary" component="p" align="center" className="titulo">
              Seja bem vinde!
            </Typography>
            <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center"
              className="titulo" >
              Que ideias e pensamentos gostaria de compartilhar hoje?
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
      
             <Link to={"/postagens"}>
          
                <Button variant="outlined" className="botao"> Ver Postagens </Button>
            </Link>
            <ModalPostagem />
         </Box> 
        </Grid>
        <Grid item xs={6} className='fotoHome'>
        </Grid>
        <Grid xs={12} className="postagens">
          <div> <TabPostagem /> </div>
         
        </Grid>
      </Grid>
    </>
  );
}

export default Home;