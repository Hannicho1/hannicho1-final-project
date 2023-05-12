function initMap(mapid, lat, long) {
    // 38.9072° N, 77.0369° W
    const carto = L.map(mapid).setView([lat, long], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 14,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(carto);

    var circle = L.circle([lat, long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2,
        radius: 1000
    }).addTo(carto);
    return carto;
}

function markerPlace(array, map) {
    // console.log('array for markers', array);

    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            layer.remove();
        }
        if (layer instanceof L.Circle) {
            layer.remove();
        }
    });

    array.forEach((item) => {
        L.marker([item.lat, item.long]).addTo(map);
        // L.circle([item.lat, item.long], {
        //     color: 'red',
        //     fillColor: '#f03',
        //     fillOpacity: 0.2,
        //     radius: 40
        // }).addTo(map);

    })

}

function onPathChange(e) {
    const storedData = localStorage.getItem("routeData");
    const parsedData = new Object(JSON.parse(storedData));
    id = e.target.id.slice(1);
    val = e.target.value;
    arr = parsedData[id].path_name[val];



}

function showSchedule(newDiv, data) {
    // console.log(data);
    for (i = 0; i < data.length; i++) {
        schedule = data[i];
        const newDivDetail = document.createElement('dl');
        newDivDetail.className = 'routediv-details';
        newDiv.appendChild(newDivDetail);
        divTemp = document.createElement('div');
        dt = document.createElement('h5');
        dd = document.createElement('p');
        divTemp.appendChild(dt);
        dt.innerHTML = "days";
        dd.innerHTML = schedule.days;
        divTemp.appendChild(dd);
        newDivDetail.appendChild(divTemp);

        divTemp = document.createElement('div');
        dt = document.createElement('h5');
        dd = document.createElement('p');
        divTemp.appendChild(dt);
        divTemp.appendChild(dd);
        dt.innerHTML = "Direction";
        dd.innerHTML = schedule.direction;
        newDivDetail.appendChild(divTemp);

        divTemp = document.createElement('div');
        dt = document.createElement('h5');
        dd = document.createElement('p');
        divTemp.appendChild(dt);
        divTemp.appendChild(dd);
        dt.innerHTML = "Stops";
        dd.innerHTML = schedule.stops.length;
        newDivDetail.appendChild(divTemp);

        divTemp = document.createElement('div');
        divTemp.className = 'coursediv-number';
        divTemp.innerHTML = "trips: " + schedule.trips.length;
        newDivDetail.appendChild(divTemp);
        newDiv.appendChild(newDivDetail);
    }

}

