import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, Grid, Paper, Typography } from '@material-ui/core';
import HoleriteForm from './HoleriteDisplayParts/HoleriteForm';
import FileViewer from './HoleriteDisplayParts/FileViewer';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
    noMarginPadding: {
      margin: 0,
      padding: 0
    },
    fontBold: {
      fontWeight: 'bold'
    },
    textMargin: {
      padding: 5
    },
    displayContentContainer: {
      margin: 0,
      padding: 15,
    },
    border: {
      padding: 2,
      border: '1px solid black',
    },
    paper: {
      padding: theme.spacing(1),
    },
    cardRoot: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }),
);

interface HoleriteDisplayProps {

}

const HoleriteDisplay: React.FC<HoleriteDisplayProps> = (props) => {
  const classes = useStyles();

  return(
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.noMarginPadding}>
          <Typography variant="subtitle1" align="center" className={classes.fontBold}>EMPRESA CAPITALISTA DE EXPLORAÇÃO DO TRAABALHO</Typography>
          <Typography variant="subtitle1" align="center" className={classes.fontBold}>CNPJ: 66.666.666/0001-66</Typography>
          <Typography variant="body1" align="center" gutterBottom style={{ marginTop: 20 }} className={classes.fontBold}>
            Demonstrativo de Pagamento
          </Typography>
        </Grid>
      </Grid>
      <HoleriteForm />
      <FileViewer />
    </>
    );
}

export default HoleriteDisplay;
