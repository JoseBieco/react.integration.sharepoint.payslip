import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import FileViewer from './HoleriteDisplayParts/FileViewer';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1),
      height: 500,
    },
    noMarginPadding: {
      margin: 0,
      padding: 0
    },
  }),
);

interface HoleriteDisplayProps {
  file: string;
  payslip_name: string;
}

const HoleriteDisplay: React.FC<HoleriteDisplayProps> = ({ file, payslip_name }: HoleriteDisplayProps) => {
  const classes = useStyles();

  return(
    <Grid container className={classes.root} justifyContent="center">
      <Grid item className={classes.noMarginPadding}>
        <FileViewer file={file} payslip_name={payslip_name}/>
      </Grid>
    </Grid>
    );
};

export default HoleriteDisplay;
