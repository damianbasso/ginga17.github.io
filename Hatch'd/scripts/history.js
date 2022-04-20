
async function getToken() {
    var resp = fetch("https://3snk1mux67.execute-api.ap-southeast-2.amazonaws.com/InvoiceStorage/auth/login?username=Frontend&password=Roo$ter100", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            
        })
        .then(response => response.json())
        // .then(data => token = data.token)
        .then(data => data.token)
        .then(data => getInvoices(data));
        // return token;

        // .then(data => getInvoices(data.token));
}

getToken()
// getToken()
// .then(getInvoices());

function getInvoice (invoice) {
    console.log("JASDKASDK " + invoice);
}

// var xmltext = "<sometag><someothertag></someothertag></sometag>";

function downloadXML(xmltext, invoiceName) {
    var filename = invoiceName + ".xml";
    var pom = document.createElement('a');
    var bb = new Blob([xmltext], {type: 'text/plain'});
    
    pom.setAttribute('href', window.URL.createObjectURL(bb));
    pom.setAttribute('download', filename);
    
    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
    pom.draggable = true; 
    pom.classList.add('dragout');
    
    pom.click()
}

function displayInvoices(invoices, token) {
    console.log("nnnnA");
    for (i in invoices) {
        console.log("ttt");

        btn = document.createElement("button");
        btn.innerHTML = "Download invoice " + invoices[i];
        btn.classList.add('download_button');
        btn.onclick = function( ) {
            fetch("https://3snk1mux67.execute-api.ap-southeast-2.amazonaws.com/InvoiceStorage/invoice?token=" + token + "&invoice_id=" + invoices[i], {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json'
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                
            })
            .then(response => response.text())
            .then(xml => downloadXML(xml, "Invoice" +invoices[i]));
            // .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            // .then(data => console.log(data));
            console.log("PSADNOJKANSJDNJKN");
        }//getInvoice(invoices[i]);
        document.getElementById("invoices").appendChild(btn)
    }
}

async function getInvoices(token) {
    // await getToken();
    console.log("JNASKNA " + token);
    fetch("https://3snk1mux67.execute-api.ap-southeast-2.amazonaws.com/InvoiceStorage/invoices?token=" + token, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        
    })
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => displayInvoices(data, token));
}



if(sessionStorage.getItem("darkmode") == "dark") {
    if(document.getElementById("bird")){
        document.getElementById("bird").src = "owl2.png";
    }
    document.getElementById("logo").src="logoDark.png"
    document.getElementById("darkModeButt").src="sun.png"
    darkMode=true;
    document.body.classList.toggle("dark-mode");
    document.documentElement.className = 'dark';
  }
  else {
    if(document.getElementById("bird")){
        document.getElementById("bird").src = "roostertrans.png";
    }
    document.getElementById("logo").src="logo.png"
    document.getElementById("darkModeButt").src="moon.png"
    document.documentElement.className = 'light';
    darkMode = false;
  }
  function toggleDarkMode() {
    if(darkMode == false) {
      sessionStorage.setItem('darkmode', 'dark')
      document.getElementById("logo").src="logoDark.png"
      document.getElementById("darkModeButt").src="sun.png"
      document.documentElement.className = 'dark';
      darkMode=true;
    }
    else {
      sessionStorage.setItem('darkmode', 'light')
      darkMode=false;

      document.getElementById("logo").src="logo.png"
      document.getElementById("darkModeButt").src="moon.png"
      document.documentElement.className = 'light';
    }
    document.body.classList.toggle("dark-mode");

  }


  
  function deleteHistoryEntry(elem) {
    $(elem).parent('div').remove();
  }

