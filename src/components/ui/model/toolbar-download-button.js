import {IconButton} from "@mui/material";
import { saveAs } from 'file-saver'
import {saveSvg} from '../../helper/helper';

const ToolbarDownloadButton = (props) => {

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
        }} onClick={() => {
            saveSvg();
        }}>
            {props.children}
        </IconButton>
    )
}

export default ToolbarDownloadButton;