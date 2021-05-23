import React, { Fragment } from 'react';
import NotFoundImage from  "./error404image.jpg"
const NotFound =  ()=>{

    return (
        <Fragment>

            <img src={NotFoundImage} height='100%' alt='Error 404: Page not found' />
            <div style={{"fontSize":'12px'}}><a href='https://www.freepik.com/vectors/business'>Business vector created by pikisuperstar - www.freepik.com</a></div>
        </Fragment>
    )
}

export default NotFound;
