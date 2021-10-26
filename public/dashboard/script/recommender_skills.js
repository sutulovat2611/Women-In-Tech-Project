// fixed list of skills
const skill_list = [["Email", 0, 0, 0] , ["Online collaboration",0, 0, 0], ["Search for information",0, 0, 0], ["Smartphone/tablet/computer use",0, 0, 0], ["Social media use",0, 0, 0],
["Active listening",0, 0, 0], ["Effective communication",0, 0, 0], ["Negotiation skill",0, 0, 0], ["Persuasion",0, 0, 0], ["Relationship management",0, 0, 0],
["Art",0, 0, 0], ["Caregiving",0, 0, 0], ["Cooking",0, 0, 0], ["Exercise",0, 0, 0], ["Professional writing",0, 0, 0], ["Collaboration and teamwork",0, 0, 0], ["Critical thinking",0, 0, 0],
["Entrepreneurship",0, 0, 0], ["People and Leadership",0, 0, 0], ["Personal selling",0, 0, 0]];

const total_list = [["ICT/Tech­nology Skills", 0], ["Social Communi­cation Skills", 0], ["Comple­mentary Skills", 0], ["Work-related Skills", 0]];

let myChart;

let selectedPreference = "";

window.onload = execute();

async function execute() {

    collectData().then(() => {

        updateMainBarChart();

        checkSkillLikeDislike();

    })
}

/* collect all skill selected data from firebase */
async function collectData(){
  let favs = [];

  await firebase.database().ref('recommenderData').child('skills')
  .once('value', x => {
      x.forEach(data => {
          favs.push(data.val());
          checkSkill(data.key, data.val().selectedAmount);
      })
  })
}

/* function to display selected skill */
function selectedSkill(){
  let select = document.getElementById("skills");
  let option = select.options[select.selectedIndex];

  document.getElementById("selected").innerHTML = option.value;
  document.getElementById("selectedBarChart").innerHTML = option.value;

  // generate bar chart based on selected skill
  updateBarChart(option.value);



}

// Function for updating likes/dislikes for each skill
function checkSkillLikeDislike(){
  firebase.database().ref('users').once("value", function(snapshot){
    console.log(snapshot.val());
    userData = snapshot.val();
    console.log(userData.length);
    console.log(typeof userData);
    // For each user
    for (key1 in userData){
      if (userData[key1].videoHistory != undefined){
        // User has videohistory
        for (key in userData[key1].videoHistory){
          if(userData[key1].videoHistory[key].dislike != undefined){
            // Iterate through and update values
            for(let k=0; k<skill_list.length; k++){
              if(skill_list[k][0] == userData[key1].videoHistory[key].interest){
                // If user liked video
                if(userData[key1].videoHistory[key].like){
                  skill_list[k][2]++;
                }
                // If user dsiliked vid
                if(userData[key1].videoHistory[key].dislike){
                  skill_list[k][3]++;
                }
              }
            }
          }
        }
      }
    }

    // Update data
  })
}

/* Function to determine the number of favourites for each skill and interest */
function checkSkill(preference, amount){
  for (let i = 0; i < skill_list.length; i++) {
    if (preference == skill_list[i][0]) {
      selectedPreferenceID = i;
      let current_num = skill_list[i][1];
      skill_list[i][1] = current_num + amount;
      // ict skill
      if(i<5){
        let current_value = total_list[0][1];
        total_list[0][1] = current_value + amount;
      }
      // social skill
      else if(i<10){
        let current_value = total_list[1][1];
        total_list[1][1] = current_value + amount;
      }
      // complementary skill
      else if(i<15){
        let current_value = total_list[2][1];
        total_list[2][1] = current_value + amount;
      }
      // work skill
      else{
        let current_value = total_list[3][1];
        total_list[3][1] = current_value + amount;
      }
    }
  }
}



