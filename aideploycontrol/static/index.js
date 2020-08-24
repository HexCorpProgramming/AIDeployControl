function launchAI() {
    axios.post('/launch');
}

function stopAI() {
    axios.post('/stop');
}