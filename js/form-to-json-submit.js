
async function performPostHttpRequest(fetchLink, headers, body) {

    try {
        const rawResponse = await fetch(fetchLink, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
        const content = await rawResponse.json();
        return content;
    }
    catch(err) {
        console.error(`Error at fetch POST: ${err}`);
        throw err;
    }
}

async function submitForm(e, form) {
    e.preventDefault();

    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.disabled = true;

    const jsonFormData = { };
    for(const pair of new FormData(form)) {
        if(pair[0]=="email")
            jsonFormData[pair[0]] = pair[1];
        if(pair[0]=="subject")
            jsonFormData[pair[0]] = ''.concat("[UseGalaxy]:",pair[1]);
        if(pair[0]=="message")
            jsonFormData[pair[0]] = pair[1];
    }

    const headers = {
        "Content-Type": "application/json",
    };

    const response = await performPostHttpRequest(`https://genap.ca/api/1/contact_us/send_email`, headers, jsonFormData);

    // console.log(response);

    const labelfeedback = document.getElementById('feedback');
    if(response)
        labelfeedback.innerText = "Your request has been transmitted successfully!";
        // window.location = `/`;
    else
       labelfeedback.innerText = "Error. Request not transmitted. Please retry!";

}


//////////////////////////////////////////////////////////////////
// Listeners

const helpForm = document.querySelector("#helpForm");
if(helpForm) {
    helpForm.addEventListener("submit", function(e) {
        submitForm(e, this);
    });
}

