import {useEffect, useRef, useState} from "react";
import {SVG} from "@svgdotjs/svg.js";
import '@svgdotjs/svg.draggable.js'

import {getTanFromDegrees, moveElement, rotateElement} from '../helper/editing-helper';

import {createEditElementByElement, deleteAllEditElements, deleteCircleEditElements} from '../helper/creating-helper';

const WorkingField = (props) => {

    const svgRef = useRef(null);

    const [pageSize, setPageSize] = useState({
        width: 500,
        height: 600
    });

    const [createId, setCreateId] = useState(1245);

    useEffect(() => {
        const svg = SVG(svgRef.current);

        svg.off();

        svg.on('mousedown', event => {
            if (props.activeTool === 'rectangle' || props.activeTool === 'circle') {
                let element;
                switch (props.activeTool) {
                    case 'rectangle':
                        element = svg.rect(10, 10).move(event.offsetX, event.offsetY).attr({
                            id: 'rect' + createId
                        });
                        break;
                    case 'circle':
                        element = svg.ellipse(5, 5).move(event.offsetX, event.offsetY).width(5).height(5).attr({
                            id: 'ellipse' + createId
                        });
                        break;
                }

                element.attr({
                    fill: "rgba(161,230,255,0.5)",
                    stroke: "rgba(121,190,215,0.5)",
                })
                element.remember("active", false);
                setCreateId(createId + 1);
                svg.remember('element', element);
            }

            if (props.activeTool === 'cursor') {
                if (event.target.id && event.target.id.includes('editElement')) {
                    const element = svg.findOne('.rect');
                    if (event.target.id.includes('rotate')) svg.remember('elementRotate', element);
                    if (event.target.id.includes('rect')) svg.remember('elementEdit', element);

                    if (event.target.id.includes('stretch')) {
                        if (event.target.id.includes('east')) svg.remember('elementStretchEast', element);
                        if (event.target.id.includes('west')) svg.remember('elementStretchWest', element);
                        if (event.target.id.includes('south')) svg.remember('elementStretchSouth', element);
                        if (event.target.id.includes('north')) svg.remember('elementStretchNorth', element);
                    }
                    deleteCircleEditElements(svg);
                }
            }
        })

        svg.on('mousemove', event => {
            if (props.activeTool === 'rectangle' || props.activeTool === 'circle') {
                if (svg.remember("element")) {
                    const element = svg.remember("element");
                    const bbox = element.bbox();
                    console.log(element.transform());

                    let width, height;
                    if (event.offsetX > bbox.x) width = event.offsetX - bbox.x;
                    else width = 1;
                    if (event.offsetY > bbox.y) height = event.offsetY - bbox.y;
                    else height = 1;

                    element.width(width).height(height);
                }
            }
            if (props.activeTool === 'cursor') {
                if (svg.remember('elementRotate')) { //ROTATE
                    const element = svg.remember('elementRotate');
                    element.rotate(rotateElement(event, element));
                }
                if (svg.remember('elementEdit')) { //MOVE
                    const element = svg.remember('elementEdit');
                    const centerPosition = moveElement(event, element);
                    element.center(centerPosition.cx, centerPosition.cy);
                }

                if (svg.remember('elementStretchEast')) {
                    const element = svg.remember('elementStretchEast');
                    const activeElement = svg.remember('activeElement');
                    const centerPosition = moveElement(event, element);

                    let width = centerPosition.cx - activeElement.bbox().x
                    let x = activeElement.bbox().x;

                    if (width < 0) {
                        x = x + width;
                        width = Math.abs(width);
                    }

                    element.attr({
                        x: x,
                        width: width
                    })
                }
                if (svg.remember('elementStretchWest')) {
                    const element = svg.remember('elementStretchWest');
                    const activeElement = svg.remember('activeElement');
                    const centerPosition = moveElement(event, element);

                    let x = centerPosition.cx;
                    let width = activeElement.bbox().width + activeElement.bbox().x - x;

                    if (width < 0) {
                        x = activeElement.bbox().x2;
                        width = centerPosition.cx - activeElement.bbox().x - activeElement.bbox().width;
                    }

                    element.attr({
                        x: x,
                        width: width
                    })
                }
                if (svg.remember('elementStretchSouth')) {
                    const element = svg.remember('elementStretchSouth');
                    const activeElement = svg.remember('activeElement');
                    const centerPosition = moveElement(event, element);

                    let height = centerPosition.cy - activeElement.bbox().y
                    let y = activeElement.bbox().y;

                    if (height < 0) {
                        y = y + height;
                        height = Math.abs(height);
                    }

                    element.attr({
                        y: y,
                        height: height
                    })
                }
                if (svg.remember('elementStretchNorth')) {
                    const element = svg.remember('elementStretchNorth');
                    const activeElement = svg.remember('activeElement');
                    const centerPosition = moveElement(event, element);

                    let y = centerPosition.cy;
                    let height = activeElement.bbox().height + activeElement.bbox().y - y;

                    if (height < 0) {
                        y = activeElement.bbox().y2;
                        height = centerPosition.cy - activeElement.bbox().y - activeElement.bbox().height;
                    }

                    element.attr({
                        y: y,
                        height: height
                    })
                }
            }
        })

        svg.on("mouseup", () => {
            if (props.activeTool === 'rectangle' || props.activeTool === 'circle') {
                const element = svg.remember('element');
                element.attr({
                    fill: "#abe538",
                    stroke: "#aac316"
                })
                svg.remember('element', null);
                props.setActiveTool(null);
            }
            if (props.activeTool === 'cursor') {
                if (svg.remember('elementRotate')) {
                    const element = svg.remember('elementRotate');
                    const activeElement = svg.remember('activeElement');
                    activeElement.rotate(-activeElement.transform().rotate + element.transform().rotate);
                    svg.remember('elementRotate', null);
                    deleteAllEditElements(svg)
                    createEditElementByElement(svg, activeElement, 8)
                }
                if (svg.remember('elementEdit')) {
                    const element = svg.remember('elementEdit');
                    const bbox = element.bbox();
                    const activeElement = svg.remember('activeElement');
                    activeElement.move(bbox.x, bbox.y);
                    svg.remember('elementEdit', null);
                    deleteAllEditElements(svg)
                    createEditElementByElement(svg, activeElement, 8)
                }

                if (svg.remember('elementStretchEast')) {
                    const element = svg.remember('elementStretchEast');
                    const bbox = element.bbox();
                    const activeElement = svg.remember('activeElement');
                    activeElement.move(bbox.x, bbox.y).attr({
                        width: bbox.width,
                        height: bbox.height
                    });
                    svg.remember('elementStretchEast', null);
                    deleteAllEditElements(svg);
                    createEditElementByElement(svg, activeElement, 8);
                }
                if (svg.remember('elementStretchWest')) {
                    const element = svg.remember('elementStretchWest');
                    const bbox = element.bbox();
                    const activeElement = svg.remember('activeElement');
                    activeElement.move(bbox.x, bbox.y).attr({
                        width: bbox.width,
                        height: bbox.height
                    });
                    svg.remember('elementStretchWest', null);
                    deleteAllEditElements(svg);
                    createEditElementByElement(svg, activeElement, 8);
                }
                if (svg.remember('elementStretchSouth')) {
                    const element = svg.remember('elementStretchSouth');
                    const bbox = element.bbox();
                    const activeElement = svg.remember('activeElement');
                    activeElement.move(bbox.x, bbox.y).attr({
                        width: bbox.width,
                        height: bbox.height
                    });
                    svg.remember('elementStretchSouth', null);
                    deleteAllEditElements(svg);
                    createEditElementByElement(svg, activeElement, 8);
                }
                if (svg.remember('elementStretchNorth')) {
                    const element = svg.remember('elementStretchNorth');
                    const bbox = element.bbox();
                    const activeElement = svg.remember('activeElement');
                    activeElement.move(bbox.x, bbox.y).attr({
                        width: bbox.width,
                        height: bbox.height
                    });
                    svg.remember('elementStretchNorth', null);
                    deleteAllEditElements(svg);
                    createEditElementByElement(svg, activeElement, 8);
                }
            }
        })

        svg.on("click", event => {
            if (props.activeTool === "cursor") {
                if (event.target.id) {
                    if (svg.remember('activeElement')) {
                        if (event.target.id.includes('editElement')) {
                            //TODO
                        } else {
                            const activeElement = svg.findOne('#' + event.target.id);

                            console.log(activeElement.transform());

                            deleteAllEditElements(svg);
                            svg.remember('activeElement', activeElement);
                            createEditElementByElement(svg, activeElement, 8);
                        }
                    } else {
                        const activeElement = svg.findOne('#' + event.target.id);

                        console.log(activeElement.transform());

                        svg.remember('activeElement', activeElement);
                        createEditElementByElement(svg, activeElement, 8);
                    }
                } else {
                    if (svg.remember('activeElement')) {
                        deleteAllEditElements(svg);
                        svg.remember('activeElement', null);
                    }
                }
            }
        })

        if (props.activeTool === null) {
            svg.off();
            svg.remember('activeElement', null);
            deleteAllEditElements(svg);
        }

    }, [props.activeTool]);

    const workPlaceStyle = "w-[" + pageSize.width + "px] h-[" + pageSize.height + "px] border bg-white drop-shadow-md";
    const viewBox = "0 0 " + pageSize.width + " " + pageSize.height;

    return (
        <div className="w-[100%] bg-white-200 flex justify-center items-center relative">
            <div className="flex flex-row absolute top-0 left-[50%-30px] z-10">
                <input type={"number"} placeholder={"width"} className="border m-1 pl-1" value={pageSize.width}
                       onChange={(e) => setPageSize({
                           width: e.target.value,
                           height: pageSize.height
                       })}/>
                <input type={"number"} placeholder={"height"} className="border m-1 pl-1" value={pageSize.height}
                       onChange={e => setPageSize({
                           width: pageSize.width,
                           height: e.target.value
                       })}/>
            </div>
            <div className={workPlaceStyle}>
                <svg ref={svgRef} width={pageSize.width} height={pageSize.height} viewBox={viewBox}>

                </svg>
            </div>
        </div>
    )
}

export default WorkingField;