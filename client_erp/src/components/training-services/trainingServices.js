//calculate Weekday on German
export function calculateDay(date) {
  const daysOfWeek = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  return daysOfWeek[new Date(date).getDay()];
}

//render Members with correct Names
export function renderMembers(array) {
  if (array) {
    const members = JSON.parse(array);
    return members.map((member, index) => {
      return (
        <h6 className="text-secondary" key={index}>
          {member}
        </h6>
      );
    });
  }
}

//opden accordion in Archive
export const showTrainingInArchive = async (id) => {
  const accordionToOpen = document.getElementById(id);
  if (accordionToOpen.classList.contains("show")) {
    accordionToOpen.classList.remove("show");
  } else {
    accordionToOpen.classList.add("show");
  }
};

//open accordion of Trainings Table
export const showTraining = async (id, state) => {
  const accordionToOpen = document.getElementById(id);
  if (accordionToOpen.classList.contains("show")) {
    accordionToOpen.classList.remove("show");
  } else {
    const items = document.getElementsByName("nameID");
    for (let item of items) {
      item.classList.remove("show");
    }
    accordionToOpen.classList.add("show");
    const trainings = state.trainings;
    for (let training of trainings) {
      if (training.id === id) {
        const editTrainingID = id;
        const updateTraining_tags = training.tags;
        const updateTraining_date = training.date;
        const updateTraining_time = training.time;
        const updateTraining_loginExpireDate = training.loginExpireDate;
        const updateTraining_loginExpireTime = training.loginExpireTime;
        const updateTraining_maxMember = training.maxMember;
        return {
          editTrainingID,
          updateTraining_tags,
          updateTraining_date,
          updateTraining_time,
          updateTraining_loginExpireDate,
          updateTraining_loginExpireTime,
          updateTraining_maxMember,
        };
      }
    }
  }
};
