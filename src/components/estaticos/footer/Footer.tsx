import React from "react";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import './Footer.css';


function Footer() {
    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Box display={'flex'} alignItems="center" className="box2" width={'100%'} justifyContent={'space-around'}>
                    <Box className="box1">
                        <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center" >
                            <Typography variant="h5" align="center" gutterBottom className="textos">
                                Siga-nos nas redes sociais{' '}
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" justifyContent="center">
                            <a href="https://github.com/natanael-bento" target="_blank">
                                <GitHubIcon className="redes" />
                            </a>

                            <a href="https://www.linkedin.com/in/natanael-da-silva-bento-dev/" target="_blank">
                                <LinkedInIcon className="redes" />
                            </a>
                        </Box>
                    </Box>
                    <Box className="box2" >
                        <Box paddingTop={1}>
                            <Typography
                                variant="h5" align="center" gutterBottom className="textos" component={'span'}>
                                © 2023 Copyright: {' '}
                            </Typography>

                            <a target="_blank" href="https://brasil.generation.org">
                                <Typography
                                    variant="h5" gutterBottom className="textos" align="center" component={'span'} >
                                    brasil.generation.org
                                </Typography>
                            </a>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </>
    );
}

export default Footer;