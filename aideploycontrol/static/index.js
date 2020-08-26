
function setButtonsDisabled(disabled) {
    document.querySelectorAll("button").forEach(element => {
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
    setElementsHidden("#success-launch", true);
    setElementsHidden("#error-launch", true);
    setElementsHidden("#waiting", false);
    axios.post('/launch').catch((error) => {
        console.log(error);
        setElementsHidden("#error-launch", false);
    }).finally(() => {
        setButtonsDisabled(false)
        setElementsHidden("#waiting", true);
        setElementsHidden("#success-launch", false);
    });
}

function stopAI() {
    setButtonsDisabled(true);
    setElementsHidden("#success-stop", true);
    setElementsHidden("#error-stop", true);
    setElementsHidden("#waiting", false);
    axios.post('/stop').catch(() => {
        setElementsHidden("#error-stop", false);
    }).finally(() => {
        setButtonsDisabled(false)
        setElementsHidden("#waiting", true);
        setElementsHidden("#success-stop", false);
    });
}