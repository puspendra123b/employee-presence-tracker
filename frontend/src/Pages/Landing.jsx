import {useNavigate} from 'react-router-dom'


export function Landing(){

    const navigate = useNavigate()

    return (
        <div>
            <button style={styles.button} onClick={()=>{
                navigate('/admin/signin')
            }}>Admin</button>
            <button style={styles.button} onClick={()=>{
                navigate('/user/signin')
            }}>User</button>
        </div>
    )
}

const styles =  {
    button : {
        margin : "100px",
        height :"100px",
        width :"100px",
    }
}