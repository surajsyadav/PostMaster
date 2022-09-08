console.log("jdbefihevwbf");

let paramCount = 1;

function getChildTOString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';

let requestJosnBox = document.getElementById('requestJosnBox');


let json = document.getElementById('json');

json.addEventListener('click', () => {
    parameterBox.style.display = 'none';
    requestJosnBox.style.display = 'block';
})

let params = document.getElementById('params');

params.addEventListener('click', () => {
    requestJosnBox.style.display = 'none';
    parameterBox.style.display = 'block';
})


let parameterBtn = document.getElementById('parameterBtn');

let newParams = document.getElementById('newParams');

parameterBtn.addEventListener('click', () => {
    let string = `<div class="form-row my-2">
                <label for="urlfield" class="col-sm-2 col-form-label">Parameter ${paramCount + 1}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${paramCount + 1}" placeholder="Entr Parameter Key ${paramCount + 1}" />
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${paramCount + 1}" placeholder="Entr Parameter Value ${paramCount + 1}" />
                </div>
                <button  class="btn btn-primary deleteparam">-</button>
              </div>`
    let paramChild = getChildTOString(string);
    newParams.appendChild(paramChild);

    let deleteparam = document.getElementsByClassName('deleteparam');
    for (let item of deleteparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    paramCount++;
})


let submit = document.getElementById('submit');

submit.addEventListener('click', () => {
     document.getElementById('responseJosnText').innerHTML = "Please Wait... Fetching data...";
 

    let url = document.getElementById('urlfield').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    
    if (contentType === 'prams') {
        data = {};
        for (let i = 0; i < paramCount; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                
                data[key] = value;
                
            }
        }
        data = JSON.stringify(data);
    }
   else if(contentType ==='JSON') {
        data = document.getElementById('requestJosnText').value;
    }
    
    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);

    if(requestType=='GET'){
        fetch(url,{
            method:'GET'
        })
        .then((response)=> response.text())
        .then(data=>{
            document.getElementById('responseJosnText').innerHTML=data;
            Prism.highlightAll();
        })
    }

    else{
        fetch(url, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:data,
            
        })
        .then((response)=> response.text())
        .then(text=>{
            document.getElementById('responseJosnText').innerHTML=text;
            Prism.highlightAll();
        })
    }


})
