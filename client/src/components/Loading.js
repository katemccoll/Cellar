import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        placeContent: 'center',
        marginTop: '50px',
        '& > * + *': {
            marginLeft: theme.spacing(2),

        },
    },
}));

export default function Loading() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress
                color="secondary"
                size={80}
            />
        </div>
    );
}