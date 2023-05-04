import React, { useEffect, useState } from 'react'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import './deletarTema.css';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { getById, deleteId } from '../../../services/Service';
import Tema from '../../../models/Tema';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';

function DeletarTema() {

  const history = useNavigate();
  const { id } = useParams<{id: string}>();

  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )
  const [tema, setTema] = useState<Tema>()

  useEffect(() => {
      if (token == "") {
        toast.error("qual foi? tu nem logou ainda!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined,
      });
          history("/login")
  
      }
  }, [token])

  useEffect(() =>{
      if(id !== undefined){
          findById(id)
      }
  }, [id])

  async function findById(id: string) {
      getById(`/temas/${id}`, setTema, {
          headers: {
            'Authorization': token
          }
        })
      }

      function sim() {
        history('/temas')
          deleteId(`/temas/${id}`, {
            headers: {
              'Authorization': token
            }
          });
          toast.success("Tema deletado com sucesso(tadinho do tema)", {
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
      
        function nao() {
          history('/temas')
        }
     
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Tema:
              </Typography>
              <Typography color="textSecondary">
                {tema?.descricao}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarTema;