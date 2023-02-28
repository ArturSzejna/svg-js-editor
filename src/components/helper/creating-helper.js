export const createEditElementByElement = (svg, element, r) => {
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
export const deleteAllEditElements = (svg) => {
    const rect = svg.find('.rect');
    if (rect.length > 0) {
        rect.map(element => element.remove());
    }
    deleteCircleEditElements(svg);
}
export const deleteCircleEditElements = (svg) => {
    const editElements = svg.find('.circle');
    if (editElements.length > 0) {
        editElements.map(element => element.remove());
    }
    const line = svg.find('.line');
    if (line.length > 0) {
        line.map(element => element.remove());
    }
}