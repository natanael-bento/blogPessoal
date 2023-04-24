import React, { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/estaticos/navbar/Navbar';
import Home from './paginas/home/Home';
import Footer from './components/estaticos/footer/Footer';
import Login from './paginas/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import ListaTema from './components/temas/listaTema/ListaTema';
import ListaPostagem from './components/postagens/listaPostagem/ListaPostagem';
import CadastroPostagem from './components/postagens/cadastroPostagem/CadastroPostagem';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import DeletarTema from './components/temas/deletarTema/deletarTema';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cadastrousuario' element={<CadastroUsuario />} />
          <Route path='/temas' element={<ListaTema />} />
          <Route path='/postagens' element={<ListaPostagem />} />
          <Route path='/formularioPostagem' element={<CadastroPostagem />} />
          <Route path='/formularioPostagem/:id' element={<CadastroPostagem />} />
          <Route path='/formularioTema' element={<CadastroTema />} />
          <Route path='/formularioTema/:id' element={<CadastroTema />} />
          <Route path='/deletarPostagem/:id' element={<DeletarPostagem />} />
          <Route path='/deletarTema/:id' element={<DeletarTema />} />

        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App