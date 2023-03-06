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

export const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

export const saveSvg = async () => {
    const svg = document.getElementsByName('svg')[0].innerHTML;
    const blob = new Blob([svg], {type: "image/svg+xml"});
    const options = {
        suggestedName: 'svg_file.svg',
        types: [{
            accept: {'image/svg+xml': ['.svg']},
        }]
    }
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
  }