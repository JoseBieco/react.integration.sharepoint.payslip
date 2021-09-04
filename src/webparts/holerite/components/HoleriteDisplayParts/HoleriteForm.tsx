import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
    fontBold: {
      fontWeight: 'bold'
    },
    textMargin: {
      padding: 5
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
);

interface HoleriteFormProps {

}

const HoleriteForm: React.FC<HoleriteFormProps> = () => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <Grid container>
        <Grid item xs>
          <Paper className={classes.paper} variant="outlined">
            <Typography variant="inherit" className={classes.fontBold}>Func.:</Typography>
            <Typography variant="inherit" className={classes.textMargin}>TRABALHADOR</Typography>
          </Paper>
        </Grid>
        <Grid item xs >
          <Paper className={classes.paper} variant="outlined">
            <Typography variant="inherit" className={classes.fontBold}>Período:</Typography>
            <Typography variant="inherit" className={classes.textMargin}>05/2017</Typography>
          </Paper>
        </Grid>
        <Grid container>
          <Grid item xs>
            <Paper className={classes.paper} variant="outlined">
              <Typography variant="inherit" className={classes.fontBold}>Cargo:</Typography>
              <Typography variant="inherit" className={classes.textMargin}>Desenvolvedor</Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper} variant="outlined">
              <Typography variant="inherit" className={classes.fontBold}>Matrícula:</Typography>
              <Typography variant="inherit" className={classes.textMargin}>255.255.255.0</Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper} variant="outlined">
              <Typography variant="inherit" className={classes.fontBold}>CTPS:</Typography>
              <Typography variant="inherit" className={classes.textMargin}>255.255.255.0</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs >
            <Paper className={classes.paper} variant="outlined">
              <Typography variant="inherit" className={classes.fontBold}>Depto.:</Typography>
              <Typography variant="inherit" className={classes.textMargin}>255.255.255.0</Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper} variant="outlined">
              <Typography variant="inherit" className={classes.fontBold}>Admissão:</Typography>
              <Typography variant="inherit" className={classes.textMargin}>01/01/2013</Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper} variant="outlined">
              <Typography variant="inherit" className={classes.fontBold}>CPF:</Typography>
              <Typography variant="inherit" className={classes.textMargin}>11111111111</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default HoleriteForm;
