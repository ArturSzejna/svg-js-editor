import Input from "../model/input";
import {Fragment, useEffect, useState} from "react";
import {Box} from "@mui/material";

const AttributePanel = ({activeElement, setActiveElement}) => {

    const [fill, setFill] = useState('#ffffff');
    const [stroke, setStroke] = useState('#000000');
    const [strokeWidth, setStrokeWidth] = useState(0);

    useEffect(() => {
        if (activeElement) {
            setFill(activeElement.fill());
            setStroke(activeElement.stroke());
            setStrokeWidth(activeElement.attr('stroke-width'));
        }
    }, [activeElement])

    useEffect(() => {
        if (activeElement) {
            setActiveElement(activeElement.fill(fill));
            setActiveElement(activeElement.stroke({color: stroke, opacity: 1, width: strokeWidth}));
        }
    }, [activeElement, fill, setActiveElement, stroke, strokeWidth])

    const inputList = [
        {
            types: ['rect', 'ellipse'],
            input: <Input name={"fill"} type={"color"} value={fill} onchange={e => setFill(e.target.value)}/>
        },
        {
            types: ['rect', 'ellipse'],
            input: <Input name={"stroke"} type={"color"} value={stroke} onchange={e => setStroke(e.target.value)}/>
        },
        {
            types: ['rect', 'ellipse'],
            input: <Input name={"stroke width"} type={"number"} value={strokeWidth}
                          onchange={e => setStrokeWidth(e.target.value)}/>
        }
    ]

    return (
        <Box sx={{
            width: '300px',
            height: '50%',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            padding: 1
        }}>
            {activeElement ?
                <Fragment>
                    {/* eslint-disable-next-line array-callback-return */}
                    {inputList.map(inputElement => inputElement.types.map(type => {
                        if (type === activeElement.type)
                            return inputElement.input;
                    }))}
                </Fragment>
                : <span>Zaznacz element aby edytować</span>}
        </Box>
    )

}

export default AttributePanel;