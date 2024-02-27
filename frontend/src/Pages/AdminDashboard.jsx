
import { useEffect, useState } from "react";
import { DashboardRow } from "../components/DashboardRow";
import {useNavigate} from 'react-router-dom'

export function AdminDashboard({route}){

    const token = !!localStorage.getItem(route + 'jwtToken')
    useEffect(()=>{
        if(!token){
            navigate("/" + route + '/signin')
        }
    } , [])


    const navigate = useNavigate()

    const [data , setData] = useState([])

    useEffect(()=>{
        const interval = setInterval(() => {
            fetch("http://localhost:3000/" + route + "/dashboard" , {
                method : "GET",        
                headers : {
                    "Content-type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem(route + 'jwtToken')
                }
            })
            .then(async(res)=>{
                const json = await res.json();
                setData(json.user);
            })
          }, 1000)
          return () => clearInterval(interval)
    },[navigate])

    return (
        <div style={{ 
            background : '#3e3e3f', 
            margin : 'auto',
            borderRadius : '5px',
            padding : '20px 30px '
            }} >
            <h1 style={{
                color : '#C4D3CD'
        }}>ADMIN DASHBOARD</h1>
            <div style={{
            display : 'flex',
            justifyContent : 'space-around'
        }}>
                <h4 style={styles.headings}>Name</h4>
                <h4 style={styles.headings}>E-Mail</h4>
                <h4 style={styles.headings}>Status</h4>
                <h4 style={styles.headings}>Login Time</h4>
                <h4 style={styles.headings}>Logout Time</h4>
            </div>
            {data.map((data)=> (<DashboardRow prop={data} />))}
            
            <div style={{
                marginTop : '30px'
            }}>
                <button onClick={()=>{
                    localStorage.removeItem(route + 'jwtToken');
                    navigate("/" + route + '/signin')

                }}>Logout </button>
            </div>
        </div>
    )
}

const styles = {
    headings : {
        margin : '0.8rem',
        height : '40px',
        width : '200px',
        color : '#C4D3CD',
        fontSize : '1.8rem'
    }
}