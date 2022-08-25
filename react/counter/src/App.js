import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';

function App() {


var [count,setCount]=useState(0);
var [fullName,updateName]=useState(count);

function incnum(){
  setCount(++count);
  console.log('clicked');
}
function updateName(){
  console.log('typed');
}

  return (
    <div className="App">
      <header className="App-header">
        <div>
        <h1>Hii {fullName}</h1>
          <input type="text" placeholder='Enter Your Name' value={count} onChange={updateName}></input>
        </div>
        <button style={{cursor:'pointer'}} onClick={incnum}>Show</button>
      </header>
    </div>
  );
}

export default App;
