// Mini Application
let btnLoadData = document.getElementById("loadData");
btnLoadData.addEventListener("click", LoadData);
let frmcountryList = document.getElementById("frmcountry");
let tocountryList = document.getElementById("tocountry");

// Load data online from API
function LoadData() {
  //console.log("LOAD DATA CALLED");
  let frmcountry = document.getElementById("frmcountry").value;
  let tocountry = document.getElementById("tocountry").value;
  let url = "https://www.floatrates.com/daily/" + frmcountry + ".json";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // call was a success so call
      conversion(data);
      getUKdatetime();
      return true;
    })
    .catch(function (error) {
      // call failed
      console.log(`Error - ${error}`);
      return false;
    });
}

// Load drop down
function InitialiseSelectfrm(responseText) {
  let countries = responseText;
  let newOption = null;
  for (let i = 0; i < countries.length; i++) {
    newOption = new Option(countries[i].Country, countries[i].Code);
    frmcountryList.add(newOption, undefined);
    //tocountryList.add(newOption,undefined);
  }
  frmcountryList[0].selected = true;
  //tocountryList[0].selected = true;
  //SetInputCode(countries[0].Code);
  // SetInputCode2(countries[0].Code);
}

// Load drop down
function InitialiseSelectto(responseText) {
  let countries = responseText;
  let newOption = null;
  for (let i = 0; i < countries.length; i++) {
    newOption = new Option(countries[i].Country, countries[i].Code);
    tocountryList.add(newOption, undefined);
  }
  tocountryList[105].selected = true;
}

// Load data and do conversion
function conversion(responseText) {
  let mydata = responseText;
  let frmcountry = document.getElementById("frmcountry").value;
  let tocountryt = document.getElementById("tocountry").value;
  let amount = document.getElementById("amount").value;
  var numbers = isNumber(amount)
  if(!numbers || amount<=0 ){
    document.getElementById("msg").innerHTML =
    "Enter valid value";
  document.getElementById("msgalert").style.visibility = "visible";
  document.getElementById("msgalert").style.opacity = 1;
  }else{
  //console.log(responseText);
  document.getElementById("msg").innerHTML =
    "";
  document.getElementById("curExcRate").innerHTML =
    " 1 " +
    frmcountry +
    " = " +
    mydata[tocountryt.toLowerCase()]["rate"] +
    " " +
    tocountryt;
  let totamount = amount * mydata[tocountryt.toLowerCase()]["rate"];
  document.getElementById("totamount").innerHTML =
    amount + " " + frmcountry + " = " + totamount.toFixed(2) + " " + tocountryt;
  }
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
// Get and print date in UK format
function getUKdatetime() {
  let ukdatetime = new Date();
  let curdate = ukdatetime.getDate();
  let curmonth = ukdatetime.toLocaleString("default", { month: "long" });
  let curyear = ukdatetime.getFullYear();
  let curhour = ukdatetime.getHours();
  let curmin = ukdatetime.getMinutes();
  let ukFormat =
    curdate +
    "<sup>th </sup>" +
    curmonth +
    " " +
    curyear +
    " at " +
    curhour +
    ":" +
    curmin;
  document.getElementById("datetime").innerHTML = ukFormat;
}

function SetInputValue(selectedValue) {
  frmcountry.value = selectedValue;
  LoadData();
}
function SetInputValue2(selectedValue) {
  tocountry.value = selectedValue;
  LoadData();
}

// Load automatically
let url = "scripts/country_code.json";
const AutoLoadData = fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // call was a success so call
    InitialiseSelectfrm(data);
    InitialiseSelectto(data);
    LoadData();
    amount.value = "1";
    return true;
  })
  .catch(function (error) {
    // call failed
    console.log(`Error - ${error}`);
    return false;
  });

window.onload = async () => {
  console.log("Page is loading");
  await AutoLoadData;
};
