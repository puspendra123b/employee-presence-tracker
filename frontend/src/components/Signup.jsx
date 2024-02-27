import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export function Signup({route}){

    const navigate = useNavigate()

    const [firstName , setFirstname] = useState("") 
    const [lastName , setLastname] = useState("") 
    const [username , setUsername] = useState("") 
    const [password , setPassword] = useState("")
    const [error , setError] = useState("true")

    return (
        <div style={{
            display : 'flex',
            flexDirection : 'column'
        }}>
            <h2>New user Sign up here </h2>
            {error == "true" ? null : <div style={styles.error}>Entered data is invalid</div>}
            <input style={styles.input} onChange={(e)=>{
                setFirstname(e.target.value)
            }} type="text" placeholder="First Name" />

            <input style={styles.input} onChange={(e)=>{
                setLastname(e.target.value)
            }} type="text" placeholder="Last Name" />

            <input style={styles.input} onChange={(e)=>{
                setUsername(e.target.value)
            }} type="email" placeholder="username" />

            <input style={styles.input} onChange={(e)=>{
                setPassword(e.target.value)
            }} type="password" placeholder="password" />

            <button onClick={()=>{
                fetch("http://localhost:3000/" + route + "/signup", {
                    method : "POST",
                    body : JSON.stringify({
                        firstName : firstName,
                        lastName : lastName,
                        username : username,
                        password : password,
                    }),
                    headers : {
                        "Content-type" : "application/json"
                    }
                })
                .then( async(res)=>{
                    const response = await res.json();
                    setError(response.msg)

                    //logic for navigation to signin page only when you are 
                    // signed up else you remain on the page
                    response.msg != 'false' ? navigate("/" + route + '/signin') : null;
                })
            }}>Signup</button>

            <div>If already registered <a style={{
                cursor : 'pointer'
            }} onClick={()=>{
                navigate("/" + route + '/signin')
            }}
            > Login</a></div>
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