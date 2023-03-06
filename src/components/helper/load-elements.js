export const createElements = (svg, elements) => {
    svg.children().remove();

    elements.forEach(child => {
        let transform;
        if (child.properties.transform) transform = child.properties.transform.slice(7, child.properties.transform.length-1).split(',');
                            
        let element;
        switch (child.tagName) {
        case "rect":
            element = svg.rect(child.properties.width, child.properties.height)
            .move(child.properties.x, child.properties.y);
            break;
        case 'ellipse':
            element = svg.ellipse(child.properties.rx*2, child.properties.ry*2)
            .center(child.properties.cx, child.properties.cy);
            break;
        case 'line':
            element = svg.line(child.properties.x1, child.properties.y1, child.properties.x2, child.properties.y2);
            break;
        case 'path':
            element = svg.path().attr({d: child.properties.d});
            break;
        default:
        }

        element.stroke({color: child.properties.stroke, opacity: child.properties['stroke-opacity'], width: child.properties['stroke-width']})
        .fill(child.properties.fill)
        .attr({id: child.properties.id});

        if (child.properties.transform) 
                    element.transform({a: transform[0], b: transform[1], c: transform[2], d: transform[3], e: transform[4], f: transform[5]});
    });
}