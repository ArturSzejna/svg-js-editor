import ToolbarButton from "../model/toolbar-button";
import ToolbarLoadButton from "../model/toolbar-load-button";
import ToolbarDownloadButton from "../model/toolbar-download-button";

import {BsCircle, BsCursor, BsDashLg} from 'react-icons/bs';
import {FaDrawPolygon, FaBezierCurve, FaFileUpload, FaFileDownload} from 'react-icons/fa';
import {BiRectangle, BiMove} from "react-icons/bi";

import {Box, Divider} from "@mui/material";

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

            <Divider />

            <ToolbarButton
                active={props.activeTool === "rectangle"}
                click={() => props.click(props.activeTool !== "rectangle" ? "rectangle" : null)}>
                <BiRectangle/>
            </ToolbarButton>
            <ToolbarButton
                active={props.activeTool === "circle"}
                click={() => props.click(props.activeTool !== "circle" ? "circle" : null)}>
                <BsCircle/>
            </ToolbarButton>
            <ToolbarButton
                active={props.activeTool === "line"}
                click={() => props.click(props.activeTool !== "line" ? "line" : null)}>
                <BsDashLg/>
            </ToolbarButton>
            <ToolbarButton
                active={props.activeTool === "polyline"}
                click={() => props.click(props.activeTool !== "polyline" ? "polyline" : null)}>
                <FaBezierCurve/>
            </ToolbarButton>

            <Divider />

            <ToolbarButton
                active={props.activeTool === "polygon"}
                click={() => props.click(props.activeTool !== "polygon" ? "polygon" : null)}>
                <FaDrawPolygon/>
            </ToolbarButton>

            <Divider />

            <ToolbarLoadButton
                setSvgTree={props.setSvgTree}>
                <FaFileUpload/>
            </ToolbarLoadButton>
            <ToolbarDownloadButton>
                <FaFileDownload/>
            </ToolbarDownloadButton>

        </Box>
    )
}

export default Toolbar;