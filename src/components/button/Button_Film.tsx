
import './Button_Films.css'

interface Button_Film_Props {
    text: string;
    children?: React.ReactNode;
    onClick: () => void;
}
function Button_Film({text, children, onClick}: Button_Film_Props) {

  return (
    <>
        <button className="btn_films" onClick={onClick}>{text}</button>
        {
           children
        }
    </>

  )
}

export default Button_Film