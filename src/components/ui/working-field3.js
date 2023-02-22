import {useEffect, useRef, useState} from "react";
import {SVG} from "@svgdotjs/svg.js";

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

            const rect = svg.rect(bbox.width, bbox.height).move(bbox.x, bbox.y).attr({
                fill: "rgba(161,230,255,0.5)",
                stroke: "rgba(121,190,215,0.5)",
                id: 'editElement-rect',
                class: 'rect'
            }).transform(element.transform());

            const line = svg.line(bbox.x + bbox.width, bbox.y + bbox.height / 2, bbox.x + bbox.width + 25, bbox.y + bbox.height / 2).attr({
                stroke: 'rgba(121,190,215,0.5)',
                strokeWidth: 1,
                id: 'editElement-line',
                class: 'line'
            }).transform(element.transform());

            const rotateCircle = svg.circle(r + 2).move(bbox.x - r / 2 - 1 + bbox.width + 25, bbox.y - r / 2 - 1 + bbox.height / 2).attr({
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
            if (props.activeTool === 'rectangle') {
                const rect = svg.rect(10, 10).move(event.offsetX, event.offsetY);
                rect.attr({
                    fill: "rgba(161,230,255,0.5)",
                    stroke: "rgba(121,190,215,0.5)",
                    id: 'rect' + createId
                })
                rect.remember("active", false);
                setCreateId(createId + 1);
                svg.remember('element', rect);
            }
            if (props.activeTool === 'cursor') {
                console.log(event.target.id);
                if (event.target.id && event.target.id.includes('editElement')) {
                    if (event.target.id.includes('rotate')) {
                        const rect = svg.findOne('.rect');
                        svg.remember('elementRotate', rect);
                        deleteCircleEditElements();
                    }
                    if (event.target.id.includes('rect')) {
                        const rect = svg.findOne('.rect');
                        svg.remember('elementEdit', rect);
                        deleteCircleEditElements();
                    }
                    // if (event.target.id.includes('east')) {
                    //     const rect = svg.findOne('.rect');
                    //     svg.remember('elementEast', rect);
                    //     deleteCircleEditElements();
                    // }
                }
            }
        })

        svg.on('mousemove', event => {
            if (props.activeTool === 'rectangle') {
                if (svg.remember("element")) {
                    const rect = svg.remember("element");
                    const bbox = rect.bbox();

                    let width, height;

                    if (event.offsetX > bbox.x) width = event.offsetX - bbox.x;
                    else width = 1;

                    if (event.offsetY > bbox.y) height = event.offsetY - bbox.y;
                    else height = 1;

                    rect.attr({width: width, height: height});
                }
            }
            if (props.activeTool === 'cursor') {
                if (svg.remember('elementRotate')) {
                    const element = svg.remember('elementRotate');
                    const bbox = element.bbox();

                    let calk = 180 / Math.PI * Math.atan((bbox.cy - event.offsetY) / (bbox.cx - event.offsetX));
                    const deg = (bbox.cx - event.offsetX < 0) ? calk : calk + 180;

                    element.rotate(-element.transform().rotate + deg);
                    console.log(bbox, element.rbox());
                }
                if (svg.remember('elementEdit')) {
                    const element = svg.remember('elementEdit');

                    element.center(event.offsetX, event.offsetY);
                    console.log(element.attr());
                }
                // if (svg.remember('elementEast')) {
                //     const element = svg.remember('elementEast');
                //     const bbox = element.bbox();
                //     console.log(bbox);
                //
                //     const width = event.offsetX - bbox.x;
                //
                //     element.attr({
                //         width: width
                //     });
                // }

            }
        })

        svg.on("mouseup", () => {
            if (props.activeTool === 'rectangle') {
                const rect = svg.remember('element');
                rect.attr({
                    fill: "#abe538",
                    stroke: "#aac316"
                })
                svg.remember('element', null);
                props.setActiveTool(null);
            }
            if (props.activeTool === 'cursor') {
                if (svg.remember('elementRotate') ) {
                    const element = svg.remember('elementRotate');
                    const activeElement = svg.remember('activeElement');
                    activeElement.rotate(-activeElement.transform().rotate + element.transform().rotate);
                    svg.remember('elementRotate', null);
                    deleteAllEditElements()
                    createEditElementByElement(activeElement, 8)
                    console.log(activeElement.bbox(), activeElement.transform());
                }
                if (svg.remember('elementEdit')) {
                    const element = svg.remember('elementEdit');
                    const bbox = element.bbox();
                    const activeElement = svg.remember('activeElement');
                    activeElement.move(bbox.x, bbox.y);
                    svg.remember('elementEdit', null);
                    deleteAllEditElements()
                    createEditElementByElement(activeElement, 8)
                    console.log(activeElement.bbox(), activeElement.transform());
                }
                // if (svg.remember('elementEast')) {
                //     const element = svg.remember('elementEast');
                //     const bbox = element.bbox();
                //     const activeElement = svg.remember('activeElement');
                //     activeElement.attr({
                //         width: bbox.width
                //     })
                //     svg.remember('elementEast', null);
                //     deleteAllEditElements()
                //     createEditElementByElement(activeElement, 8)
                // }
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
                            deleteAllEditElements();
                            svg.remember('activeElement', activeElement);
                            createEditElementByElement(activeElement, 8);
                        }
                    } else {
                        const activeElement = svg.findOne('#' + event.target.id);
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