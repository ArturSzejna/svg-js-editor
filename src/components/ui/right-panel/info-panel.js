import {Box, Divider} from "@mui/material";
import AttributePanel from "./attributePanel";
import ElementPanel from "./elementPanel";

const InfoPanel = (props) => {

    const {activeElement, setActiveElement, elementList, setElementList, selectedIndex, setSelectedIndex} = props;

    return (
        <Box component="section" sx={{
            width: 'auto',
            borderLeft: '1px solid #dddddd',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Divider>Elements Panel</Divider>
            <ElementPanel elementList={elementList}
                          setElementList={setElementList}
                          selectedIndex={selectedIndex}
                          setSelectedIndex={setSelectedIndex}/>
            <Divider>Attribute Panel</Divider>
            {/*<Divider component='hr' sx={{*/}
            {/*    width: '90%',*/}
            {/*    height: '1px',*/}
            {/*    backgroundColor: '#dadada'*/}
            {/*}} />*/}
            <AttributePanel activeElement={activeElement}
                            setActiveElement={setActiveElement}
                            elementList={elementList}
                            setElementList={setElementList}
                            setSelectedIndex={setSelectedIndex}/>
        </Box>
    )
}

export default InfoPanel;