async function loadDetailRoute(id_selected) {

    const storedData = localStorage.getItem("routeData");
    const parsedData = new Object(JSON.parse(storedData));
    const newDivExpand = document.getElementById(id_selected + "Expand");
    const newDivShuttle = document.getElementById(id_selected + "Shuttle");

    // newDivExpand.style.display = "";
    // localStorage.clear('localStorage Check', localStorage.getItem("routeData"))

    if ("paths" in parsedData[id_selected] && "schedule" in parsedData[id_selected]) {
        data = parsedData[id_selected];
        console.log("load local", data)
        // return parsedData;


    } else {
        const response = await fetch("https://api.umd.io/v1/bus/routes/" + id_selected);
        const jsonData = await response.json();
        var data = new Object(jsonData[0]);

        // console.log("loading internet")
        // https://api.umd.io/v1/bus/routes/{route_id}/schedules
        const response2 = await fetch(`https://api.umd.io/v1/bus/routes/${id_selected}/schedules`);
        const jsonData2 = await response2.json();
        const data2 = jsonData2;
        data.schedule = data2;
        var paths = new Object();
        for (i = 0; i < data.paths.length; i++) {
            paths['path ' + (i + 1)] = data.paths[i];
        }
        data.path_name = paths;
        parsedData[id_selected] = data;
        localStorage.setItem('routeData', JSON.stringify(parsedData));

    }


    // console.log(jsonData)
    if (newDivShuttle.children.length < 1) {
        showSchedule(newDivShuttle, data.schedule);
    }
    if (newDivExpand.children.length > 1) {
        // newDivExpand.style.display = "none";
        // console.log("close");
        return;
    } else {
        latmin = data.lat_min;
        longmin = data.long_min;

        newDivExpand.className = "routediv-expand";
        newDivShuttle.className = "routediv-expand";
        const divData = document.createElement('div');

        divData.className = 'routediv-details';

        divTemp = document.createElement('div');
        dt = document.createElement('h5');

        divTemp.appendChild(dt);
        dt.innerHTML = "Directions";
        data.directions.forEach((item) => {
            // const {coordinates} = item.geocoded_column_1;
            // L.marker([item.lat, item.long]).addTo(map);
            dd = document.createElement('p');
            dd.innerHTML = "-" + item.title;
            divTemp.appendChild(dd);

        })

        var select = document.createElement("select");
        select.name = "paths " + id_selected;
        select.id = "p" + id_selected;

        for (i = 0; i < data.paths.length; i++) {
            var option = document.createElement("option");
            option.value = 'path ' + (i + 1);
            option.text = 'path ' + (i + 1);
            select.appendChild(option);
        }


        var label = document.createElement("label");
        label.innerHTML = "Paths : "
        label.htmlFor = "paths " + id_selected;
        divData.appendChild(divTemp);

        divData.appendChild(label).appendChild(select);

        newDivExpand.appendChild(divData);



        const newDivImg = document.createElement('div');
        newDivImg.className = 'routediv-map';
        const mapL = document.createElement('div');
        mapL.id = id_selected + "map";
        mapL.className = 'routediv-map';

        newDivImg.appendChild(mapL);
        newDivExpand.appendChild(newDivImg);

        map = initMap(mapL.id, (latmin + data.lat_max) / 2, (longmin + data.long_max) / 2);

        L.marker([data.lat_min, data.long_min]).addTo(map);
        L.marker([data.lat_max, data.long_max]).addTo(map);
        select.addEventListener("change", function (e) {
            const storedData = localStorage.getItem("routeData");
            const parsedData = new Object(JSON.parse(storedData));
            id = e.target.id.slice(1);
            val = e.target.value;
            arr = parsedData[id].path_name[val];
            markerPlace(arr, map);
        });

        // data.stops.forEach((item) => {
        //     console.log('markerPlace', item);
        //     // const {coordinates} = item.geocoded_column_1;
        //     L.marker([item.lat, item.long]).addTo(map);

        // })

        const divDataShuttle = document.createElement('div');
        divDataShuttle.className = 'routediv-details';
    }
    return;
}

