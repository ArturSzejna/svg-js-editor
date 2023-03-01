import {Grid} from "@mui/material";

const Input = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4} sx={{
                fontSize: 14,
                display:'flex',
                justifyContent: 'right',
                alignItems: 'center'
            }}>
                <span>{props.name}:</span>
            </Grid>
            <Grid item xs={8}>
                <input type={props.type} value={props.value} onChange={props.onchange}
                       disabled={props.disabled}
                       style={{
                    width: '100%',
                    border: '1px solid #456456',
                    borderRadius: '5px',
                    padding: '1px 5px'
                }}/>
            </Grid>
        </Grid>
    )
}

export default Input;