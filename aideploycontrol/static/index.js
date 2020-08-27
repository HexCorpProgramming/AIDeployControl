
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

function launchAI() {
    setButtonsDisabled(true);
    setFeedback("Your request is being handled. Please stand by.");
    axios.post('/launch').then(() => {
        setFeedback("Launched successfullly.");
    }).catch((error) => {
        console.log(error);
        setFeedback("There was an error launching the AI. Please make sure it is not already running before attempting this operation.");
    }).finally(() => {
        setButtonsDisabled(false)
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
        setButtonsDisabled(false)
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
        setButtonsDisabled(false)
    });
}