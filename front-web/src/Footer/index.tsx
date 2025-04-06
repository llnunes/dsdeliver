import "./styles.css";
import { ReactComponent as YoutubeImage} from "./youtube.svg";
import { ReactComponent as InstagramImage} from "./instagram.svg";
import { ReactComponent as LinkedinImage} from "./linkedin.svg";

function Footer() {
  return (
    <footer className="main-footer">
      App desenvolvido durante a 2ª ed. do evento Semana DevSuperior
      <div className="footer-icons">
        <a href="https://youtube.com" target="_new"><YoutubeImage /></a>
        <a href="https://linkedin.com" target="_new"><LinkedinImage /></a>
        <a href="https://instagram.com" target="_new"><InstagramImage /></a>
      </div>
    </footer>
  );
}
//1:34
export default Footer;