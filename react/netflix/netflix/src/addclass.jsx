import React from 'react';
import ReactDOM from 'react-dom/client';

function addClass(event){
    event.currentTarget.classList.toggle('favorite');
    console.log(event.currentTarget.parentNode.firstChild.textContent);
    localStorage.setItem('favorite',event.currentTarget.parentNode.firstChild.textContent);
    
}
export default addClass;