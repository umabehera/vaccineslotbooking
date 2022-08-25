import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function register(e){
  e.preventDefault();
  console.log('working');
  var phno =document.querySelector('.phno').value;
  var username =document.querySelector('.username').value;
  var emailadd =document.querySelector('.emailadd').value;
  var pwc =document.querySelector('.pwc').value;
  var pw =document.querySelector('.pw').value;
  if(JSON.parse(localStorage.getItem(username)) == null){
    if(emailadd == '')
  document.querySelector('.registererror').innerHTML='<p>PLease Enter an email address</p>';
    else if(phno == '')
    document.querySelector('.registererror').innerHTML='<p>PLease Enter a Phone Number</p>';
    else if(pwc !== pw)
    document.querySelector('.registererror').innerHTML='<p>Password Confirmation Does not match</p>';
    else{


  // console.log(phno,username,emailadd,pwc,pw);
    var user=[];
    user.push(username,emailadd,pwc,pw,phno);
    console.log(user);
    localStorage.setItem(username,JSON.stringify(user));
    document.querySelector('.loginerror').innerHTML='<p>Succesfully Registered</p>';
    document.querySelector('.close').click();
    }
}
  else
  document.querySelector('.registererror').innerHTML='<p>User already exist,Please Login</p>';



}
function login(e) {
  e.preventDefault();
  var name = document.querySelector('.namel').value;
  var pass = document.querySelector('.passl').value;
  var user =JSON.parse(localStorage.getItem(name));
  if(JSON.parse(localStorage.getItem(name)) == null)
  document.querySelector('.loginerror').innerHTML='<p>Invalid user name</p>';
  else{
    if(pass !== user[3])
  document.querySelector('.loginerror').innerHTML='<p>Invalid Password</p>';
  else
  document.querySelector('.registererror').innerHTML='<p>Login Succesful!</p>';
  }

  
}

function App() {
  return (
    <div className="main_container">
       
    <div class="container">
       <h2>login Form</h2>
       <form className='seminor-login-form'>
        
       <div class="form-group">
       <input className='namel' type="text" placeholder='Enter Your Name' required/>
       </div>
       <div class="form-group">

        <input className='passl' type="text" placeholder='Enter Your Password' required/>
        </div>
       <div class="form-group">

        <button onClick={login} className='btn btn-primary'>Login</button>
        <div className='loginerror'></div>
        </div>

       </form>
     
     <br/>
     <br/>
     
     <h2>Register</h2>
     <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#sem-reg">
       Click here to register
     </button>
     
     
    
     <div class="modal fade seminor-login-modal" data-backdrop="static" id="sem-reg">
       <div class="modal-dialog modal-dialog-centered">
         <div class="modal-content">
     
           
           <div class="modal-body seminor-login-modal-body">
           <h5 class="modal-title text-center">CREATE AN ACCOUNT</h5>
             <button type="button" class="close" data-dismiss="modal">
                 <span><i class="fa fa-times-circle" aria-hidden="true"></i></span>
             </button>
     
     
             <form class="seminor-login-form">
               <div class="form-group">
                 <input type="name" class="form-control username" required autocomplete="off" />
                 <label class="form-control-placeholder" for="name">User Name</label>

               </div>
               <div class="form-group">
                 <input type="email" class="form-control emailadd" required autocomplete="off" />
                 <label class="form-control-placeholder" for="name">Email address</label>
               </div>
               <div class="form-group">
                 <input type="tel" class="form-control phno" required autocomplete="off" />
                 <label class="form-control-placeholder" for="name">Phone Number</label>
               </div>
               <div class="form-group">
                 <input type="password" class="form-control pw" required autocomplete="off" />
                 <label class="form-control-placeholder" for="password">Password</label>
               </div>
               <div class="form-group">
                 <input type="password" class="form-control pwc" required autocomplete="off" />
                 <label class="form-control-placeholder" for="password">Confirm Password</label>
               </div>
           
                 <div class="btn-check-log">
                     <button type="submit" onClick={register} class="btn-check-login">SIGN UP</button>
                 </div>
                 <div class="create-new-fau text-center pt-3">
                 <a href="#" class="text-primary-fau"><span data-toggle="modal" data-target="#sem-login" data-dismiss="modal">Already Have An Account</span></a>
        <div className='registererror'></div>

                 </div>
               </form>
     
           </div>
         </div>
       </div>
     </div>     
     </div>  
   </div>
   
  );
}

export default App;
