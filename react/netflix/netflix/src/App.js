import React from 'react';
import reportWebVitals from './reportWebVitals';
import Cards from './Cards';
import sdata from './seriesdata';
import './App.css';

function ncard(val,index){
  return(
  <Cards heading={val.heading} desc={val.desc} imgsrc={val.imgsrc} link={val.link}/>
  );
}
function App(){
return(
  <>
  <React.StrictMode>
    <h1 className='pagehead'>List of Top 5 Netflix Shows</h1>
    {sdata.map(ncard)};
    
  </React.StrictMode>
  </>
);
}

export default App;
