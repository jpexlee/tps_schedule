var pdbid = "bs93artm9";//patients
var adbid = "bs93artnr";//appointments
var tdbid = "bs93artni";//trainers

//The function of this script:
//populate the <select> tag for patients and trainers by looking up all the records from each table in Quick Base
//End user will select a patient, time of day, day of week, trainer, and finally a start date and end date
//script will create a payload of all of the appointments that fit the criteria within the date range provided. 
//on submit, call Quick Base and create all of the appointments via payload


//create an empty object that will serve as a key value pair for patients and their record id(key field)
//when looping through all the patients, make their name the key, and the record id the value
/////////////////////////////////////////////////Vars//////////////////////////////////////////////////////////////////
//variables for Patients
var patientKeys = {};
var patients;
var headers = {
    'QB-Realm-Hostname': 'apeximaging.quickbase.com',
	'User-Agent': 'PC',
	'Authorization': 'QB-USER-TOKEN b8c8mp_fsc3_0_bbzmxyyb3fpzgcdfj29cdfs5x9h',
    'Content-Type': 'application/json'
}

var patientBody = {
    "from": pdbid,
    "select": [3,8]
}
var jbody = JSON.stringify(patientBody);

//variables for Services
var serviceKeys = {};
var services;
var headers = {
    'QB-Realm-Hostname': 'apeximaging.quickbase.com',
	'User-Agent': 'PC',
	'Authorization': 'QB-USER-TOKEN b8c8mp_fsc3_0_bbzmxyyb3fpzgcdfj29cdfs5x9h',
    'Content-Type': 'application/json'
}
var serviceBody = {
    "from": 'bs93artv4',
    'select': [3, 6, 7]
}

var sBody = JSON.stringify(serviceBody);

//variables for the Trainers
var trainerKeys = {};
var trainers;
var headers = {
    'QB-Realm-Hostname': 'apeximaging.quickbase.com',
	'User-Agent': 'PC',
	'Authorization': 'QB-USER-TOKEN b8c8mp_fsc3_0_bbzmxyyb3fpzgcdfj29cdfs5x9h',
    'Content-Type': 'application/json'
}
var trainerBody = {
    "from": tdbid,
    "select": [6,26]
}
var trbody = JSON.stringify(trainerBody);

//////////////////////////////////////////////////API//////////////////////////////////////////////////////////////////////

//////////run these functions onload to fill all of the selects with options
async function getPatients() {
    console.log("all good");
var patientEl = document.getElementById("patientList");
console.log("still good");
//first fetch all of the patients from the patients table. 
let patientReq = await fetch("https://api.quickbase.com/v1/records/query",
{
    method: 'POST',
    headers: headers,
    body: jbody
}).catch(err =>{console.log(err)});
let jsonpatients = await patientReq.json();
//console.log(patients);
//Ok now we have all the patients from the application. 
//now take your json response and put it into your render function 

    renderPatients(jsonpatients);
}

//api call to retrieve information for Trainers
async function getTrainers() {
    var trainerEl = document.getElementById("trainerList");

    let trainerReq = await fetch("https://api.quickbase.com/v1/records/query",
    {
        method: 'POST',
        headers: headers,
        body: trbody
    }).catch(err =>{console.log(err)});

    let jsonTrainers = await trainerReq.json();
    renderTrainers(jsonTrainers)
}
getTrainers();

//api call to retrieve Services
async function getServices() {
    var servicesEl = document.getElementById("assistedService")
    // var serviceDuration = document.getElementById("serviceDuration")

    let serviceReq = await fetch("https://api.quickbase.com/v1/records/query",
    {
        method: 'POST',
        headers: headers,
        body: sBody
    }).catch(err =>{console.log(err)});

    let jsonServices = await serviceReq.json();
    renderServices(jsonServices)
}
getServices();

//////////////////////////////////////////////end of API/////////////////////////////////////////////////////////////////////////




function addOptions() {
    var s = document.querySelector("#patients");
    s.option = person;
}

//use this function as an iterator through the messages array, choosing the next message to be displayed to the dom
function next() {

}

////////////////////////////////////////////Submit Functionality//////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // handleSubmit();
        postData();
        populateAppointments();
        displayMessages();
        
    })
})


/////////////////////////////////////////////////////Data Rendering///////////////////////////////////////////////////////////////

