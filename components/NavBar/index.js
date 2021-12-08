import style from "./style.module.css"

export default function index() {
    return (
        <div className={style.container}>
            <div className={style.logo}>
                <h3>Solvee<span>.</span></h3>
            </div>
            
            <div className={style.hamburger + " " + "navActive"}>
                <div></div>
            </div>
        </div>
    )
}
