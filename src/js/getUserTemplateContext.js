import getUsersOperatorCode from "./getUsersOperatorCode";

function getUserTemplateContext(user) {
  return {
    picture: user.picture.large,
    fullname: user.name.first + " " + user.name.last,
    gender: user.gender,
    cell: {
      raw: user.cell,
      edited: user.cell.replace(/[-()\s]/g, ""),
    },
    code: getUsersOperatorCode(user.cell),
    email: user.email,
    location: {
      state: user.location.state,
      city: user.location.city,
      street: {
        name: user.location.street.name,
        number: user.location.street.number,
      },
    },
    dob: new Date(user.dob.date).toLocaleDateString(),
    registered: new Date(user.registered.date).toLocaleDateString(),
    age: user.dob.age,
    nat: user.nat,
  };
}

export default getUserTemplateContext;
