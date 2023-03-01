import {IconButton} from "@mui/material";

const ToolbarButton = (props) => {

    const focus = props.active ? "#fef08a" : "#e7e5e4";

    return (
        <IconButton component="label" onClick={props.click} sx={{
            width: '40px',
            height: '40px',
            border: '1px solid #555555',
            borderRadius: 2,
            color: '#555555',
            padding: 1,
            backgroundColor: focus,
            fontSize: 16,
            '&:hover': {
                backgroundColor: '#c6d4d3',
            },
        }}>
            {props.children}
        </IconButton>
    )
}

export default ToolbarButton;