# infinite-masonry
### Learn how to create a React Masonry Layout with Infinite Scroll using Pixabay API

#### 1. Create react app
npx create-react-app ./
yarn start

#### 2. Install packages
```JS
npm i react-infinite-scroller react-masonry-css axios
```
#### 3. Pixabay API Key
1. Login or register to pixabay.com, after that you will find your API Key on the Documentation page https://pixabay.com/api/docs/
2. On your local machine, in the root folder create a .env file and add your API KEY

#### 4. Create AXIOS API
1. create API.js page 
2. import and setup the axios API
```JS
import axios from  'axios';

const API = axios.create({
    baseURL: 'https://pixabay.com/api/',
    header:{
       Accept: 'application/json',
       'Content-type': 'application/json' 
    },
    params: {
        key: process.env.PIXABAY_API_KEY,
        safesearch: true,
    },
})

export default API;
```

#### 5. Create image.js (functional component)
Include img structure

#### 6. Update App.js file
Update the App.js file
```JS
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
```

#### 7. Add CSS styles
```CSS
body {
  margin: 30px 60px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.masonry-grid {
  display: -webkit-box; /* Not needed if autoprefixing */
  display: -ms-flexbox; /* Not needed if autoprefixing */
  display: flex;
  margin-left: -15px; /* gutter size offset */
  width: auto;
}
.masonry-grid_column {
  padding-left: 15px; /* gutter size */
  background-clip: padding-box;
}
.masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
  background: grey;
}
.masonry-grid_column img {
  max-width: 100%;
  margin-bottom: 15px;
}
```

#### Done
This is the basic functionality implemented with React Masonry with Infinite Scroller. Enjoy!