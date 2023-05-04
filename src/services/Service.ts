import axios from "axios";

export const api = axios.create({
 baseURL:'https://blogpessoal-j0tk.onrender.com'


})

export const login = async(url: string, dados: object, setDado: any) => {
    const resposta = await api.post(url, dados)
    setDado(resposta.data.token)
}

export const cadastroUsuario = async(url: string, dados: object, setDado: any) => {
    const resposta = await api.post(url,dados)
    setDado(resposta.data)
}

// a tipagem correta do headers é object pq nele podem ter vários dados
export const getAll = async(url: any, setDado: any, headers: any) => {
    const resposta = await api.get(url, headers)
    setDado(resposta.data)
}

export const getById = async(url: any, setDados: any, headers: any) => {
    const resposta = await api.get(url, headers)
    setDados(resposta.data)
}

export const post = async(url: any, dados: any, setDados: any, headers: any) => {
    const resposta = await api.post(url, dados, headers)
    console.log(resposta)
    setDados(resposta.data)
}

export const postagemPost = async (url: any, dados: any, setDados: any, headers: any) => {
    const resp = await api.post(url, dados, headers)
    console.log(resp)
    setDados(resp.data)
}

export const put = async(url: any, dados: object, setDados: any, headers: any) => {
    const resposta = await api.put(url, dados, headers)
    setDados(resposta.data)
}

export const deleteId = async(url: any, headers: any) => {
    await api.delete(url, headers)
}