async function showDetailRoute(e) {

    daaa = e;
    target = e.target;
    while (true) {
        if (target.id == "") {
            target = target.parentElement;
            // console.log("not yet")
        } else {
            break
        }
    }
    const id_selected = target.id;
    loadDetailRoute(id_selected);
    const storedData = localStorage.getItem("routeData");
    var parsedData = null;
    // if (storedData != null) {
    parsedData = new Object(JSON.parse(storedData));
    if (document.querySelector('.shuttle').classList.contains("active")) {
        for (const key in parsedData) {
            document.getElementById(key + "Expand").style.display = "none";
        }
        if (document.getElementById(id_selected + "Shuttle").style.display == "") {
            document.getElementById(id_selected + "Shuttle").style.display = "none";
        } else {
            document.getElementById(id_selected + "Shuttle").style.display = "";
        }

    } else {
        for (const key in parsedData) {
            document.getElementById(key + "Shuttle").style.display = "none";
        }
        if (document.getElementById(id_selected + "Expand").style.display == "") {
            document.getElementById(id_selected + "Expand").style.display = "none";
        } else {
            document.getElementById(id_selected + "Expand").style.display = "";
        }

        console.log("rute");
    }
    // console.log(target);
    //https://api.umd.io/v1/bus/routes/{route_ids}


}
async function loadDataRoute() {
    routebody = document.querySelector('.routebody');

    const storedData = localStorage.getItem("routeData");
    var parsedData = null;
    if (storedData != null) {
        parsedData = new Object(JSON.parse(storedData));
    } else {
        const response = await fetch("https://api.umd.io/v1/bus/routes");
        const jsonData = await response.json();
        routesJson = jsonData;
        const routeData = new Object()
        for (i = 0; i < jsonData.length; i++) {
            // console.log("loading");
            route = jsonData[i];
            routeData[route.route_id] = route;
        }
        localStorage.setItem("routeData", JSON.stringify(routeData))
        parsedData = routeData;
    }
    var first = null;
    for (const key in parsedData) {

        // console.log("loading");
        route = parsedData[key];
        if (first == null) {
            first = key;
        }
        // routeData[route.route_id] = route;
        if(document.getElementById(key)!=null){
            document.getElementById(key).style.display="";
            continue;
        }
        const newDiv = document.createElement("div");
        const newDivExpand = document.createElement("div");

        const newDivShuttle = document.createElement("div");
        newDiv.id = route.route_id;

        var option = document.createElement("option");
        option.value = route.route_id;
        option.text = route.route_id;
        const select = document.getElementById("route_ids");
        select.appendChild(option);

        newDiv.style.cursor = "pointer";
        newDiv.addEventListener("click", showDetailRoute);
        newDivExpand.id = route.route_id + "Expand";
        newDivShuttle.id = route.route_id + "Shuttle";

        newDivExpand.style.display = "none"
        newDivShuttle.style.display = "none"

        newDiv.className = "routediv";
        const newDivImg = document.createElement('div');
        newDivImg.className = 'routediv-logo';
        const newImg = document.createElement('img');
        newImg.src = 'images/University_of_Maryland_seal.svg';

        newDivImg.appendChild(newImg);
        newDiv.appendChild(newDivImg);
        const newDivDetail = document.createElement('dl');
        newDivDetail.className = 'routediv-details';
        newDiv.appendChild(newDivDetail);
        divTemp = document.createElement('div');
        dt = document.createElement('h5');
        dd = document.createElement('p');
        divTemp.appendChild(dt);
        dt.innerHTML = route.title;
        // dd.innerHTML = route.name;
        divTemp.appendChild(dd);
        newDivDetail.appendChild(divTemp);

        divTemp = document.createElement('div');
        dt = document.createElement('h5');
        dd = document.createElement('p');
        divTemp.appendChild(dt);
        divTemp.appendChild(dd);
        dt.innerHTML = "No";
        dd.innerHTML = route.route_id;
        newDivDetail.appendChild(divTemp);


        routebody.appendChild(newDiv);
        routebody.appendChild(newDivExpand);
        routebody.appendChild(newDivShuttle);
    }
    // console.log(routeData);


    loadDetailRoute(first);

    if (document.querySelector('.shuttle').classList.contains("active")) {
        document.getElementById(first + "Shuttle").style.display = "";
        document.getElementById(first + "Expand").style.display = "none";
    } else{
        document.getElementById(first + "Expand").style.display = "";
        document.getElementById(first + "Shuttle").style.display = "none";

    }
}

function loadRoutes() {
    if (document.querySelector('.routebody').classList.contains("invisible") == false) {
        document.querySelector('.shuttle').classList.remove('active');
        document.querySelector('.routes').classList.toggle('active');
        document.querySelector('#route-header').innerHTML = "Routes";
        document.querySelector('#route-detail').innerHTML = "List of Route";
        loadDataRoute();

        return;
    }
    if (document.querySelector('.overviewbody').classList.contains("invisible") == false) {
        document.querySelector('.overview').classList.remove('active');
        document.querySelector('.overviewbody').classList.toggle('invisible');


    } else if (document.querySelector('.coursesbody').classList.contains("invisible") == false) {
        document.querySelector('.courses').classList.remove('active');
        document.querySelector('.coursesbody').classList.toggle('invisible');

    }
    document.querySelector('.shuttle').classList.remove('active');
    document.querySelector('.routes').classList.toggle('active');
    document.querySelector('.routebody').classList.toggle('invisible');
    document.querySelector('#route-header').innerHTML = "Routes";
    document.querySelector('#route-detail').innerHTML = "List of Route";
    loadDataRoute();

}

