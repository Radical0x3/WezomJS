function getSeed(url) {
  return fetch(url)
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .then((data) => data.info);
}

export default getSeed;