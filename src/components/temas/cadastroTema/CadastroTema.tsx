import { Container, Typography, TextField, Button } from "@material-ui/core"
import './CadastroTema.css'
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { ChangeEvent, useEffect, useState } from "react";
import Tema from "../../../models/Tema";
import { post, put } from "../../../services/Service";
import { buscaId} from '../../../services/Service';


function CadastroTema() {
    const history = useNavigate();
    const {id} = useParams<{id:string}>();
    const [token, setToken]= useLocalStorage('token');
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao:''
    })

    useEffect(() => {
        if(token == ""){
            alert("Você precisar está logado!");
            history("/login");
        }
    }, [token]);

    useEffect(() => {
        if(id !== undefined){
            findById(id);
        }
    }, [id]);

    async function findById(id: string){
        buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization' : token
            }
        })
    }

    function updatedTema(e: ChangeEvent<HTMLInputElement>){
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("tema " + JSON.stringify(tema))

        if (id !== undefined) {
            console.log(tema)
            put(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema atualizado com sucesso');
        } else {
            post(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema cadastrado com sucesso');
        }
        back()
    }

    function back() {
        history('/temas')
    }
    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography  variant="h3" color="textSecondary" component="h1" align="center" >
                    Cadastrar Tema
                </Typography>

                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           updatedTema(e)} id="descricao" label="Descrição" variant="outlined"
                           name="descricao" margin="normal" fullWidth />

                <Button type="submit" variant="contained" color="primary">
                    Enviar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;