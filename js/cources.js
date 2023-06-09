Json = null
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

    const response = await fetch("https://api.umd.io/v1/courses/list");
    const jsonData = await response.json();
    coursesJson = jsonData;
    //console.log(jsonData);
    for (i = 0; i < jsonData.length; i++) {
        //console.log("loading");
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
        dt = document.createElement('h5');
        dd = document.createElement('p');
        divTemp.appendChild(dt);
        dt.innerHTML ="Course ID";
        dd.innerHTML = course.course_id;
        divTemp.appendChild(dd);
        newDivDetail.appendChild(divTemp);

        divTemp = document.createElement('div');
        dt = document.createElement('h5');
        dd = document.createElement('p');
        divTemp.appendChild(dt);
        divTemp.appendChild(dd);
        dt.innerHTML = "Course Name";
        dd.innerHTML = course.name;
        newDivDetail.appendChild(divTemp);
/*
        divTemp = document.createElement('div');
        dt = document.createElement('h5');
        dd = document.createElement('p');
        divTemp.appendChild(dt);
        divTemp.appendChild(dd);
        dt.innerHTML = "Semester";
        dd.innerHTML = course.semester;
        newDivDetail.appendChild(divTemp);

        divTemp = document.createElement('div');
        divTemp.className = 'coursediv-number';
        divTemp.innerHTML = "Credits: " + course1.credits;
        */
        newDivDetail.appendChild(divTemp);
        coursesbody.appendChild(newDiv);
        coursesbody.appendChild(newDivExpand);
    }
}
var courses = document.querySelector('.courses');
// courses.addEventListener('click', loadData);
document.querySelectorAll(".courses").forEach(item=> {item.addEventListener('click',loadData)});

function mobileTest(){
    if(window.innerWidth<700){
        loadData();
    }else{
        loadOverview();
    }
    
}
courseoverview=document.querySelector(".courseoverview");
courseoverview.addEventListener("click", mobileTest);

var course_search = document.querySelector('#course_search');
course_search.addEventListener('input', function (e) {
    console.log(e.target.value);
    value=e.target.value;
    const select=document.getElementById('course-select').value;
    
    if(coursesJson!= null){
        for(i =0; i<coursesJson.length;i++){
            course=coursesJson[i];
            if(select=='1'){
                if(course.course_id.toUpperCase().indexOf(value.toUpperCase())>-1 ){
                    document.getElementById(course.course_id).style.display="";
                }else{
                    document.getElementById(course.course_id).style.display="none";
                }
            }else if(select=='2'){
                if(course.name.toUpperCase().indexOf(value.toUpperCase())>-1){
                    document.getElementById(course.course_id).style.display="";
                }else{
                    document.getElementById(course.course_id).style.display="none";
                }
            }
           
        }
    }   
})
