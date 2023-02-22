import {useEffect, useRef, useState} from "react";
import Snap from 'snapsvg-cjs';

const WorkingField = (props) => {

    const svgRef = useRef(null);

    const [pageSize, setPageSize] = useState({
        width: 500,
        height: 600
    });

    const svg = Snap(svgRef.current);
    svg.data("active", true);

    useEffect(() => {

        if (props.activeTool === "rectangle") {
            svg.mousedown((e) => {

                const rect = svg.rect(e.offsetX, e.offsetY, 1, 1);
                rect.attr({
                    fill: "rgba(150,227,255,0.5)",
                    stroke: "rgba(131,200,225,0.5)",
                    strokeDasharray: 4,
                    id: Date.now()
                })
                rect.data("active", false);

                svg.mousemove((e) => {
                    const bbox = rect.getBBox();
                    let width, height;

                    if (e.offsetX > bbox.x) {
                        width = e.offsetX - bbox.x;
                    } else {
                        width = 1;
                    }

                    if (e.offsetY > bbox.y) {
                        height = e.offsetY - bbox.y;
                    } else {
                        height = 1;
                    }

                    rect.attr({
                        width: width,
                        height: height,
                    });
                });

                svg.mouseup(() => {
                    svg.unmousemove();
                    svg.unmouseup();
                    rect.attr({
                        fill: "#2d838c",
                        stroke: "#1c727b",
                        strokeWidth: 2,
                        strokeDasharray: "none"
                    })
                });

                rect.click(() => {
                    if (rect.data("active") === false) {
                        rect.data("active", true);
                        console.log(rect.data("active"));
                        rect.attr({
                            fill: "rgba(161,230,255,0.5)",
                            stroke: "rgba(131,200,225,0.5)",
                            strokeDasharray: 4,
                        })

                        const bbox = rect.getBBox();
                        const rectUp = svg.rect(bbox.x - 3 + bbox.width / 2, bbox.y - 3, 8, 6);
                        rectUp.attr({
                            fill: "#2d838c",
                            stroke: "#1c727b",
                            strokeWidth: 2,
                            strokeDasharray: "none",
                            cursor: "n-resize"
                        })
                        const rectBottom = svg.rect(bbox.x - 3 + bbox.width / 2, bbox.y + bbox.height - 3, 8, 6);
                        rectBottom.attr({
                            fill: "#2d838c",
                            stroke: "#1c727b",
                            strokeWidth: 2,
                            strokeDasharray: "none",
                            cursor: "n-resize"
                        })
                        const rectLeft = svg.rect(bbox.x-3, bbox.y-3 + bbox.height/2, 6, 8);
                        rectLeft.attr({
                            fill: "#2d838c",
                            stroke: "#1c727b",
                            strokeWidth: 2,
                            strokeDasharray: "none",
                            cursor: "e-resize"
                        })
                        const rectRight = svg.rect(bbox.x-3 + bbox.width, bbox.y-3 + bbox.height/2, 6, 8);
                        rectRight.attr({
                            fill: "#2d838c",
                            stroke: "#1c727b",
                            strokeWidth: 2,
                            strokeDasharray: "none",
                            cursor: "e-resize"
                        })

                        rectRight.mousedown(() => {
                            rectRight.data("active", true);
                        })

                        rectRight.mousemove((e) => {
                            if (rectRight.data("active")) {
                                rectRight.attr({
                                    x: e.offsetX,
                                    y: e.offsetY
                                })
                            }
                        })

                        rectRight.mouseup(() => {
                            rectRight.data("active", false);
                        })



                    } else {
                        rect.data("active", false);
                        console.log(rect.data("active"));
                        rect.attr({
                            fill: "#2d838c",
                            stroke: "#1c727b",
                            strokeWidth: 2,
                            strokeDasharray: "none"
                        })
                    }
                })
            });
        }

        if (props.activeTool === null) {
            svg.unmousedown();
            svg.unmouseup();
        }

        if (props.activeTool === "cursor") {
            svg.unmousedown();
            console.log(svg.children());
        }

    }, [props.activeTool])

    //
    // useEffect(() => {
    //     const svg = Snap(svgRef.current);
    //
    //     const unbind = () => {
    //         svg.unmousedown();
    //         svg.unmousemove();
    //         svg.unmouseup();
    //     }
    //
    //     if (props.activeTool === "rectangle") {
    //         console.log("rectangle");
    //
    //         unbind();
    //
    //         svg.mousedown(e => {
    //             const rect = svg.rect(e.offsetX, e.offsetY, 50, 50);
    //             rect.data("active", true);

    // element.mouseover(e => {
    //     console.log("over");
    // })
    //
    // element.mouseout(e => {
    //     console.log("out");
    // })
    //
    // element.click(e => {
    //     element.data("active", true);
    //     console.log("click");
    //     element.attr({
    //         fill: "rgba(161,230,255,0.5)",
    //         stroke: "rgba(131,200,225,0.5)",
    //         strokeDasharray: 4,
    //     })
    // })
    // });

    // svg.mousemove(e => {
    //     if (element && element.data("active")) {
    //         const bbox = element.getBBox();
    //         console.log(bbox);
    //         console.log(e.offsetX, e.offsetY);
    //
    //         let width, height;
    //
    //         if (e.offsetX > bbox.x) {
    //             width = e.offsetX - bbox.x;
    //         } else {
    //             width = 1;
    //         }
    //
    //         if (e.offsetY > bbox.y) {
    //             height = e.offsetY - bbox.y;
    //         } else {
    //             height = 1;
    //         }
    //
    //         element.attr({
    //             width: width,
    //             height: height,
    //         });
    //     }
    // })
    //
    // svg.mouseup(() => {
    //     element.attr({
    //         fill: "#2d838c",
    //         stroke: "#1c727b",
    //         strokeWidth:2,
    //         strokeDasharray: "none"
    //     })
    //     element.data("active", false);
    // })
    //     }
    //
    //     if (props.activeTool === "cursor") {
    //         unbind();
    //         console.log("cursor");
    //     }
    //
    // }, [props.activeTool]);

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