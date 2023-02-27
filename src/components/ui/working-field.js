import {useEffect, useRef, useState} from "react";
import {SVG} from "@svgdotjs/svg.js";
import '@svgdotjs/svg.draggable.js'

import {getTanFromDegrees} from '../helper/trigonometric';
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

        const createEditElementByElement = (element, r) => {
            const bbox = element.bbox();

            svg.rect(bbox.width, bbox.height).move(bbox.x, bbox.y).attr({
                fill: "rgba(161,230,255,0.5)",
                stroke: "rgba(121,190,215,0.5)",
                id: 'editElement-rect',
                class: 'rect'
            }).transform(element.transform());

            svg.line(bbox.x + bbox.width, bbox.y + bbox.height / 2, bbox.x + bbox.width + 25, bbox.y + bbox.height / 2).attr({
                stroke: 'rgba(121,190,215,0.5)',
                strokeWidth: 1,
                id: 'editElement-line',
                class: 'line'
            }).transform(element.transform());

            svg.circle(r + 2).move(bbox.x - r / 2 - 1 + bbox.width + 25, bbox.y - r / 2 - 1 + bbox.height / 2).attr({
                fill: "#ffffff",
                stroke: "#132d28",
                cursor: "grab",
                id: 'editElement-rotate',
                class: 'circle'
            }).transform(element.transform());

            const editRight = svg.circle(r).move(bbox.x - r / 2 + bbox.width, bbox.y - r / 2 + bbox.height / 2).attr({
                fill: "#ffffff",
                stroke: "#132d28",
                cursor: "e-resize",
                id: 'editElement-east',
                class: 'circle'
            }).transform(element.transform());

            const editLeft = svg.circle(r).move(bbox.x - r / 2, bbox.y - 4 + bbox.height / 2).attr({
                fill: "#ffffff",
                stroke: "#132d28",
                cursor: "e-resize",
                id: 'editElement-west',
                class: 'circle'
            }).transform(element.transform());

            const editUp = svg.circle(r).move(bbox.x - r / 2 + bbox.width / 2, bbox.y - r / 2).attr({
                fill: "#ffffff",
                stroke: "#132d28",
                cursor: "n-resize",
                id: 'editElement-north',
                class: 'circle'
            }).transform(element.transform());

            const editBottom = svg.circle(r).move(bbox.x - r / 2 + bbox.width / 2, bbox.y - r / 2 + bbox.height).attr({
                fill: "#ffffff",
                stroke: "#132d28",
                cursor: "n-resize",
                id: 'editElement-south',
                class: 'circle'
            }).transform(element.transform());

            const editCornerUpLeft = svg.circle(r).move(bbox.x - r / 2, bbox.y - r / 2).attr({
                fill: "#e3e3e3",
                stroke: "#132d28",
                cursor: "nw-resize",
                id: 'editElement-circle6',
                class: 'circle'
            }).transform(element.transform());

            const editCornerUpRight = svg.circle(r).move(bbox.x - r / 2 + bbox.width, bbox.y - r / 2).attr({
                fill: "#e3e3e3",
                stroke: "#132d28",
                cursor: "sw-resize",
                id: 'editElement-circle7',
                class: 'circle'
            }).transform(element.transform());

            const editCornerBottomLeft = svg.circle(r).move(bbox.x - r / 2, bbox.y - r / 2 + bbox.height).attr({
                fill: "#e3e3e3",
                stroke: "#132d28",
                cursor: "sw-resize",
                id: 'editElement-circle8',
                class: 'circle'
            }).transform(element.transform());

            const editCornerBottomRight = svg.circle(r).move(bbox.x - r / 2 + bbox.width, bbox.y - r / 2 + bbox.height).attr({
                fill: "#e3e3e3",
                stroke: "#132d28",
                cursor: "nw-resize",
                id: 'editElement-circle9',
                class: 'circle'
            }).transform(element.transform());

        }
        const deleteAllEditElements = () => {
            const rect = svg.find('.rect');
            if (rect.length > 0) {
                rect.map(element => element.remove());
            }
            deleteCircleEditElements();
        }
        const deleteCircleEditElements = () => {
            const editElements = svg.find('.circle');
            if (editElements.length > 0) {
                editElements.map(element => element.remove());
            }
            const line = svg.find('.line');
            if (line.length > 0) {
                line.map(element => element.remove());
            }
        }

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
                    const rect = svg.findOne('.rect');
                    if (event.target.id.includes('rotate')) svg.remember('elementRotate', rect);
                    if (event.target.id.includes('rect')) svg.remember('elementEdit', rect);
                    deleteCircleEditElements();
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
                if (svg.remember('elementRotate')) {
                    const element = svg.remember('elementRotate');
                    const bbox = element.bbox();

                    const decompose = element.matrix().decompose(element.cx(), element.cy());
                    const cx = bbox.cx + decompose.translateX;
                    const cy = bbox.cy + decompose.translateY;

                    let calk = 180 / Math.PI * Math.atan((cy - event.offsetY) / (cx - event.offsetX));
                    const deg = (cx - event.offsetX < 0) ? calk : calk + 180;

                    element.rotate(-element.transform().rotate + deg);
                }
                if (svg.remember('elementEdit')) {
                    const element = svg.remember('elementEdit');

                    const tx = element.transform().translateX;
                    const ty = element.transform().translateY;
                    const angle = element.transform().rotate;
                    let tempw = (event.offsetX - tx);
                    let temph = (event.offsetY - ty);

                    console.log(tx, ty);

                    const bw = temph - (getTanFromDegrees(angle) * tempw);
                    const tempww = (bw / (getTanFromDegrees(90 + angle) - getTanFromDegrees(angle)));
                    const tempwh = getTanFromDegrees(angle) * tempww + bw;

                    const bh = temph - (getTanFromDegrees(90 + angle) * tempw);
                    const temphw = (bh / (getTanFromDegrees(angle) - getTanFromDegrees(90 + angle)));
                    const temphh = getTanFromDegrees(angle) * temphw;

                    let w = Math.sqrt(Math.pow((tempw - tempww), 2) + Math.pow(temph - tempwh, 2));
                    let h = Math.sqrt(Math.pow((tempw - temphw), 2) + Math.pow(temph - temphh, 2));
                    if (angle !== 0) {
                        if (angle < 0) {
                            if (tempww < 0) h = -(h);
                            if (temphh > 0) w = -(w);
                        } else {
                            if (tempww > 0) h = -(h);
                            if (temphh < 0) w = -(w);
                        }
                    }
                    element.center(w, h);
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
                    deleteAllEditElements()
                    createEditElementByElement(activeElement, 8)
                }
                if (svg.remember('elementEdit')) {
                    const element = svg.remember('elementEdit');
                    const bbox = element.bbox();
                    const activeElement = svg.remember('activeElement');
                    activeElement.move(bbox.x, bbox.y);
                    svg.remember('elementEdit', null);
                    deleteAllEditElements()
                    createEditElementByElement(activeElement, 8)
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

                            deleteAllEditElements();
                            svg.remember('activeElement', activeElement);
                            createEditElementByElement(activeElement, 8);
                        }
                    } else {
                        const activeElement = svg.findOne('#' + event.target.id);

                        console.log(activeElement.transform());

                        svg.remember('activeElement', activeElement);
                        createEditElementByElement(activeElement, 8);
                    }
                } else {
                    if (svg.remember('activeElement')) {
                        deleteAllEditElements();
                        svg.remember('activeElement', null);
                    }
                }
            }
        })

        if (props.activeTool === null) {
            svg.off();
            svg.remember('activeElement', null);
            deleteAllEditElements();
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