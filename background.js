chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const func = command === "highlight-text" ? highlightSelection : underlineSelection;
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: func
        });
    });
});

function highlightSelection() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement("mark");
    span.style.backgroundColor = "yellow";
    span.style.pointerEvents = "none";
    span.style.userSelect = "none";
    span.appendChild(range.extractContents());
    range.insertNode(span);

    selection.removeAllRanges();
}

function underlineSelection() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.textDecoration = "underline";
    span.style.textDecorationColor = "green";
    span.style.pointerEvents = "none";
    span.style.userSelect = "none";
    span.appendChild(range.extractContents());
    range.insertNode(span);

    selection.removeAllRanges();
}
