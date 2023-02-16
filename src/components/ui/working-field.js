import {useEffect, useRef, useState} from "react";
import Snap from 'snapsvg-cjs';

const WorkingField = (props) => {

    const svgRef = useRef(null);
    const rectRef = useRef(null);

    const [pageSize, setPageSize] = useState({
        width: 500,
        height: 600
    })


    useEffect(() => {
        const svg = Snap(svgRef.current);


        const rect = Snap(rectRef.current);
        rect.attr({
            x: 324,
            y: 222,
            width: 84,
            height: 21,
            fill: 'red'
        });
        rect.drag(
            function(dx, dy) {
                this.attr({
                    transform: this.data("origTransform") + (this.data("origTransform") ? "T" : "t") + [dx, dy]
                });
            },
            function() {
                this.data("origTransform", this.transform().local);
            }
        );

        rect.mouseover(() => {
            rect.attr({ fill: "yellow" });
            const bbox = rect.getBBox();
            console.log(bbox.x, bbox.y, bbox.width, bbox.height)
            const rectEl = svg.rect(bbox.x, bbox.y, bbox.width, bbox.height);
            rectEl.attr({
                stroke: "black",
                strokeWidth: 1,
                fill: "none"
            });
            console.log(rectEl)
            rect.data("rectEl", rectEl); // zapisujemy referencję do elementu `rect` w atrybucie `data` elementu `draggable`
        });

        rect.mouseout(() => {
            rect.attr({ fill: "red" });
            const rectEl = rect.data("rectEl");
            if (rectEl) {
                rectEl.remove(); // usuwamy element `rect`, jeśli istnieje
                rect.removeData("rectEl"); // usuwamy referencję do elementu `rect` z atrybutu `data` elementu `draggable`
            }
        });
    }, [])

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
                    <rect ref={rectRef}/>
                </svg>
            </div>
        </div>
    )
}

export default WorkingField;