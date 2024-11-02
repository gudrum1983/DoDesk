import style from "./header.module.scss";
import {useNavigate} from "react-router-dom";

export default function Header(props: { url: string, textButton: string }) {

  const navigate = useNavigate();
  const {url, textButton} = props;

  const handleButtonClick = () => {
    navigate(`/${url}`);
  };

  return (
    <div className={style.header}>
      <h1>DoDesk</h1>
      <button type="button"  className={style.button} onClick={() => handleButtonClick()}>{textButton}</button>
    </div>
  )
}