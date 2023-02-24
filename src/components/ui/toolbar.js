import ToolbarButton from "./buttons";

import {BsCircle, BsCursor} from 'react-icons/bs';
import {FaDrawPolygon} from 'react-icons/fa';
import {BiRectangle, BiMove} from "react-icons/bi";

import {Box} from "@mui/material";

const Toolbar = (props) => {

    return (
        <Box component="section" sx={{
            width: 'auto',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            padding: 1,
            gap: 1,
            borderRight: '1px solid #dddddd'
        }}>
            <ToolbarButton
                active={props.activeTool === "cursor"}
                click={() => props.click(props.activeTool !== "cursor" ? "cursor" : null)}>
                <BsCursor/>
            </ToolbarButton>
            <ToolbarButton
                active={props.activeTool === "shift"}
                click={() => props.click(props.activeTool !== "shift" ? "shift" : null)}>
                <BiMove/>
            </ToolbarButton>

            <hr />

            <ToolbarButton
                active={props.activeTool === "circle"}
                click={() => props.click(props.activeTool !== "circle" ? "circle" : null)}>
                <BsCircle/>
            </ToolbarButton>
            <ToolbarButton
                active={props.activeTool === "polygon"}
                click={() => props.click(props.activeTool !== "polygon" ? "polygon" : null)}>
                <FaDrawPolygon/>
            </ToolbarButton>
            <ToolbarButton
                active={props.activeTool === "rectangle"}
                click={() => props.click(props.activeTool !== "rectangle" ? "rectangle" : null)}>
                <BiRectangle/>
            </ToolbarButton>

        </Box>
    )
}

export default Toolbar;