import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="text-center bg-light rounded-3 position-absolute top-50 start-50 translate-middle">
        <div className="p-4">
          <h2 className="text-dark">
            ER 404<br></br>
            Seite nicht gefunden
          </h2>
          <Link to="/" className="btn btn-outline-dark mt-3">
            Zurück
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
