
const Button = (props) => {

    const style = "w-[40px] h-[40px] border border-gray-300 rounded-lg flex items-center " +
        "justify-center bg-stone-200 hover:bg-stone-300 text-stone-600 ";

    const focus = props.active ? "bg-yellow-200" : "bg-stone-200";

    return (
        <button
            className={style + focus}
            onClick={props.click}
        >
            {props.children}
        </button>
    )
}

export default Button;