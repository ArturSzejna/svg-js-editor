import {Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";

const ElementList = ({selectedIndex, setSelectedIndex, children, text}) => {
    return (
        <ListItem divider sx={{
            margin: 0,
            padding: 0
        }}>
            <ListItemButton selected={selectedIndex === text}
                            onClick={() => setSelectedIndex(text)}
                            sx={{
                                margin: 0,
                                padding: '3px 20px'
                            }}>
                <ListItemAvatar>
                    <Avatar sx={{width: 26, height: 26, fontSize: 12}}>
                        {children}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText secondary={text} sx={{
                    fontSize: 5
                }}/>
            </ListItemButton>
        </ListItem>
    )
}

export default ElementList;