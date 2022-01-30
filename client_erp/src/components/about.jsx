import React from "react";
import icon76 from "../images/icons/Icon76.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <React.Fragment>
      {/* Header */}
      <div
        className="bg-dark p-2 d-flex justify-content-between align-items-center"
        style={{ height: "8vh" }}
      >
        <img src={icon76} alt="Company Logo"></img>
        <h2 className="text-light">About</h2>
        <Link
          to="/"
          className="btn text-light"
          style={{ borderLeft: "2px solid white" }}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="2x" />
        </Link>
      </div>
      <div className="container impressumCSS mt-5">
        <h2>Kontaktadresse</h2>
        <p>
          MsportS
          <br />
          Langfurristrasse 2<br />
          9562 Märwil
          <br />
          Schweiz
          <br />
        </p>
        <h2>Vertretungsberechtigte Personen</h2>
        <p>
          Marco Spiri, (The Coach) Inhaber
          <br />
          Ramon Niederhäuser, Verantwortlicher ERP programmierung
        </p>
        <h2>Haftungsausschluss</h2>
        <p>
          Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen
          Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und
          Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor
          wegen Schäden materieller oder immaterieller Art, welche aus dem
          Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten
          Informationen, durch Missbrauch der Verbindung oder durch technische
          Störungen entstanden sind, werden ausgeschlossen. Alle Angebote sind
          unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der
          Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu
          verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise
          oder endgültig einzustellen.
        </p>
        <h2>Haftung für Links</h2>
        <p>
          Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres
          Verantwortungsbereichs.
          <br />
          Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der
          Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr
          des Nutzers oder der Nutzerin.
        </p>
        <h2>Urheberrechte</h2>
        <p>
          Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder
          anderen Dateien auf der Website gehören ausschliesslich der Firma
          MsportS oder den speziell genannten Rechtsinhabern. Für die
          Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der
          Urheberrechtsträger im Voraus einzuholen.
        </p>
        <h2>Quelle</h2>
        <p>
          Dieses Impressum wurde am 17.04.2021 durch den
          Applikationsverantwortlichen Ramon Niederhäuser erstellt. <br />
          Die o.g. Person übernimmt keine Haftung.
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </React.Fragment>
  );
};

export default About;
