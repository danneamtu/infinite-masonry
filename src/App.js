import React, {useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroller';             
import Masonry from 'react-masonry-css';

import API from './API'; 
import Image from './Image'; 

let pageNum = 1;
function App() { 
  const [imageArray, setImageArray] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = pageNumber => {
    API.get('/', {params: {page:pageNumber}})
      .then(res=>{
        setImageArray([...imageArray, ...res.data.hits])
        setTotalPages([res.data.totalHits / res.data.hits.length])
      })
      .catch(err=> {throw new Error('Error while reading the data')})
  }

  useEffect(()=>{
    fetchImages(pageNum);
  }, [])

  const breakpoints = {
    default: 5,
    1200: 4,
    992: 3,
    768: 2,
    576: 1
  }

  return ( 
    <div className="App">
      <InfiniteScroll pageStart={0} loadMore={()=>{ fetchImages(++pageNum)} } hasMore={pageNum < totalPages ? true : false}>
        <Masonry className='masonry-grid' columnClassName='masonry-grid_column' breakpointCols={breakpoints} >
          {
            imageArray.map((image)=>(<Image key={image.id} {...image} />))
          }
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}

export default App;
