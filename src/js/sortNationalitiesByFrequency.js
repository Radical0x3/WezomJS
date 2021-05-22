function sortNationalitiesByFrequency(obj) {
  let nationalities = [];
  for (let [key, value] of Object.entries(obj.nationalities)) {
    nationalities.push({ key, value });
  }
  nationalities.sort((a, b) => (a.value < b.value ? 1 : -1));

  return nationalities;
}

export default sortNationalitiesByFrequency;
