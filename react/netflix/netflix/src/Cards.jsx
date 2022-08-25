import React from 'react';
import ReactDOM from 'react-dom/client';
import addClass from './addclass';
function Cards(props){
    
    return[
        <>
        <div style={{display: 'flex',
alignItems: 'center',
justifyContent: 'center'}}>
        <div className="card">
        <h2>{props.heading}</h2>

        <img src={props.imgsrc} alt="Avatar" style={{width: '300px'}}/>
        
          <h4><b>{props.desc}</b></h4>
          <span onClick={addClass} className='addtofavs'>*</span>
          <a style={{textDecoration:'none'}} href={props.link}><span className='watchnow'>Watch Now</span></a>
      </div>
      </div>
</>

    ];
}
export default Cards;
