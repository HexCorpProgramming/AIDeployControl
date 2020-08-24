
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
    setElementsHidden("#error-launch", true);
    setElementsHidden("#waiting", false);
    axios.post('/launch').then(Promise.resolve).catch(() => {
        setElementsHidden("#error-launch", false);
    }).finally(() => {
        setButtonsDisabled(false)
        setElementsHidden("#waiting", true);
    });
}

function stopAI() {
    setButtonsDisabled(true);
    setElementsHidden("#error-stop", true);
    setElementsHidden("#waiting", false);
    axios.post('/stop').then(Promise.resolve).catch(() => {
        setElementsHidden("#error-stop", false);
    }).finally(() => {
        setButtonsDisabled(false)
        setElementsHidden("#waiting", true);
    });
}