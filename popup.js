document.getElementById("license-key-container").classList.add('d-none');
document.getElementById("main-container").classList.add('d-none');

chrome.storage.local.get("licensekey", function (retrieved_data) {
    if(retrieved_data.licensekey == undefined) {
        document.getElementById('verify-license-key').classList.add('d-none');
        document.getElementById("license-key-container").classList.remove("d-none");
    }else{

        validateLicenseKeyAtStartup(retrieved_data.licensekey);
    }
    // document.getElementById("saved-description").innerText = retrieved_data.kindledescription;
});
function validateLicenseKeyAtStartup(key) {
    
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://mmnk44.mernweb.com/wp-json/lmfwc/v2/licenses/validate/${key}`);
    xhr.setRequestHeader("Authorization", "Basic " + btoa("ck_523808b4183d8657861a1758ae0d3ccc7142f0bd:cs_99f70dc68b478e75a52eaebe15cc67bc2c93f062"));
    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 200) {
            let myResponse = JSON.parse(xhr.response);
            document.getElementById("license-key-container").classList.remove("d-none");
            document.getElementById('verify-license-key').classList.add('d-none');
        } else {
            let myResponse = JSON.parse(xhr.response);
            if (myResponse.success != undefined) {
                if (myResponse.success) {
                    document.getElementById('verify-license-key').classList.add('d-none');
                    document.getElementById("main-container").classList.remove("d-none");
                }
            }
        }
    };
}

chrome.storage.local.get("kindledescription", function (retrieved_data) {
    if (retrieved_data.kindledescription == undefined) {
        document.getElementById("saved-description").innerText = "No Any Saved Description Found";
    } else {
        document.getElementById("saved-description").innerText = retrieved_data.kindledescription;
    }
});




document.getElementById('save-description-btn').addEventListener('click', () => {
    let desc = document.getElementById('my-description').value;
    chrome.storage.local.set({
        kindledescription: desc
    }, function () {
        console.log("Descritption Saved");
    });

    chrome.storage.local.get("kindledescription", function (retrieved_data) {
        document.getElementById("saved-description").innerText = retrieved_data.kindledescription;
    });
});



document.getElementById("licensekey-submit-btn").addEventListener('click', () => {
    let licensekey = document.getElementById("licensekey").value;
    validateLicenseKey(licensekey)
})




function validateLicenseKey(key) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://mmnk44.mernweb.com/wp-json/lmfwc/v2/licenses/validate/${key}`);
    xhr.setRequestHeader("Authorization", "Basic " + btoa("ck_523808b4183d8657861a1758ae0d3ccc7142f0bd:cs_99f70dc68b478e75a52eaebe15cc67bc2c93f062"));
    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 200) {
            let myResponse = JSON.parse(xhr.response);
            document.getElementById('response-message').innerText = ""+myResponse.message;
        } else {
            let myResponse = JSON.parse(xhr.response);
            if (myResponse.success != undefined) {
                if (myResponse.success) {
                    document.getElementById('response-message').innerText = "License KEY OK"
                    chrome.storage.local.set({
                        licensekey: key
                    }, function () {
                        document.getElementById('response-message').innerText = "License KEY Saved Successfully"
                        location.reload()
                    });
                }
            }
        }
    };
    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            document.getElementById('response-message').innerText = "Loading";
        } else {
            document.getElementById('response-message').innerText = "Loading";
        }

    };
    xhr.onerror = function () {
        document.getElementById('response-message').innerText = "Error While Validating License Key";

    };
}