import {useEffect, useState} from "react";

const PathCreator = (props) => {

    const {path_d} = props

    const [d, setD] = useState(null);

    const M = (x, y) => {
        setD(...[d], ['M', x, y]);
        return d;
    }
    const L = (x, y) => {
        setD(...[d], ['L', x, y]);
        return d;
    }
    const H = (x) => {
        setD(...[d], ['M', x]);
        return d;
    }
    const V = (y) => {
        setD(...[d], ['M', y]);
        return d;
    }
    const C = (x1, y1, x2, y2, x3, y3) => {
        setD(...[d], ['C', x1, y1, x2, y2, x3, y3]);
        return d;
    }
    const Q = (x1, y1, x2, y2) => {
        setD(...[d], ['Q', x1, y1, x2, y2]);
        return d;
    }
    const S = (x1, y1, x2, y2) => {
        setD(...[d], ['S', x1, y1, x2, y2]);
        return d;
    }
    const T = (x1, y1) => {
        setD(...[d], ['T', x1, y1]);
        return d;
    }
    const Z = () => {
        setD(...[d], ['Q']);
        return d;
    }

    useEffect(() => {
        console.log(path_d);
    }, [path_d])

    return PathCreator;
}

export default PathCreator;