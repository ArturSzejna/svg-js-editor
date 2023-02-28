
export function getTanFromDegrees(degrees) {
    return Math.tan(degrees * Math.PI / 180);
}

export function rotateElement(event, element){
    const bbox = element.bbox();

    const decompose = element.matrix().decompose(element.cx(), element.cy());
    const cx = bbox.cx + decompose.translateX;
    const cy = bbox.cy + decompose.translateY;

    let calk = 180 / Math.PI * Math.atan((cy - event.offsetY) / (cx - event.offsetX));
    const deg = (cx - event.offsetX < 0) ? calk : calk + 180;

    return -element.transform().rotate + deg
}

export function moveElement(event, element) {

    const tx = element.transform().translateX;
    const ty = element.transform().translateY;
    const angle = element.transform().rotate;
    let tempw = (event.offsetX - tx);
    let temph = (event.offsetY - ty);

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

    return {
        cx: w,
        cy: h
    }

}