//this function will take the json response from our fetch and make it readable on a web page
function renderPatients(res) {
        if(!res) {
            console.log(res.status);
        }
    //create an empty array to store our values
        
        let list = [];
        list.push(`<option value = "default" selected >${'--Make a Selection--'}</option>`)
        for (var i=0;i<res.data.length;i++) {
            var name = res.data[i]["8"].value;
            var rid = res.data[i]["3"].value;
            //each name you find, create a key value with our patientKeys global object and assign the rid as the value with the name as the key
            //this way we will be able to add the rid to our payload when we create our appointments by looking up the name and returning the rid
            // patientKeys[name] = rid;
            list.push(`<option value = "${rid}">${name}</option>`);
            // list.push(`<option>${rid}</option>`);
        }
        //sort the names alphabetically, then join them without spaces so it's in good html format. 
        list = list.sort();
        list = list.join("");
        document.getElementById("patientList").innerHTML = `<select>${list}</select>`;
        // console.log(patientKeys);
    }
        
function renderTrainers(res){
        
    //create an empty array to store our values
        let list = [];
        list.push(`<option value = "default" selected >${'--Make a Selection--'}</option>`)
        for (var i=0;i<res.data.length;i++) {
            var name = res.data[i]["26"].value;
            var rid = res.data[i]["6"].value;
            //each name you find, create a key value with our patientKeys global object and assign the rid as the value with the name as the key
            //this way we will be able to add the rid to our payload when we create our appointments by looking up the name and returning the rid
            trainerKeys[name] = rid;
            list.push(`<option>${res.data[i]["26"].value}</option>`);
        }
        //sort the names alphabetically, then join them without spaces so it's in good html format. 
        list = list.sort();
        list = list.join("");
        document.getElementById("trainerList").innerHTML = `<select>${list}</select>`;
        // console.log(trainerKeys);
}

//render in the table of Services provided
function renderServices(res){

     let list = [];
        list.push(`<option value = "default" selected >${'--Make a Selection--'}</option>`)
        for (var i=0;i<res.data.length;i++) {
        var name = res.data[i]["6"].value;
        var rid = res.data[i]["3"].value;

        serviceKeys[name] = rid;
        list.push(`<option>${res.data[i]["26"]} </option>`);
    }
    

    list = list.sort();
    list = list.join("");
    document.getElementById("assistedService").innerHTML = `<select>${list}</select>`;
}


//////////////////////////////////POSTING DATA ONTO TABLE///////////////////////////////////////////////////////
    //this is the function used to create a delay when iterating through the array in the troll code
    function sleep(ms = 50){
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }




    //This is the troll code function
    // async function displayMessages() {
    //     var messageDom = document.getElementById("message");
    //     var messages = [
    //         "Cross referencing mainframe debug executor...",
    //         "resetting interrupt request...",
    //         "Base64 encoding array databytes...",
    //         "Algorithmically caching coprocessor output log via readable stream...",
    //         "swapping signed and unsigned bits...",
    //         "storing keys assigned to hexadecimal cascade...",
    //         "Encrypting cross origin stack overflow...",
    //         "Formatting z coordinates to distro hash...",
    //         "Reticulating agregate net memory...",
    //         "Recursively subdividing euclidean space into convex sets...",
    //         "Inverting binary cryptographic memory userspace...",
    //         "Cleansing X086 inline assembly...",
    //         "Abstracting polymorphic middleware API's",
    //         "Complete, you may now close this window."
    //     ];
    //     //loop through each message and add it as a text node every 3 seconds
    //     for(var m=0;m<messages.length;m++) {
    //         var text = messages[m];
            
    //         await sleep(2000);

    //         var node = document.createTextNode(text);
    //         messageDom.appendChild(node);
    //     }
    // }




//sample code, disregard
var body = {
"to": "bqqux9gcz",
"data":[
    {"14":{
        "value": "2022-10-10"
    },
    "6":{
        "value": "10:00am"
    },
    "9": {
        "value": "135"
    },
    "11": {
        "value": "Kristen Sanchez"
    },
    "18": {
        "value": "block"
    }
}

],
"fieldsToReturn": [6,9,11,14,18]
};

//Each block within the data array represents a record. Within each block specify the fid values as key value pairs