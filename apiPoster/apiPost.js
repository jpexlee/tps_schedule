let patientList = "", trainerList = "", serviceList = "", dayList = "", timeList = "";

async function handleDataChange(event) {
   if (event.target.id === 'patientList'){
       patientList = event.target.value;
    } else if (event.target.id === 'trainerList') {
        trainerList = event.target.value;
    } else if (event.target.id === 'assistedService') {
        serviceList = event.target.value;
    } else if (event.target.id === 'dayList') {
        dayList = event.target.value;
    // } else if (event.target.id === 'timelist') {
    //     timeList = event.target.value;
    } 

    
    
    console.log(`${patientList} ||| ${trainerList} ||| ${serviceList} ||| ${dayList}`)
    // console.log(typeof patientList)
}

let begDateValue = new Date(), endDateValue = new Date();

async function handleDateChange(event) {
  event.preventDefault();
  if (event.target.id === 'beginningDate') {
    begDateValue = new Date(event.target.value);
  } else if (event.target.id === 'endingDate') {
    endDateValue = new Date(event.target.value);
  }

  // Calculate the number of days and weeks between the two dates
  const daysBetween = Math.ceil((endDateValue - begDateValue) / (1000 * 60 * 60 * 24));
  const weeks = Math.ceil(daysBetween / 7);

  console.log(`Beginning Date: ${begDateValue}, Ending Date: ${endDateValue}, Days Between: ${daysBetween}, Weeks: ${weeks}`);
}
document.getElementById('beginningDate').addEventListener('change', handleDateChange);
document.getElementById('endingDate').addEventListener('change', handleDateChange);
document.getElementById('patientList').addEventListener('change', handleDataChange);
document.getElementById('trainerList').addEventListener('change', handleDataChange);
document.getElementById('assistedService').addEventListener('change', handleDataChange);
document.getElementById('dayList').addEventListener('change', handleDataChange);
// document.getElementById('timelist').addEventListener('change', handleDataChange);



//function to post onto the appointments table.
//post request to the QuickBase Application


async function populateAppointments(){
    
    var payloadBody = {
        data: []
    };

    console.log(payloadBody);
        const daysBetween = Math.ceil((endDateValue - begDateValue) / (1000 * 60 * 60 * 24));
        const weeks = Math.ceil(daysBetween / 7);


        console.log(weeks)
            while (begDateValue < endDateValue) {
                payloadBody.data.push({
                    date: begDateValue.toISOString(), // replace with your object of data
                });
                // Adding 7 days to the current date
                begDateValue.setDate(begDateValue.getDate() + 7);
                postData();
            }
        // console.log(begDateValue)
}

async function postData() {
    var headers = {
        'QB-Realm-Hostname': 'apeximaging',
        'Authorization': 'QB-USER-TOKEN b8c8mp_fsc3_0_c4dpriychqkjfxc4giwkecmu583g',
        'Content-Type': 'application/json'
    }
    console.log(endDateValue)
    var body = {
        "to": "bqqux9gcz",
        "data": [{
            "15": {
                "value": begDateValue
            },
            "18": {
                "value": serviceList
            },
            "11": {
                "value": trainerList
            },
            "70": {
                "value": endDateValue
            },
            "9": {
                "value": patientList
            },
            "87": {
                "value": dayList
            }
        }],
        "fieldsToReturn": [
            11,
            18,
            15,
            9,
            70,
            87

        ]
    }

    try {
        const response = await fetch('https://api.quickbase.com/v1/records', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseData = await response.json();
        console.table(responseData);
    
        console.log('Information has been posted.')
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}