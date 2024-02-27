
import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'

export function UserDashboard({route}){

    const navigate = useNavigate()

    //logic to make this page protected means it will only be exessibel only
    // if you are signed in
    const token = !!localStorage.getItem(route + 'jwtToken')
    useEffect(()=>{
        if(!token){
            navigate("/" + route + '/signin')
        }
    } , [])
    
    const [id , setId] = useState("")

    const [data , setData] = useState([])

    useEffect(()=>{

        try {
            fetch("http://localhost:3000/" + route + "/dashboard" , {
                method : "GET",        
                headers : {
                    "Content-type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem(route + 'jwtToken')
                }
            }).then((res)=>{
                res.json().then((response)=>{
                    setId(response.msg[0].log[0]._id)
                    setData(response.msg);
                })
                
            })
            
        } catch (error) {
            console.log(error)
        }
            
            
            
    },[navigate])
    return(
        <div>
            <h1> Dashboard </h1>
            { data && <h3>First Name : {data[0]?.firstName}</h3> }
            { data && <h3>Last Name : {data[0]?.lastName}</h3> }
            { data && <h3>Username : {data[0]?.username}</h3> }
            { data && <h3>Login at : {data[0]?.log[0].loginTime}</h3> }
            <button onClick={()=>{
                fetch("http://localhost:3000/" + route + "/logout", {
                    method : "PUT",
                    body : JSON.stringify({
                        id : id
                    }),
                    headers : {
                        "Content-type" : "application/json",
                        "Authorization" : "Bearer " + localStorage.getItem(route + 'jwtToken')
                    }
                })
                .then( async(res)=>{
                    const response = await res.json();

                    //logic for navigation to signin page only when you are 
                    // signed up else you remain on the page
                    response.msg != 'false' ? navigate("/" + route + '/signin') : null;
                })
                localStorage.removeItem(route + 'jwtToken');
                navigate("/" + route + '/signin')

            }}>Logout </button>
        </div>
    )
}