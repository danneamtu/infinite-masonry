import React from  'react';

const Image = (props) =>{
    const { tags, webformatURL } = props;
    return(
        <img src={webformatURL} alt={tags} />
    )
}
 
export default Image;