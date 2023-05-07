// Nope. This is just the UI

var modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {
    console.log("sone")
    document.documentElement.classList.toggle('light');
    modeSwitch.classList.toggle('active');
});

function overview(){
    fetch()
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
async function loadOverview() {
    const response = await fetch("https://api.umd.io/v1/courses");
    const jsonData = await response.json();
    // console.log(jsonData);
    num=getRandomInt(jsonData.length-1);
    course1=jsonData[num];
    console.log(course1);
    first=document.getElementById("first");
    first.querySelector("#over10").innerHTML=course1.course_id;
    first.querySelector("#over11").innerHTML=course1.name;
    first.querySelector("#over20").innerHTML="Department"
    first.querySelector("#over21").innerHTML=course1.department;
    first.querySelector("#over30").innerHTML="Semester";
    first.querySelector("#over31").innerHTML=course1.semester;
    first.querySelector("#over4").innerHTML="Credits: "+course1.credits;
    num=getRandomInt(jsonData.length-1);
    course1=jsonData[num];
    console.log(course1);
    first=document.getElementById("second");
    first.querySelector("#over10").innerHTML=course1.course_id;
    first.querySelector("#over11").innerHTML=course1.name;
    first.querySelector("#over20").innerHTML="Department"
    first.querySelector("#over21").innerHTML=course1.department;
    first.querySelector("#over30").innerHTML="Semester";
    first.querySelector("#over31").innerHTML=course1.semester;
    first.querySelector("#over4").innerHTML="Credits: "+course1.credits;
    // first.innerHtml=
    num=getRandomInt(jsonData.length-1);
    course1=jsonData[num];
    console.log(course1);
    first=document.getElementById("third");
    first.querySelector("#over10").innerHTML=course1.course_id;
    first.querySelector("#over11").innerHTML=course1.name;
    first.querySelector("#over20").innerHTML="Department"
    first.querySelector("#over21").innerHTML=course1.department;
    first.querySelector("#over30").innerHTML="Semester";
    first.querySelector("#over31").innerHTML=course1.semester;
    first.querySelector("#over4").innerHTML="Credits: "+course1.credits;
    console.log(course1);

  };


  async function loadBusroute(){
    console.log("load load");
    const response = await fetch("https://api.umd.io/v1/bus/routes");
    const jsonData = await response.json();
    console.log(jsonData);
    num=getRandomInt(jsonData.length-1);
    route=jsonData[num];
    console.log(route);
    first=document.getElementById("first");
    first.querySelector("#over10").innerHTML=route.route_id;
    first.querySelector("#over11").innerHTML="No";
    first.querySelector("#over20").innerHTML="Name"
    first.querySelector("#over21").innerHTML=route.title;
    first.querySelector("#over30").innerHTML="";
    first.querySelector("#over31").innerHTML="";
    first.querySelector("#over4").innerHTML="";
    num=getRandomInt(jsonData.length-1);
    route=jsonData[num];
    console.log(route);
    first=document.getElementById("second");
    first.querySelector("#over10").innerHTML=route.route_id;
    first.querySelector("#over11").innerHTML="No";
    first.querySelector("#over20").innerHTML="Name"
    first.querySelector("#over21").innerHTML=route.title;
    first.querySelector("#over30").innerHTML="";
    first.querySelector("#over31").innerHTML="";
    first.querySelector("#over4").innerHTML="";
    num=getRandomInt(jsonData.length-1);
    route=jsonData[num];
    console.log(route);
    first=document.getElementById("third");
    first.querySelector("#over10").innerHTML=route.route_id;
    first.querySelector("#over11").innerHTML="No";
    first.querySelector("#over20").innerHTML="Name"
    first.querySelector("#over21").innerHTML=route.title;
    first.querySelector("#over30").innerHTML="";
    first.querySelector("#over31").innerHTML="";
    first.querySelector("#over4").innerHTML="";

  }

  async function loadBusShuttle(){
    console.log("load load");
    const response = await fetch("https://api.umd.io/v1/bus/routes");
    const jsonData = await response.json();
    console.log(jsonData);
    num=getRandomInt(jsonData.length-1);
    route=jsonData[num];

    // https://api.umd.io/v1/bus/routes/{route_id}/schedules
    response2 = await fetch("https://api.umd.io/v1/bus/routes/"+route.route_id+"/schedules");
    jsonData2 = await response2.json();
    num=getRandomInt(jsonData2.length-1);
    shuttle=jsonData2[num];

    first=document.getElementById("first");
    first.querySelector("#over10").innerHTML="Route";
    first.querySelector("#over11").innerHTML=shuttle.route;
    first.querySelector("#over20").innerHTML="Direction"
    first.querySelector("#over21").innerHTML=shuttle.direction;
    first.querySelector("#over30").innerHTML="Days";
    first.querySelector("#over31").innerHTML=shuttle.days;
    first.querySelector("#over4").innerHTML="";

    num=getRandomInt(jsonData.length-1);
    route=jsonData[num];

    // https://api.umd.io/v1/bus/routes/{route_id}/schedules
    response2 = await fetch("https://api.umd.io/v1/bus/routes/"+route.route_id+"/schedules");
    jsonData2 = await response2.json();

    num=getRandomInt(jsonData2.length-1);
    shuttle=jsonData2[num];

    first=document.getElementById("second");
    first.querySelector("#over10").innerHTML="Route";
    first.querySelector("#over11").innerHTML=shuttle.route;
    first.querySelector("#over20").innerHTML="Direction"
    first.querySelector("#over21").innerHTML=shuttle.direction;
    first.querySelector("#over30").innerHTML="Days";
    first.querySelector("#over31").innerHTML=shuttle.days;
    first.querySelector("#over4").innerHTML="";

    num=getRandomInt(jsonData.length-1);
    route=jsonData[num];

    // https://api.umd.io/v1/bus/routes/{route_id}/schedules
    response2 = await fetch("https://api.umd.io/v1/bus/routes/"+route.route_id+"/schedules");
    jsonData2 = await response2.json();

    num=getRandomInt(jsonData2.length-1);
    shuttle=jsonData2[num];

    first=document.getElementById("third");
    first.querySelector("#over10").innerHTML="Route";
    first.querySelector("#over11").innerHTML=shuttle.route;
    first.querySelector("#over20").innerHTML="Direction"
    first.querySelector("#over21").innerHTML=shuttle.direction;
    first.querySelector("#over30").innerHTML="Days";
    first.querySelector("#over31").innerHTML=shuttle.days;
    first.querySelector("#over4").innerHTML="";

  }
loadOverview();



busroutebtn=document.querySelector(".busroute");
busroutebtn.addEventListener("click", loadBusroute);
busroutebtn=document.querySelector(".busshuttle");
busroutebtn.addEventListener("click", loadBusShuttle);

function showOverViewr(){
    if(document.querySelector('.overviewbody').classList.contains("invisible")==false){
        return;
    }
    if(document.querySelector('.routebody').classList.contains("invisible")==false){
        document.querySelector('.routes').classList.remove('active');
        document.querySelector('.shuttle').classList.remove('active');
        document.querySelector('.routebody').classList.toggle('invisible');


    }else if(document.querySelector('.coursesbody').classList.contains("invisible")==false){
        document.querySelector('.courses').classList.remove('active');
        document.querySelector('.coursesbody').classList.toggle('invisible');

    }
    document.querySelector('.overview').classList.toggle('active');
    document.querySelector('.overviewbody').classList.toggle('invisible');
    coursesbody = document.querySelector('.coursesbody');
}
var overview = document.querySelector('.overview');
overview.addEventListener('click', showOverViewr);