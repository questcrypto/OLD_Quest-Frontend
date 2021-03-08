import React from 'react'
import { Button, Card, CardActions, CardContent, Grid } from '@material-ui/core'
import { useStyles } from './style';
import { Paths } from 'modules/app/components/routes/types';
import history from 'modules/app/components/history';
import { getFullName } from 'shared/helpers/globalFunction';

interface Props {
    list: any[]
}

const PropertyCards = (props: Props) => {
    const classes = useStyles();
    const { list } = props

    const handleDetails = (id: any) => {
        history.push(`${Paths.propertyDetails}/${id}`)
    }
    console.log('l: ', list);

    return (
        <div className={classes.wrapper}>
            {list?.map(p => {
                return <Card className={classes.root}>
                    <CardContent className={classes.content}>
                        <img src={'p.photo'} alt="photo" />
                        <div className={classes.infoWrap}>
                            <span className={classes.title}>{getFullName(p.Fname, p.Lname)}</span>
                            <span className={classes.info}>{'p.info'}</span>
                        </div>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button onClick={() => handleDetails(p.id)} className={classes.addPropertyBtnStyle}>
                            Property Details
                        </Button>
                    </CardActions>
                </Card>
            })}
        </div>
    )
}

export default PropertyCards