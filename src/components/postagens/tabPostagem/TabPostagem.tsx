import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listaPostagem/ListaPostagem';
import './TabPostagem.css';


function TabPostagem() {

    const [value, setValue] = useState('1')

    function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
        setValue(newValue);
    }
    return (
        <>
            <TabContext value={value}>
                <AppBar position="static">
                    <Tabs centered indicatorColor="secondary" onChange={handleChange}>
                        <Tab label="Todas as postagens" value="1" />
                        <Tab label="Sobre-nós" value="2" />
                    </Tabs>
                </AppBar>

                <TabPanel value="1" >
                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                        <ListaPostagem />
                    </Box>
                </TabPanel>

                <TabPanel value="2">
                    <Typography variant="h5" gutterBottom color="textPrimary" component="h5"
                               align="center" className="titulo">
                                  Sobre-nós
                    </Typography>

                    <Typography variant="body1" gutterBottom color="textPrimary" align="justify">
                        Rede social com foco no publico Geeky, Nerd e Otaku/Otome. Uma rede 
                        desenvolvida para que cada pessoa encontra seu grupo e possa
                        compartilhar o que gosta! É um prazer imenso ter você aqui no 
                        Geeky Critters... Agora vá se divertir, criatura! :)
                    </Typography>
                    
                </TabPanel>
            </TabContext>
        </>
    );
}
export default TabPostagem;