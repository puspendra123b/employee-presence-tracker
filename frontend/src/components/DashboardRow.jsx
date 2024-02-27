
export function DashboardRow({prop}){
    return (
        <div style={{
            display : 'flex',
            justifyContent : 'space-around'
        }}>
            <div style={styles.outerdiv}>
                <div style={styles.innerdiv} >{prop.firstName} {prop.lastName}</div>
            </div>

            <div style={styles.outerdiv}>
                <div style={styles.innerdiv} >{prop.username}</div>
            </div>

            <div style={styles.outerdiv}>
                <div style={styles.innerdiv} >{prop.log[0].isActive ? <div style={styles.active}>Active</div> : <div style={styles.inactive}>Inactive</div>}</div>
            </div>

            <div style={styles.outerdiv}>
                <div style={styles.innerdiv} >{prop.log[0].loginTime}</div>
            </div>

            <div style={styles.outerdiv}>
                <div style={styles.innerdiv} >{prop.log[0].logoutTime}</div>
            </div>
        </div>
    )
}

const styles = {
    innerdiv : {
        margin : '1rem',
        height : '40px',
        width : '200px',
        display: 'flex',
        justifyContent : 'center',
        alignItem : 'center'
    },
    outerdiv : {
        border : '1px solid white',
        height : '60px',
        width : '220px',
        borderRadius : '5px',
    },
    active : {
        background : "green",
        height : '25px',
        width : '60px',
        border : '1px solid white',
        borderRadius : '20px'
    },
    inactive : {
        background : "red",
        height : '25px',
        width : '80px',
        border : '1px solid white',
        borderRadius : '20px'
    }
}