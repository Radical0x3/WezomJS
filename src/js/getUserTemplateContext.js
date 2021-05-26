function getUserTemplateContext(user) {
  return {
    picture: user.picture.large,
    name: {
      first: user.name.first,
      last: user.name.last,
    },
    gender: user.gender,
    cell: {
      raw: user.cell,
      edited: user.cell.replace(/[()-\s]/g, ""),
    },
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
    nat: user.nat,
  };
}

export default getUserTemplateContext;
