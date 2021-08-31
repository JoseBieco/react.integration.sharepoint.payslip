import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { Error } from '../HoleriteProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 10,
    },
    paper: {
      padding: theme.spacing(1),
      border: '1px solid #ff0000b8',
      cursor: 'default'
    },
  }),
);

interface ErrorDisplayProps {
  errors: Array<Error>;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errors }: ErrorDisplayProps) => {
  const classes = useStyles();

  /**
   * Load errors from state.error
   * @returns Array os JSX Element
   */
  const loadErrors = ():  JSX.Element[] => {
    const errorsToLoad: JSX.Element[] = [];

    for(let i = 0; i < errors.length; i++){
      errorsToLoad.push(
        <Typography variant="h6" align="center" style={{ color: '#ff0000' }}>{errors[i].message}</Typography>
      );
    }
    return errorsToLoad;
  };

  return(
    <Grid container justifyContent="center" spacing={2} className={classes.root}>
      <Grid item>
        <Paper className={classes.paper} variant="elevation">
          {loadErrors()}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ErrorDisplay;
