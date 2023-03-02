import {stringToArray} from "./helper";

export const createEditElementByElement = (svg, element, r) => {
    const bbox = element.bbox();

    svg.rect(bbox.width, bbox.height).move(bbox.x, bbox.y).stroke({color: '#FFBE00FF', opacity: 1, width: 2}).attr({
        fill: "rgba(255,255,255,0.01)",
        id: 'editElement-rect',
        class: 'rect'
    }).transform(element.transform());

    svg.circle(r).move(bbox.x - r / 2 + bbox.width, bbox.y - r / 2 + bbox.height / 2).attr({
        fill: "#ffffff",
        stroke: "#132d28",
        cursor: "alias",
        id: 'editElement-stretch-east',
        class: 'circle'
    }).transform(element.transform());

    svg.circle(r).move(bbox.x - r / 2, bbox.y - 4 + bbox.height / 2).attr({
        fill: "#ffffff",
        stroke: "#132d28",
        cursor: "alias",
        id: 'editElement-stretch-west',
        class: 'circle'
    }).transform(element.transform());

    svg.circle(r).move(bbox.x - r / 2 + bbox.width / 2, bbox.y - r / 2).attr({
        fill: "#ffffff",
        stroke: "#132d28",
        cursor: "alias",
        id: 'editElement-stretch-north',
        class: 'circle'
    }).transform(element.transform());

    svg.circle(r).move(bbox.x - r / 2 + bbox.width / 2, bbox.y - r / 2 + bbox.height).attr({
        fill: "#ffffff",
        stroke: "#132d28",
        cursor: "alias",
        id: 'editElement-stretch-south',
        class: 'circle'
    }).transform(element.transform());

    svg.circle(r).move(bbox.x - r / 2, bbox.y - r / 2).attr({
        fill: "#e3e3e3",
        stroke: "#132d28",
        cursor: "alias",
        id: 'editElement-stretch-north-west',
        class: 'circle'
    }).transform(element.transform());

    svg.circle(r).move(bbox.x - r / 2 + bbox.width, bbox.y - r / 2).attr({
        fill: "#e3e3e3",
        stroke: "#132d28",
        cursor: "alias",
        id: 'editElement-stretch-north-east',
        class: 'circle'
    }).transform(element.transform());

    svg.circle(r).move(bbox.x - r / 2, bbox.y - r / 2 + bbox.height).attr({
        fill: "#e3e3e3",
        stroke: "#132d28",
        cursor: "alias",
        id: 'editElement-stretch-south-west',
        class: 'circle'
    }).transform(element.transform());

    svg.circle(r).move(bbox.x - r / 2 + bbox.width, bbox.y - r / 2 + bbox.height).attr({
        fill: "#e3e3e3",
        stroke: "#132d28",
        cursor: "alias",
        id: 'editElement-stretch-south-east',
        class: 'circle'
    }).transform(element.transform());

}
export const createMoveElementByElement = (svg, element, r) => {
    const bbox = element.bbox();

    svg.rect(bbox.width, bbox.height).move(bbox.x, bbox.y).stroke({color: '#FFBE00FF', opacity: 1, width: 2}).attr({
        fill: "rgba(255,255,255,0.01)",
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
}
export const createEditPathElementByElement = (svg, element, r) => {
    const array = stringToArray(element.attr('d'));
    console.log(array);

    svg.path(array).stroke({color: '#FFBE00FF', opacity: 1, width: 2}).attr({
        fill: 'none',
        id: 'editElement-path',
        class: 'path'
    }).transform(element.transform());

    let index = 0;

    array.forEach(element => {
        svg.circle(r).stroke({color: '#132d28', opacity: 1, width: 2})
            .cx(element[1]).cy(element[2])
            .attr({
                fill: "#e3e3e3",
                    cursor: "grab",
                    id: 'editElement-point-'+ index,
                    class: 'point'
            });
        index++;
    })

}

export const deleteAllEditElements = (svg) => {
    deleteRectEditElements(svg);
    deletePathEditElements(svg);
}

export const deleteRectEditElements = (svg) => {
    deleteLineElements(svg);
    deleteCircleElements(svg);
    deleteRectElements(svg);
}
export const deleteRectElements = (svg) => {
    const rect = svg.find('.rect');
    if (rect.length > 0) {
        rect.map(element => element.remove());
    }
}
export const deleteLineElements = (svg) => {
    const line = svg.find('.line');
    if (line.length > 0) {
        line.map(element => element.remove());
    }
}
export const deleteCircleElements = (svg) => {
    const editElements = svg.find('.circle');
    if (editElements.length > 0) {
        editElements.map(element => element.remove());
    }
}
export const deletePathEditElements = (svg) => {
    deletePointElements(svg);
    deletePathElements(svg);
}
export const deletePointElements = (svg) => {
    const editElements = svg.find('.point');
    if (editElements.length > 0) {
        editElements.map(element => element.remove());
    }
}
export const deletePathElements = (svg) => {
    const editElements = svg.find('.path');
    if (editElements.length > 0) {
        editElements.map(element => element.remove());
    }
}