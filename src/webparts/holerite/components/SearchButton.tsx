import * as React from 'react';
import { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, TextField, Grid, Paper, ButtonGroup, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
    },
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export interface SearchButtonProps {
  state: HoleriteState;
  setMonthCode: React.Dispatch<React.SetStateAction<string>>;
  setLoadPage: () => void;
  getHolerite: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ state, setMonthCode, setLoadPage, getHolerite }: SearchButtonProps) => {
  const classes = useStyles();
  const [code, setCode] = useState('');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
    setMonthCode(event.target.value);
  };

  const onSubmit = (): void => {
    getHolerite();
  };

  const handleKeyPress = (event): void => {
    if(event.key === 'Enter'){
      onSubmit();
    }
  };

  /**
   * Get unformated data (yyyymm) and retuns it on mm/yyyy format
   * @param data String
   * @returns String
   */
  const dataFormat = (data: string): string => {
    return data.toString().slice(4) + '/' + data.toString().slice(0,4);
  };

  /**
   * From state.holerites, render the menu items
   * @returns Array of JSX Element
   */
  const renderMenuItems = () => {
    const itemsToRender = [];

    for(let i = 0; i < state.holerites.length; i++){
      const item = state.holerites[i];
      itemsToRender.push(
        <MenuItem value={item.CODIGO}>{dataFormat(item.IPERI)}</MenuItem>
      );
    }
    return itemsToRender;
  };

  return(
    <Grid item xs={12} onKeyPress={handleKeyPress}>
      <Paper className={classes.paper} >
        <ButtonGroup variant="contained" style={{justifyContent: 'center'}}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-label-data">Data</InputLabel>
            <Select
              labelId="select-label-data"
              id="select-label-data"
              value={code}
              onChange={handleCodeChange}
              label="Data">
              {renderMenuItems()}
            </Select>
          </FormControl>

          <Tooltip title="Pesquisar">
            <Button variant="contained" color="primary" onClick={onSubmit} >
              {state.isLoading &&
                <AutorenewIcon />
              }
              {!state.isLoading &&
                <SearchIcon />
              }
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Paper>
    </Grid>
  );
};

export default SearchButton;
