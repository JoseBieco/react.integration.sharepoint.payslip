import * as React from 'react';
import { Game } from './HoleriteProps';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface IModalState {
    isOpen: boolean;
}

const Modal: React.FC<IModalState> = (props) => {
    const classes = useStyles();
    const [num, setNum] = useState(0);

    const changeNumber = ():void => {
        setNum(num+1);
    }

    return(
       <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {num}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"  color="secondary" variant="contained" onClick={changeNumber}>Change</Button>
            </CardActions>
        </Card>
    );
}

export default Modal;