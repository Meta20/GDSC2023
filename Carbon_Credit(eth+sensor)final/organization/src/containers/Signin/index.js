import React, {useState} from 'react';
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Signin = () => {

    const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector(state => state.auth);




  const userLogin =(e)=>{
    e.preventDefault();
    const user = {
      email, password
    } 
    dispatch(login(user));
  }

if(auth.authenticate){
    const address = auth.user.contractAddress;
  return <Navigate to={`/${address}/dashboard`}/>
}
    return (
        <div>
            <section>
        <div class="contentbx">
            <div class="formbx">
                <h2>Organization Login</h2> 
                {/* <form> */}
                    <div class="inputbx">
                        <span>E-mail</span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div class="inputbx">
                        <span>Password</span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    <div class="inputbx">
                        <input type="submit" value="Login"name="" onClick={userLogin}/>
                    </div>
                {/* </form> */}
            </div>
        </div>
    </section>
        </div>
    )
}

export default Signin;
