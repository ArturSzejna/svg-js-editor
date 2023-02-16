import Button from "./buttons";

import {BsCircle, BsCursor} from 'react-icons/bs';
import {FaDrawPolygon} from 'react-icons/fa';
import {BiRectangle} from "react-icons/bi";

const Toolbar = (props) => {

    return (
        <section className="w-auto bg-white flex flex-col p-2 gap-2 border">
            <Button
                active={props.activeTool === "cursor"}
                click={() => props.click(props.activeTool !== "cursor" ? "cursor" : null)}>
                <BsCursor/>
            </Button>

            <Button
                active={props.activeTool === "circle"}
                click={() => props.click(props.activeTool !== "circle" ? "circle" : null)}>
                <BsCircle/>
            </Button>
            <Button
                active={props.activeTool === "polygon"}
                click={() => props.click(props.activeTool !== "polygon" ? "polygon" : null)}>
                <FaDrawPolygon/>
            </Button>
            <Button
                active={props.activeTool === "rectangle"}
                click={() => props.click(props.activeTool !== "rectangle" ? "rectangle" : null)}>
                <BiRectangle/>
            </Button>

        </section>
    )
}

export default Toolbar;