/* generate bar chart based on selected skill */
function updateBarChart(skill) {

    console.log(skill_list);

    // variable
    let xValues = [];
    let yValues = [];
    let low = 0;
    let maxi = 0;

    // determine which skill is selected;
    if(skill == "ICT/Tech­nology Skills"){low = 0; maxi = 5;}
    else if(skill == "Social Communi­cation Skills"){low = 5; maxi = 10;}
    else if(skill == "Comple­mentary Skills"){low = 10; maxi = 15;}
    else{skill = low = 15; maxi = 20;}


    // to get number of favourties for each interest for x-axis and y-axis values
    for (let i = low; i < maxi; i++){
        xValues.push(skill_list[i][0]);
        yValues.push(skill_list[i][1]);

    }

    // Update like/dislike section
    document.getElementById("likeSkill1").innerHTML = skill_list[low][0];
    document.getElementById("likeSkill2").innerHTML = skill_list[low+1][0];
    document.getElementById("likeSkill3").innerHTML = skill_list[low+2][0];
    document.getElementById("likeSkill4").innerHTML = skill_list[low+3][0];
    document.getElementById("likeSkill5").innerHTML = skill_list[low+4][0];

    document.getElementById("dislikeSkill1").innerHTML = skill_list[low][0];
    document.getElementById("dislikeSkill2").innerHTML = skill_list[low+1][0];
    document.getElementById("dislikeSkill3").innerHTML = skill_list[low+2][0];
    document.getElementById("dislikeSkill4").innerHTML = skill_list[low+3][0];
    document.getElementById("dislikeSkill5").innerHTML = skill_list[low+4][0];

    document.getElementById("like1").innerHTML = skill_list[low][2];
    document.getElementById("like2").innerHTML = skill_list[low+1][2];
    document.getElementById("like3").innerHTML = skill_list[low+2][2];
    document.getElementById("like4").innerHTML = skill_list[low+3][2];
    document.getElementById("like5").innerHTML = skill_list[low+4][2];

    document.getElementById("dislike1").innerHTML = skill_list[low][3];
    document.getElementById("dislike2").innerHTML = skill_list[low+1][3];
    document.getElementById("dislike3").innerHTML = skill_list[low+2][3];
    document.getElementById("dislike4").innerHTML = skill_list[low+3][3];
    document.getElementById("dislike5").innerHTML = skill_list[low+4][3];



    var ChartOptions = {
        legend: {
            display: true
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                    min: 0
                }
            }]
        },
    },
    ChartData = {
        labels: xValues,
        datasets: [
          {
            // for number of facourites
            label: "Number of selections",
            barThickness: 50,
            backgroundColor: base.primaryColor,
            borderColor: base.primaryColor,
            data: yValues,
            fill: "",
            lineTension: .1
        }]
    }

    // if the chart is not undefined (e.g. it has been created)
    // then destory the old chart and create new one
    if(myChart){
        myChart.destroy();
    }

    let barChartjs = document.getElementById("skillChart");
    myChart =  new Chart(barChartjs, {
        type: "bar",
        data: ChartData,
        options: ChartOptions
});


}

/* generate pie chart to display total selection number for each skill */
function updateMainBarChart() {
    console.log("Bar chart started");

    // variable
    let xValues = [];
    let yValues = [];

    // to get total number of selections for each skill for x-axis and y-axis values
    for (let i = 0; i < total_list.length; i++){
        xValues.push(total_list[i][0]);
        yValues.push(total_list[i][1]);

    }

    var ChartOptions = {
      title: {
        display: true
      }
    },
    ChartData = {
        labels: xValues,
        datasets: [
          {
            label: "Number of selections",
            data: yValues,
            backgroundColor: chartColors,
            borderColor: colors.borderColor
        }]
    }
    var barChartjs = document.getElementById("skillBarChartjs");
    barChartjs && new Chart(barChartjs, {
        type: "bar",
        data: ChartData,
        options: ChartOptions
      });
}
