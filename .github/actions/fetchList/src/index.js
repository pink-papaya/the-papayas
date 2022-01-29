const core = require('@actions/core');
const axios = require('axios');
const fs = require('fs');

async function run() {
  try {
    const songListPath = 'src/assets/songs.json';
    const apiEndpoint = core.getInput('API_ENDPOINT');

    const response = await axios.get(apiEndpoint);

    const updatedSongList = response.data;
    const currentSongList = JSON.parse(fs.readFileSync(songListPath));

    // compare only the data part as the createdAt timestamps will always be different
    if (
      JSON.stringify(updatedSongList.data) !==
      JSON.stringify(currentSongList.data)
    ) {
      fs.writeFileSync(songListPath, JSON.stringify(updatedSongList));
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
