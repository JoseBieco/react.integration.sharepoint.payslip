import * as React from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { HoleriteWebPartProps } from '../HoleriteWebPart';
import { useState, KeyboardEvent } from 'react';
import { HoleriteState, HOLERITE_INITIAL_STATE } from './HoleriteProps';
import { Grid } from '@material-ui/core';
import SearchButton from './SearchButton';
import HoleriteDisplay from './HoleriteDisplay';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

  }),
);

const Holerite: React.FC<HoleriteWebPartProps> = ({description}, HoleriteWebPartProps) => {
  const classes = useStyles();
  const [state, setState] = useState<HoleriteState>(HOLERITE_INITIAL_STATE);

  return(
    <div className={classes.root}>
       <Grid container spacing={3}>
         <SearchButton state={state} setState={setState} />
        <Grid item xs={12}>
          <HoleriteDisplay />
        </Grid>
      </Grid>
    </div>
  )
}
export default Holerite;
