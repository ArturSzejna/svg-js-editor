import {useEffect, useRef, useState} from "react";
import {Array, SVG} from "@svgdotjs/svg.js";

import {moveElement, rotateElement} from '../helper/editing-helper';

import {
    createEditElementByElement,
    createEditPathElementByElement,
    createMoveElementByElement,
    deleteAllEditElements,
    deleteCircleElements,
    deleteLineElements
} from '../helper/creating-helper';
import {arrayToString} from "../helper/helper";

const WorkingField = (props) => {

    const svgRef = useRef(null);

    const [pageSize, setPageSize] = useState({
        width: 500,
        height: 600
    });

    const [createId, setCreateId] = useState(1245);

    const [pathArray, setPathArray] = useState(null);

    useEffect(() => {
        const svg = SVG(svgRef.current);

        svg.off();

        svg.on('mousedown', event => {
            console.log(event.target.id);
            if (event.which === 1) {
                if (props.activeTool === 'rectangle' || props.activeTool === 'circle' || props.activeTool === 'line') {
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
                        case 'line':
                            element = svg.line(event.offsetX, event.offsetY, event.offsetX + 1, event.offsetY + 1)
                                .stroke({color: '#000000', opacity: 1, width: 4})
                                .attr({id: 'line' + createId});
                            break;
                        default:
                    }

                    props.setElements([...props.elements, {id: element.id(), active: false, type: element.type}]);
                    element.attr({
                        fill: "rgba(161,230,255,0.5)",
                        stroke: "rgba(121,190,215,0.5)",
                    })
                    // element.remember("active", false);
                    setCreateId(createId + 1);
                    svg.remember('element', element);
                }
                if (props.activeTool === 'cursor' || props.activeTool === 'shift') {
                    if (event.target.id && event.target.id.includes('editElement')) {

                        if (event.target.id.includes('rotate')) svg.remember('elementRotate', svg.findOne('.rect'));
                        if (event.target.id.includes('rect')) svg.remember('elementEdit', svg.findOne('.rect'));

                        if (event.target.id.includes('stretch')) {
                            if (event.target.id.includes('east')) svg.remember('elementStretchEast', svg.findOne('.rect'));
                            if (event.target.id.includes('west')) svg.remember('elementStretchWest', svg.findOne('.rect'));
                            if (event.target.id.includes('south')) svg.remember('elementStretchSouth', svg.findOne('.rect'));
                            if (event.target.id.includes('north')) svg.remember('elementStretchNorth', svg.findOne('.rect'));
                        }

                        if (event.target.id.includes('point')) {

                            svg.remember('elementPath', {
                                path: svg.findOne('.path'),
                                index: event.target.id.split('-')[2]
                            })
                        }
                        deleteCircleElements(svg);
                        deleteLineElements(svg);
                    }
                }
            }
            if (event.which === 2) {
                if (props.activeTool === 'polyline') {
                    if (svg.remember('element')) {
                        const element = svg.remember("element");
                        const array = pathArray;

                        array.pop();
                        setPathArray(array);

                        element.attr({
                            d: arrayToString(array)
                        })

                        svg.remember('element', null);
                        props.setActiveTool(null);
                    }
                }
            }
        })

        svg.on('mousemove', event => {
            if (props.activeTool === 'rectangle' || props.activeTool === 'circle' || props.activeTool === 'line') {
                if (svg.remember("element")) {
                    const element = svg.remember("element");
                    const bbox = element.bbox();

                    let width, height;
                    if (event.offsetX > bbox.x) width = event.offsetX - bbox.x;
                    else width = 1;
                    if (event.offsetY > bbox.y) height = event.offsetY - bbox.y;
                    else height = 1;

                    element.width(width).height(height);
                }
            }

            if (props.activeTool === 'polyline') {
                if (svg.remember("element")) {
                    const element = svg.remember("element");
                    const array = pathArray;

                    array[array.length - 1] = ['L', event.offsetX, event.offsetY];
                    setPathArray(array);

                    element.attr({
                        d: arrayToString(array)
                    })
                }
            }

            if (props.activeTool === 'cursor' || props.activeTool === 'shift') {
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
                        x: x
                    }).width(width);
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
                        x: x
                    }).width(width)
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
                        y: y
                    }).height(height);
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
                        y: y
                    }).height(height);
                }

                if (svg.remember('elementPath')) {
                    const element = svg.remember('elementPath');
                    const path = element.path;
                    const array = path._array;
                    array[element.index][1] = event.offsetX;
                    array[element.index][2] = event.offsetY;
                    path.attr({
                        d: arrayToString(array)
                    })
                        console.log(array[element.index]);


                }
            }
        })

        svg.on("mouseup", () => {
            if (props.activeTool === 'rectangle' || props.activeTool === 'circle' || props.activeTool === 'line') {
                const element = svg.remember('element');
                element.attr({
                    fill: "#abe538",
                    stroke: "#aac316"
                })
                svg.remember('element', null);
                props.setActiveTool(null);
            }
            if (props.activeTool === 'cursor' || props.activeTool === 'shift') {
                if (svg.remember('elementRotate')) {
                    const element = svg.remember('elementRotate');
                    const activeElement = svg.remember('activeElement');
                    activeElement.rotate(-activeElement.transform().rotate + element.transform().rotate);
                    props.setActiveElement(null);
                    props.setActiveElement(activeElement);
                    svg.remember('elementRotate', null);
                    deleteAllEditElements(svg)
                    if (activeElement.id().includes('polyline')) {

                    } else {
                        createEditElementByElement(svg, activeElement, 8)
                    }

                }
                if (svg.remember('elementEdit')) {
                    const element = svg.remember('elementEdit');
                    const bbox = element.bbox();
                    const activeElement = svg.remember('activeElement');
                    activeElement.move(bbox.x, bbox.y);
                    props.setActiveElement(null);
                    props.setActiveElement(activeElement);
                    svg.remember('elementEdit', null);
                    deleteAllEditElements(svg);
                    switch (props.activeTool) {
                        case "cursor":
                            if (activeElement.id().includes('polyline')) {

                            } else {
                                createEditElementByElement(svg, activeElement, 8)
                            }
                            break;
                        case "shift":
                            createMoveElementByElement(svg, activeElement);
                            break;
                        default:
                    }

                }

                if (svg.remember('elementStretchEast')) {
                    const element = svg.remember('elementStretchEast');
                    const bbox = element.bbox();
                    const activeElement = svg.remember('activeElement');
                    activeElement.move(bbox.x, bbox.y).width(bbox.width);
                    props.setActiveElement(null);
                    props.setActiveElement(activeElement);
                    svg.remember('elementStretchEast', null);
                    deleteAllEditElements(svg);
                    if (activeElement.id().includes('polyline')) {

                    } else {
                        createEditElementByElement(svg, activeElement, 8)
                    }
                }
                if (svg.remember('elementStretchWest')) {
                    const element = svg.remember('elementStretchWest');
                    const bbox = element.bbox();
                    const activeElement = svg.remember('activeElement');
                    activeElement.move(bbox.x, bbox.y).width(bbox.width);
                    props.setActiveElement(null);
                    props.setActiveElement(activeElement);
                    svg.remember('elementStretchWest', null);
                    deleteAllEditElements(svg);
                    if (activeElement.id().includes('polyline')) {

                    } else {
                        createEditElementByElement(svg, activeElement, 8)
                    }
                }
                if (svg.remember('elementStretchSouth')) {
                    const element = svg.remember('elementStretchSouth');
                    const bbox = element.bbox();
                    const activeElement = svg.remember('activeElement');
                    activeElement.move(bbox.x, bbox.y).height(bbox.height);
                    props.setActiveElement(null);
                    props.setActiveElement(activeElement);
                    svg.remember('elementStretchSouth', null);
                    deleteAllEditElements(svg);
                    if (activeElement.id().includes('polyline')) {

                    } else {
                        createEditElementByElement(svg, activeElement, 8)
                    }
                }
                if (svg.remember('elementStretchNorth')) {
                    const element = svg.remember('elementStretchNorth');
                    const bbox = element.bbox();
                    const activeElement = svg.remember('activeElement');
                    activeElement.move(bbox.x, bbox.y).height(bbox.height);
                    props.setActiveElement(null);
                    props.setActiveElement(activeElement);
                    svg.remember('elementStretchNorth', null);
                    deleteAllEditElements(svg);
                    if (activeElement.id().includes('polyline')) {

                    } else {
                        createEditElementByElement(svg, activeElement, 8)
                    }
                }

                if (svg.remember('elementPath')) {
                    const element = svg.remember('elementPath');
                    const activeElement = svg.remember('activeElement');
                    activeElement.attr({
                        d: element.path.attr('d')
                    });
                    svg.remember('elementPath', null);
                    deleteAllEditElements(svg);
                    createEditPathElementByElement(svg, activeElement, 8);
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
                            svg.remember('activeElement', activeElement);
                            props.setSelectedIndex(activeElement.id());
                            props.setActiveElement(activeElement);
                        }
                    } else {
                        const activeElement = svg.findOne('#' + event.target.id);
                        svg.remember('activeElement', activeElement);
                        props.setSelectedIndex(activeElement.id());
                        props.setActiveElement(activeElement);
                    }
                } else {
                    if (svg.remember('activeElement')) {
                        svg.remember('activeElement', null);
                        props.setActiveElement(null);
                        props.setSelectedIndex(0);
                    }
                }
            }
            if (props.activeTool === "shift") {
                if (event.target.id) {
                    if (svg.remember('activeElement')) {
                        if (event.target.id.includes('editElement')) {
                            //TODO
                        } else {
                            const activeElement = svg.findOne('#' + event.target.id);
                            svg.remember('activeElement', activeElement);
                            props.setSelectedIndex(activeElement.id());
                            props.setActiveElement(activeElement);
                        }
                    } else {
                        const activeElement = svg.findOne('#' + event.target.id);
                        svg.remember('activeElement', activeElement);
                        props.setSelectedIndex(activeElement.id());
                        props.setActiveElement(activeElement);
                    }
                } else {
                    if (svg.remember('activeElement')) {
                        svg.remember('activeElement', null);
                        props.setActiveElement(null);
                        props.setSelectedIndex(0);
                    }
                }
            }

            if (props.activeTool === "polyline") {
                if (props.activeTool === 'polyline') {
                    if (svg.remember('element')) {
                        const element = svg.remember("element");
                        const array = pathArray;

                        array.push(['L', event.offsetX, event.offsetY]);
                        setPathArray(array);

                        element.attr({
                            d: arrayToString(array)
                        })
                    } else {
                        const array = new Array([
                            ['M', event.offsetX, event.offsetY],
                            ['L', event.offsetX + 1, event.offsetY + 1]
                        ])
                        setPathArray(array);
                        const element = svg.path(array)
                            .stroke({color: '#000000', opacity: 1, width: 2})
                            .attr({
                                id: 'polyline' + createId,
                                fill: 'none'
                            });
                        props.setElements([...props.elements, {id: element.id(), active: false, type: element.type}]);
                        setCreateId(createId + 1);
                        svg.remember('element', element);
                    }
                }
            }
        })

        if (props.activeTool === null) {
            svg.off();
            svg.remember('activeElement', null);
            deleteAllEditElements(svg);
        }

        if (props.selectedIndex !== 0) {
            const activeElement = svg.findOne('#' + props.selectedIndex);
            deleteAllEditElements(svg);
            svg.remember('activeElement', activeElement);
            props.setActiveElement(activeElement);

            switch (props.activeTool) {
                case "cursor":
                    if (activeElement.id().includes('polyline')) {
                        createEditPathElementByElement(svg, activeElement, 8);
                    } else {
                        createEditElementByElement(svg, activeElement, 8)
                    }
                    break;
                case "shift":
                    createMoveElementByElement(svg, activeElement);
                    break;
                default:
            }

        } else {
            deleteAllEditElements(svg);
        }

    }, [createId, pathArray, props]);

    const workPlaceStyle = "w-[" + pageSize.width + "px] h-[" + pageSize.height + "px] border bg-white drop-shadow-md";
    const viewBox = "0 0 " + pageSize.width + " " + pageSize.height;

    return (
        <div className="w-[100%] bg-white-200 flex justify-center items-center relative bg-gray-200">
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