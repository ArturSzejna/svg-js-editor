export const arrayToString = (array) => {
    let d = '';
    // eslint-disable-next-line array-callback-return
    array.map(point => point.map(element => {
        d = d + element + " "
    }));
    return d;
}

export const stringToArray = (d) => {
    let pathArray = [];
    let tab;
    d.split(' ').forEach(element => {
        if (element === "M" || element === "L" || element === "Q"){
            if (tab) pathArray.push(tab);
            tab = [];
            tab.push(element);
        } else {
            tab.push(element);
        }
    })
    pathArray.push(tab);
    return pathArray;

}