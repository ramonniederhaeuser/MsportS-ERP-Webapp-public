import React, { Component } from "react";
import {
  calculateDay,
  renderMembers,
  showTrainingInArchive,
} from "../training-services/trainingServices";
import { fetchTrainings } from "./../common-services/fetchTrainings";

class TrainingArchive extends Component {
  state = {
    trainings: [],
  };

  renderTableData() {
    return this.state.trainings.map((training, index) => {
      const { id, tags, date, time, maxMember, loggedMembersName } = training;
      const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, `-`);
      if (date < currentDate) {
        return (
          <tr key={id}>
            <td>
              <div className="accordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button bg-dark text-light fw-bold"
                      onClick={() => showTrainingInArchive(id)}
                    >
                      {calculateDay(date)} {date}
                    </button>
                  </h2>
                  <div className="accordion-collapse collapse" id={id}>
                    <div className="accordion-body text-dark fw-bold">
                      <p>ID: {id}</p>
                      <p>Tags: {tags}</p>
                      <p>Datum: {date}</p>
                      <p>Uhrzeit: {time}</p>
                      <p>Maximale Teilnehmer: {maxMember}</p>
                      {renderMembers(loggedMembersName)}
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        );
      }
      return null;
    });
  }

  componentDidMount() {
    fetchTrainings().then((res) => {
      this.setState({
        trainings: res,
      });
    });
  }

  render() {
    const { trainings } = this.state;
    return (
      <React.Fragment>
        <div className="bg-dark settings-menu">
          <div className="p-3">
            <h2 className="text-light mb-5">Archiv</h2>
            {trainings.length > 0 ? (
              <div className="table-responsive border rounded">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Training</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderTableData()}</tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TrainingArchive;
