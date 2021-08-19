import * as React from 'react';
import { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, TextField, Grid, Paper, ButtonGroup } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { HoleriteState } from './HoleriteProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    holerite: {
      justifyContent: 'cenetr',
    }
  }),
);

export interface SearchButtonProps {
  state: HoleriteState;
  setState: React.Dispatch<React.SetStateAction<HoleriteState>>;
}

const SearchButton: React.FC<SearchButtonProps> = ({ state, setState }, SearchButtonProps) => {
  const classes = useStyles();
  const [code, setCode] = useState('');
  const [validCode, setValidCode] = useState(true);
  const [loadingData, setLoadingData] = useState(false);

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleKeyPress = (event): void => {
    console.log(event.key)
    if(event.key === 'Enter'){
      validateEntry();
    }
  }

  const validateEntry = (): void => {
    let regex: RegExp = /[^\d^a-z^A-Z]/g;

    let validatedCode: string = code.replace(regex, '');

    if(!validatedCode || validatedCode.length !== code.length){
      setValidCode(false);
    }else {
      setValidCode(true);
      setLoadingData(true);
    }
  }

  const onSubmit = (): void => {
    validateEntry();

    if(validCode){
      setState({employee_code: code});
      setCode('');
    }
  }

  return(
    <Grid item xs={12} onKeyPress={handleKeyPress}>
      <Paper className={classes.paper} >
        <ButtonGroup variant="contained" style={{justifyContent: 'center'}}>
          {validCode &&
          <>
            <TextField
              id="employee"
              label="Código"
              variant="outlined"
              value={code}
              onChange={handleCodeChange}
            />

            <Button variant="contained" color="primary" onClick={onSubmit} >
              {loadingData &&
                <AutorenewIcon />
              }
              {!loadingData &&
                <SearchIcon />
              }
            </Button>
          </>
          }
          {!validCode &&
          <>
            <TextField
              error
              id="employee"
              label="Erro Código"
              variant="outlined"
              value={code}
              onChange={handleCodeChange}
            />
            <Button variant="contained" color="secondary" onClick={onSubmit} >
              <SearchIcon />
            </Button>
          </>
          }
        </ButtonGroup>
      </Paper>
    </Grid>
  );
}

export default SearchButton;
