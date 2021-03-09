import React from 'react'
import { Button, Card, CardActions, CardContent, Grid } from '@material-ui/core'
import { ImageWrap, useStyles } from './style';
import { Paths } from 'modules/app/components/routes/types';
import history from 'modules/app/components/history';
import { getFullName } from 'shared/helpers/globalFunction';
import { apiBaseUrl } from 'services/global-constant';

interface Props {
    list: any[]
}

const PropertyCards = (props: Props) => {
    const classes = useStyles();
    const { list } = props

    const handleDetails = (id: any) => {
        history.push(`${Paths.propertyDetails}/${id}`)
    }

    const getImg = (imgData: any) => {
        const imgArr: any = []
        for (const item of imgData) {
            if (item.type === 0) {
                imgArr.push(item)
            }
        }
        const imgUrl = `${apiBaseUrl}/${imgArr[0].filename}`
        return imgUrl
    }

    return (
        <div className={classes.wrapper}>
            {list?.map(p => {
                let docs = p.getDoc!
                let name = getFullName(p.Fname, p.Lname)
                let id = p.id
                if (p.PropertyDetails) {
                    const details = p.PropertyDetails
                    docs = details.getDoc
                    name = getFullName(details.Fname, details.Lname)
                    id = details.id
                }
                return <Card className={classes.root}>
                    <CardContent className={classes.content}>
                        <ImageWrap>
                            <img src={getImg(docs)} alt="photo" />
                        </ImageWrap>
                        <div className={classes.infoWrap}>
                            <span className={classes.title}>{name}</span>
                            <span className={classes.info}>{id}</span>
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