import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export function Login({route}){

    const navigate = useNavigate()

    const [username , setUsername] = useState("") 
    const [password , setPassword] = useState("")
    const [error , setError] = useState("true")

    return (
        <div style={{
            display : 'flex',
            flexDirection : 'column'
        }}>
            <h2>Login </h2>
            {error == "true" ? null : <div style={styles.error}>Entered data is invalid</div>}
            <input style={styles.input} onChange={(e)=>{
                setUsername(e.target.value)
            }} type="email" placeholder="username" />
            <input style={styles.input} onChange={(e)=>{
                setPassword(e.target.value)
            }} type="password" placeholder="password" />
            <button onClick={()=>{
                fetch("http://localhost:3000/" + route + "/signin", {
                    method : "POST",
                    body : JSON.stringify({
                        username : username,
                        password : password,
                    }),
                    headers : {
                        "Content-type" : "application/json"
                    }
                })
                .then( async(res)=>{
                    const json = await res.json();
                    const token = json.token;
                    //logic for storing jwt in localstorage only if the token is not stored
                    token == undefined ? null : localStorage.setItem(route + 'jwtToken' , token);

                    json.message == "User not found" ? setError("false") : null


                    //logic to navigate to the dashboard page if you are logged in and to
                    // remain on the signin page if your input is wrong
                    token == undefined ? navigate("/" + route + '/signin') : navigate("/" + route + '/dashboard')
                })
            }}>Login  </button>
            <div>New user register here <a style={{
                cursor : 'pointer'
            }} onClick={()=>{
                navigate("/" + route + '/signup')
            }}
            > new user</a></div>
        </div>
    )
}

const styles = {
    input : {
        margin : '5px',
        height : '30px',
        width : '300px'
    },
    error : {
        color : "red"
    }
}