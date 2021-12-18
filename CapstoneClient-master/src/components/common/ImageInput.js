// 이미지 넣는친구
import React, { useState, useEffect } from 'react'


import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, ButtonBase, Avatar,
} from '@material-ui/core'
import { Cancel, PhotoCamera } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    hide: {
        display: 'none',
    },
    previewImage: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    previewCancel: {
        border: "1px solid white",
        backgroundColor: "white",
        borderRadius: "50%",
        position: "absolute",
        top: '1px',
        right: '1px',
    },
}));

const ImageInput = ({name = "photo", images, setImages, maxInput = 3}) => {
    const classes = useStyles();

    const handleImageInput = (event) => {
        if(images.length < maxInput){
          if(event.target.files[0] !== undefined){
            // console.log(event.target.files[0].size)
            setImages([...images, event.target.files[0]]);
            event.target.value = '' //파일입력 input에서 onChange는 value 값이 달라졌을때만 발동되므로, 연속으로 같은 파일을 올릴경우 onChange가 발동하지 않는다 이는 value 를 초기화하는방법으로 해결할수있다.
          }
        }
      }
      const removeImage = (index) => {
        const newList = [...images];
        newList.splice(index, 1);
        setImages(newList);
      }
      
    return(
        <Grid container>
        {images.map((image, index) => {
            return(
            <React.Fragment>
                <ButtonBase variant="rounded">
                <Avatar src={URL.createObjectURL(image)} 
                    variant="rounded"
                    className={classes.previewImage}
                />
                </ButtonBase>
                <ButtonBase onClick={() => removeImage(index)}>
                <Cancel className={classes.previewCancel}/>
                </ButtonBase>
            </React.Fragment>
            )
        })}
        <input 
            accpet="image/*"
            className={classes.hide}
            id={name}
            multiple
            type="file"
            onChange={(event) => handleImageInput(event)}
        />
        <label htmlFor={name}>
        <Avatar variant="rounded" className={clsx({
            [classes.previewImage]: true,
            [classes.hide]: images.length >= maxInput
        })}>
            <PhotoCamera />
        </Avatar>
        </label>
    </Grid>
    )
}

ImageInput.propTypes = {
    //pathname: PropTypes.string,
    //search: PropTypes.string,
    //hash: PropTypes.string,
}

export default ImageInput
