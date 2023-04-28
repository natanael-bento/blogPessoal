import React, { ChangeEvent, useEffect, useState } from "react";
import { Typography, TextField, Button, Select, InputLabel,
       MenuItem, FormControl, FormHelperText } from "@material-ui/core";
import "./CadastroPostagem.css";
import { useNavigate, useParams } from "react-router-dom";
import  Tema  from "../../../models/Tema"
import { Grid } from "@material-ui/core";
import Postagem from "../../../models/Postagem";
import { getAll, getById, post, postagemPost, put } from "../../../services/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import {toast} from 'react-toastify';

function CadastroPostagem() {
  
  const history = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [temas, setTemas] = useState<Tema[]>([]);
  
  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

  useEffect(() => {
    if (token == "") {
      toast.error("Você precisar está logado!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
    });
      history("/login");
    }
  }, [token]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: "",
  });
  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: "",
    texto: "",
    temas: null,
    data: ''
  });

  useEffect(() => {
    setPostagem({
      ...postagem,
      temas: tema,
    });
  }, [tema]);

  useEffect(() => {
    getAllTemas();
    if (id !== undefined) {
      findByIdPostagem(id);
    }
  }, [id]);

  async function getAllTemas() {
    await getAll("/temas", setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function findByIdPostagem(id: string) {
    await getById(`postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      temas: tema,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
     await put('/postagens', postagem, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
      toast.success("postagem atualizadissimaaa!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
    });

    } else {
      console.log({postagem})
      try {
        await postagemPost('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("postagem cadastrada com sucessooo!", {
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
        console.log(error)
      }
     
    }
    back();
  }

  function back() {
    history("/postagens");
  }

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      style={{padding:'2vw'}}
      sm={12}
    >
        <form onSubmit={onSubmit}>
          <Typography variant="h3" component="h1" align="center">
            Formulário de cadastro postagem
          </Typography>
          <TextField
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
            id="titulo"
            label="titulo"
            variant="outlined"
            name="titulo"
            margin="normal"
            fullWidth
            style={{marginTop:'2vw'}}
          />
          <TextField
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
            id="texto"
            label="texto"
            name="texto"
            variant="outlined"
            margin="normal"
            fullWidth
          />

          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={(e) =>
                getById(`/temas/${e.target.value}`, setTema, {
                  headers: {
                    Authorization: token,
                  },
                })
              }
            >
              {temas.map((tema) => (
                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Escolha um tema para a postagem</FormHelperText>
            <Button
              className="button-finalizar"
              type="submit"
              variant="contained"
              color="primary"
            >
              Finalizar
            </Button>
          </FormControl>
        </form>
    </Grid>
  );
}
export default CadastroPostagem;