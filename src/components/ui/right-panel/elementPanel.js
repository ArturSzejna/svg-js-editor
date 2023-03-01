import {Box, List} from "@mui/material";
import {BiRectangle} from "react-icons/bi";
import {BsCircle} from "react-icons/bs";
import ElementList from "./elementList";
import {useEffect} from "react";

const ElementPanel = props => {

    const {selectedIndex, setSelectedIndex} = props;

    useEffect(() => {
        props.elementList.forEach(element => {
            if (element.id === selectedIndex) {
                element.active = true;
            } else {
                element.active = false;
            }
        })
        props.setElementList(props.elementList);

    }, [props, selectedIndex])

    return (
        <Box sx={{
            width: '300px',
            height: '50%',
            backgroundColor: '#ffffff'
        }}>
            <List sx={{
                height: '100%',
                borderBlock: '1px solid #dddddd',
                overflowY: 'scroll',
                padding: 0
            }}>
                {props.elementList.map(element =>
                    <ElementList key={element.id} text={element.id} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}>
                        {element.type === 'rect' && <BiRectangle/>}
                        {element.type === 'ellipse' && <BsCircle/>}
                    </ElementList>
                )}


            </List>

        </Box>
    )
}

export default ElementPanel;