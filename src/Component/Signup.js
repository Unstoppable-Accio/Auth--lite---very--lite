import React,{useState} from "react";
import axios from "axios";


const Signup = () => {
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    })

    const [error,setError] = useState("")
    const [success,setSuccess] = useState("")
    const [token,setToken] = useState("")
    console.log(token)

    function addUser(e){
        e.preventDefault();
        
        if(user.password !== user.cpassword){
            setError("Password and Confirm Password should be same")
            setSuccess("")
        }

        axios.post("https://instagram-express-app.vercel.app/api/auth/signup", 
        {
           name: user.name,
           email: user.email,
           password: user.password,
        }
        )
        .then(response => {
            setSuccess(response.data.message)
            setToken(response.data.data.token)
            setError("")
        
        })
        .catch(err =>{
            setError(err.response.data.message)
            setSuccess("")
        })
        

    }


    return(
        <div>
            <h1>Signup</h1>
            {error && <h4 className="error">{error}</h4>}
            {
                success && <h4 className="success">{success}</h4>
            }
            <form className="signup-form" onSubmit={addUser}>
                 <input type="text"  placeholder="Enter your name"
                    onChange={(e)=>{setUser({...user,name:e.target.value})}}
                 />
                 <input type="email"  placeholder="Enter your email"
                    onChange={(e)=>{setUser({...user,email:e.target.value})}}
                 />
                 <input type="password"  placeholder="Enter your password"
                    onChange={(e)=>{setUser({...user,password:e.target.value})}}
                 />
                 <input type="password"  placeholder="Confirm your password"
                    onChange={(e)=>{setUser({...user,cpassword:e.target.value})}}
                 />
                 <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup;




/*
fetch("https://instagram-express-app.vercel.app/api/auth/signup", {
    method: "POST",
    // headers: {},
    // params: {}
    body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
    })
})
.then(response => response.json())
.then(data => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})
*/