function getParam(name) {

    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name)

    // console.log(urlParams.has('post')); // true
    // console.log(urlParams.get('action')); // "edit"
    // console.log(urlParams.getAll('action')); // ["edit"]
    // console.log(urlParams.toString()); // "?post=1234&action=edit"
    // console.log(urlParams.append('active', '1')); // "?post=1234&action=edit&active=1
}

async function getUserInfo() {
    
    if (window.location.pathname.indexOf("/login") > -1) {
        document.getElementById('userinfo').remove()    
        return
    }
    const response = await fetch('/userinfo');
    const jsonResponse = await response.json();
    document.getElementById('userinfo').innerHTML = jsonResponse.Message
}

let apidata = {}

async function getData(url) {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    apidata = JSON.stringify(jsonResponse);
}

async function bindTable(url) {

    await getData(url)

    var data = JSON.parse(apidata);
    var col = [];


    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    var table = document.createElement("table");
    table.setAttribute("class", "blueTable");
    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < data.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][col[j]];
        }
    }

    var divContainer = document.getElementById("table_div");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

}

async function bindList(url, input) {

    await getData(url);

    while (input.firstChild) {
      selectinputbox.removeChild(input.firstChild);
    }
  
    var option1 = document.createElement("option");
    option1.text = "select...";
    input.add(option1);
  
    JSON.parse(apidata).map(function (dataItem) {
      var option = document.createElement("option");
      option.text = dataItem['text']
      option.value = dataItem['value']
      input.add(option);
    })
  
  }

function validate(){
    let inputs = document.getElementsByClassName('required')
    var valid = true
    Array.from(inputs).forEach((item)=> {
        if (item.value.trim() === '' || item.value.trim() === 'select...') {
            item.style.border = '2px inset red'
            valid = false;
        }
    })
    return valid;
}

