
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

function launchAI() {
    setButtonsDisabled(true);
    setElementsHidden("#success-launch, #error-launch", true);
    setElementsHidden("#waiting", false);
    axios.post('/launch').then(() => {
        setElementsHidden("#success-launch", false);
    }).catch((error) => {
        console.log(error);
        setElementsHidden("#error-launch", false);
    }).finally(() => {
        setButtonsDisabled(false)
        setElementsHidden("#waiting", true);
    });
}

function stopAI() {
    setButtonsDisabled(true);
    setElementsHidden("#success-stop, #error-stop", true);
    setElementsHidden("#waiting", false);
    axios.post('/stop').then(() => {
        setElementsHidden("#success-stop", false);
    }).catch(() => {
        setElementsHidden("#error-stop", false);
    }).finally(() => {
        setButtonsDisabled(false)
        setElementsHidden("#waiting", true);
    });
}