async function showShuttlePage() {
    if (document.querySelector('.routebody').classList.contains("invisible") == false) {
        document.querySelector('.routes').classList.remove('active');
        document.querySelector('.shuttle').classList.toggle('active');
        document.querySelector('#route-header').innerHTML = "Schedule";
        document.querySelector('#route-detail').innerHTML = "List of bus schedules for a route";
        document.getElementById('route-detail').innerText = "List of bus schedules for a route";
        loadDataRoute();
        return;
    }
    if (document.querySelector('.overviewbody').classList.contains("invisible") == false) {
        document.querySelector('.overview').classList.remove('active');
        document.querySelector('.overviewbody').classList.toggle('invisible');
    } else if (document.querySelector('.coursesbody').classList.contains("invisible") == false) {
        document.querySelector('.courses').classList.remove('active');
        document.querySelector('.coursesbody').classList.toggle('invisible');

    }
    document.querySelector('.routes').classList.remove('active');
    document.querySelector('.shuttle').classList.toggle('active');
    document.querySelector('.routebody').classList.toggle('invisible');
    document.querySelector('#route-header').innerHTML = "Schedule";
    document.querySelector('#route-detail').innerHTML = "List of bus schedules for a route";
    document.getElementById('route-detail').innerText = "List of bus schedules for a route";
    // console.log(document.getElementById('route-detail').innerText);
    loadDataRoute();

}


const routes = document.querySelector('.routes');
// routes.addEventListener('click', loadRoutes);
document.querySelectorAll(".routes").forEach(item=> {item.addEventListener('click',loadRoutes)});

const shuttle = document.querySelector('.shuttle');
// shuttle.addEventListener('click', showShuttlePage);
document.querySelectorAll(".shuttle").forEach(item=> {item.addEventListener('click',showShuttlePage)});
function mobileTest(){
    if(window.innerWidth<700){
        loadRoutes();
    }else{
        loadBusroute();
    }
    
}
function mobileTest2(){
    if(window.innerWidth<700){
        showShuttlePage();
    }else{
        loadBusShuttle();
    }
    
}

busroutebtn=document.querySelector(".busroute");
busroutebtn.addEventListener("click", mobileTest);
busroutebtn=document.querySelector(".busshuttle");
busroutebtn.addEventListener("click", mobileTest2);

const route_search = document.querySelector('#route_search');
route_search.addEventListener('input', function (e) {
    console.log(e.target.value);
    value = e.target.value;

    const storedData = localStorage.getItem("routeData");
    const parsedData = new Object(JSON.parse(storedData));
    // console.log(parsedData);
    if (parsedData != null) {
        for (const key in parsedData) {

            if (parsedData[key].title.toUpperCase().indexOf(value.toUpperCase()) > -1) {
                document.getElementById(key).style.display = "";
            } else {
                document.getElementById(key).style.display = "none";
                document.getElementById(key + "Expand").style.display = "none";
                document.getElementById(key + "Shuttle").style.display = "none";

            }
        }
    }
})

const select_route = document.querySelector('#route_ids');
select_route.addEventListener("change", function (e) {
    const storedData = localStorage.getItem("routeData");
    const parsedData = new Object(JSON.parse(storedData));
    // console.log(parsedData);
    // console.log(e);
    const val = e.target.value;
    for (const key in parsedData) {

        if (val == key) {
            document.getElementById(key).style.display = "";
            loadDetailRoute(key);
        } else {
            document.getElementById(key).style.display = "none";
            document.getElementById(key + "Expand").style.display = "none";
            document.getElementById(key + "Shuttle").style.display = "none";
        }
    }
})
