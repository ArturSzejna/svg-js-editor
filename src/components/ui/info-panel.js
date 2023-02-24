import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Input,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {BiRectangle} from 'react-icons/bi';
import {BsCircle} from 'react-icons/bs';
import {AiOutlineLine} from 'react-icons/ai';

const InfoPanel = (props) => {
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
                        <Avatar sx={{ width: 24, height: 24, fontSize: 10}} >
                            <BiRectangle />
                        </Avatar>
                        <ListItemText primary="Rectangle - 1459764523" />
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
                padding: 2,
                gap: 2
            }}>

            </Box>
        </Box>
    )
}

export default InfoPanel;