import logo from './logo.svg';
import './App.css';
import {add,sub} from './calc';
import * as headings from './Heading';

function App() {
  return[ 
  <headings.default/>,<h2 className='uma'>{headings.heading1()}</h2>,<h2 className='uma'>{headings.heading2()}</h2>,<p style={{color:'red',textAlign:'center'}}>How you doin?</p>, <ul>
  <li>{add(5,5)}</li>
  <li>{sub(10,5)}</li>
</ul>
]
}

export default App;
