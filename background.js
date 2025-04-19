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
    // Removed pointer-events and user-select
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
    span.style.textDecorationColor = "blue";
    // Removed pointer-events and user-select restrictions
    span.appendChild(range.extractContents());
    range.insertNode(span);

    selection.removeAllRanges();
}  
