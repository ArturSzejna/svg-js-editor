import {IconButton} from "@mui/material";
import {parse} from "svg-parser";

const ToolbarLoadButton = (props) => {

    return (
        <IconButton component="label" sx={{
            width: '40px',
            height: '40px',
            border: '1px solid #555555',
            borderRadius: 2,
            color: '#555555',
            padding: 1,
            backgroundColor: '#e7e5e4',
            fontSize: 16,
            '&:hover': {
                backgroundColor: '#c6d4d3',
            },
        }}>
            <input type='file' onChange={event => event.target.files[0].text().then(text => props.setSvgTree(parse(text)))}
                    style={{
                        position: 'absolute',
                        top: 0, bottom: 0, left: 0, right: 0,
                        width: 0, height: 0,
                        opacity: 0,
                    }}/>
            <button type='submit' style={{cursor: 'pointer'}}>{props.children}</button>
        </IconButton>
    )
}

export default ToolbarLoadButton;