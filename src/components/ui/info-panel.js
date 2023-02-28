import {Avatar, Box, Divider, List, ListItem, ListItemText} from "@mui/material";
import {BiRectangle} from 'react-icons/bi';
import {Fragment} from "react";

const InfoPanel = (props) => {

    const {activeElement, setActiveElement} = props;

    return (
        <Box component="section" sx={{
            width: 'auto',
            backgroundColor: '#d28d8d',
            borderLeft: '1px solid #dddddd',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{
                width: '300px',
                height: '50%',
                backgroundColor: '#e1d78c'
            }}>
                Elements List:
                <List component="nav" sx={{
                    padding: 0,
                    backgroundColor: "#ffffff"
                }}>
                    <Divider/>
                    <ListItem button divider sx={{
                        padding: '2px 10px',
                        gap: 2
                    }}>
                        <Avatar sx={{width: 24, height: 24, fontSize: 10}}>
                            <BiRectangle/>
                        </Avatar>
                        <ListItemText primary="Rectangle - 1459764523"/>
                    </ListItem>
                </List>
            </Box>
            <Box sx={{
                width: '300px',
                height: '50%',
                backgroundColor: '#ad904f',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1
            }}>
                {activeElement ?

                    <Fragment>
                        <Box>
                            <span>x:</span>
                            <input type="number"/>
                        </Box>
                        <Box>
                            <span>y:</span>
                            <input type="number"/>
                        </Box>
                        <Box>
                            <span>width:</span>
                            <input type="number"/>
                        </Box>
                        <Box>
                            <span>height:</span>
                            <input type="number"/>
                        </Box>
                        <Box>
                            <span>fill:</span>
                            <input type="color"/>
                        </Box>
                        <Box>
                            <span>stroke:</span>
                            <input type="color"/>
                        </Box>
                        <Box>
                            <span>stroke width:</span>
                            <input type="number"/>
                        </Box>
                    </Fragment>

                    // <input type="number" value={props.activeElement.y()}
                    //        onChange={(event) => props.setActiveElement(props.activeElement.y(event.target.value))}/>
                    //
                    //
                    // <input type="color" value={props.activeElement.fill()}
                    // onChange={(event) => props.setActiveElement(props.activeElement.fill(event.target.value))}/>

                    : null}


            </Box>
        </Box>
    )
}

export default InfoPanel;