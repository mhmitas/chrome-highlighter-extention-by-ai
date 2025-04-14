chrome.commands.onCommand.addListener((command) => {
    if (command === "highlight-text") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: highlightSelection
            });
        });
    }
});

function highlightSelection() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement("mark");
    span.style.backgroundColor = "yellow";
    span.appendChild(range.extractContents());
    range.insertNode(span);

    // Clear selection after highlighting
    selection.removeAllRanges();
}
