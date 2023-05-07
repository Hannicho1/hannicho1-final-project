var coursesJson = null
async function loadData() {
    // document.documentElement.classList.toggle('light');
    if(document.querySelector('.coursesbody').classList.contains("invisible")==false){
        return;
    }
    if(document.querySelector('.routebody').classList.contains("invisible")==false){
        document.querySelector('.routes').classList.remove('active');
        document.querySelector('.shuttle').classList.remove('active');
        document.querySelector('.routebody').classList.toggle('invisible');


    }else if(document.querySelector('.overviewbody').classList.contains("invisible")==false){
        document.querySelector('.overview').classList.remove('active');
        document.querySelector('.overviewbody').classList.toggle('invisible');

    }
    document.querySelector('.courses').classList.toggle('active');
    document.querySelector('.coursesbody').classList.toggle('invisible');
    coursesbody = document.querySelector('.coursesbody');

    const response = await fetch("https://api.umd.io/v1/courses");
    const jsonData = await response.json();
    coursesJson = jsonData;
    for (i = 0; i < jsonData.length; i++) {
        console.log("loading");
        course = jsonData[i];
        const newDiv = document.createElement("div");
        const newDivExpand = document.createElement("div");

        newDiv.id = course.course_id;
        newDiv.style.cursor="pointer";
        newDivExpand.id=course.course_id+"Expand";
        newDivExpand.style.display="none"

        newDiv.className = "coursediv";
        const newDivImg = document.createElement('div');
        newDivImg.className = 'coursediv-logo';
        const newImg = document.createElement('img');
        newImg.src = 'images/University_of_Maryland_seal.svg';
        newDivImg.appendChild(newImg);
        newDiv.appendChild(newDivImg);
        const newDivDetail = document.createElement('dl');
        newDivDetail.className = 'coursediv-details';
        newDiv.appendChild(newDivDetail);
        divTemp = document.createElement('div');
        dt = document.createElement('dt');
        dd = document.createElement('dd');
        divTemp.appendChild(dt);
        dt.innerHTML = course.course_id;
        dd.innerHTML = course.name;
        divTemp.appendChild(dd);
        newDivDetail.appendChild(divTemp);

        divTemp = document.createElement('div');
        dt = document.createElement('dt');
        dd = document.createElement('dd');
        divTemp.appendChild(dt);
        divTemp.appendChild(dd);
        dt.innerHTML = "Department";
        dd.innerHTML = course.department;
        newDivDetail.appendChild(divTemp);

        divTemp = document.createElement('div');
        dt = document.createElement('dt');
        dd = document.createElement('dd');
        divTemp.appendChild(dt);
        divTemp.appendChild(dd);
        dt.innerHTML = "Semester";
        dd.innerHTML = course.semester;
        newDivDetail.appendChild(divTemp);

        divTemp = document.createElement('div');
        divTemp.className = 'coursediv-number';
        divTemp.innerHTML = "Credits: " + course1.credits;
        newDivDetail.appendChild(divTemp);
        coursesbody.appendChild(newDiv);
        coursesbody.appendChild(newDivExpand);
    }
}
var courses = document.querySelector('.courses');
courses.addEventListener('click', loadData);

function check_name(name1, name2, name3, comp1, comp2, comp3) {
    if (name1.toUpperCase().indexOf(comp1) > -1 && name2.toUpperCase().indexOf(comp2) > -1 && name3.toUpperCase().indexOf(comp3) > -1) {
        // console.log("1");
        return true;
    } else if (name1.toUpperCase().indexOf(comp2) > -1 && name2.toUpperCase().indexOf(comp1) > -1 && name3.toUpperCase().indexOf(comp3) > -1) {
        // console.log("2");
        return true;
    } else if (name1.toUpperCase().indexOf(comp3) > -1 && name2.toUpperCase().indexOf(comp2) > -1 && name3.toUpperCase().indexOf(comp1) > -1) {
        // console.log("3");
        return true;
    } else if (name1.toUpperCase().indexOf(comp1) > -1 && name2.toUpperCase().indexOf(comp3) > -1 && name3.toUpperCase().indexOf(comp2) > -1) {
        // console.log("4");

        return true;
    } else if (name1.toUpperCase().indexOf(comp2) > -1 && name2.toUpperCase().indexOf(comp3) > -1 && name3.toUpperCase().indexOf(comp1) > -1) {
        // console.log("5");

        return true;
    } else if (name1.toUpperCase().indexOf(comp3) > -1 && name2.toUpperCase().indexOf(comp1) > -1 && name3.toUpperCase().indexOf(comp2) > -1) {
        // console.log("6");

        return true;
    } else {
        return false;
    }
}
var course_search = document.querySelector('#course_search');
course_search.addEventListener('input', function (e) {
    console.log(e.target.value);
    value=e.target.value;
    if(coursesJson!= null){
        for(i =0; i<coursesJson.length;i++){
            course=coursesJson[i];
            if(course.course_id.toUpperCase().indexOf(value.toUpperCase())>-1 || course.name.toUpperCase().indexOf(value.toUpperCase())>-1){
                document.getElementById(course.course_id).style.display="";
            }else{
                document.getElementById(course.course_id).style.display="none";
            }
        }
    }   
})