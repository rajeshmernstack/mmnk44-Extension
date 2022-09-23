
setInterval(() => {
    chrome.storage.local.get("kindledescription", function (retrieved_data) {
        if (retrieved_data.kindledescription != undefined) {
            document.querySelectorAll('iframe')[0].contentWindow.document.children[0].children[1].innerText = retrieved_data.kindledescription;
        }

    });
}, 5000);



