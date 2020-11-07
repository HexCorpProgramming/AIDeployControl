
function setButtonsDisabled(disabled) {
    document.querySelectorAll(".button").forEach(element => {
        element.disabled = disabled;
    });
}

function setElementsHidden(selector, hidden) {
    document.querySelectorAll(selector).forEach(element => {
        if (hidden) {
            element.classList.add("hidden");
        } else {
            element.classList.remove("hidden");
        }
    });
}

function setFeedback(feedback) {
    document.getElementById("feedback").innerText = feedback;
    setElementsHidden("#feedback", !feedback);
}

function updateStatus() {
    axios.get("/status").then(status => {
        document.getElementById("ai-status").innerText = status.data.running ? "ONLINE" : "OFFLINE";
    });
}

function launchAI() {
    setButtonsDisabled(true);
    setFeedback("Your request is being handled. Please stand by.");
    axios.post('/launch').then(() => {
        setFeedback("Launched successfullly.");
    }).catch((error) => {
        console.log(error);
        setFeedback("There was an error launching the AI. Please make sure it is not already running before attempting this operation.");
    }).finally(() => {
        setButtonsDisabled(false);
        updateStatus();
    });
}

function stopAI() {
    setButtonsDisabled(true);
    setFeedback("Your request is being handled. Please stand by.");
    axios.post('/stop').then(() => {
        setFeedback("Stopped successfully.");
    }).catch(() => {
        setFeedback("There was an error stopping the AI. Please make sure it is running before attempting this operation.");
    }).finally(() => {
        setButtonsDisabled(false);
        updateStatus();
    });
}

function resetDB() {
    setButtonsDisabled(true);
    setFeedback("Your request is being handled. Please stand by.");
    axios.post('/reset-db').then(() => {
        setFeedback("Reset successfully.");
    }).catch(() => {
        setFeedback("There was an error resetting the database. Please make sure the AI is stopped and the DB was initialized.");
    }).finally(() => {
        setButtonsDisabled(false);
        updateStatus();
    });
}

updateStatus();