/**
 * Runs on page load to generate a table containing list of users
 * 
 * @param: none
 * @return: none
 */
firebase.database().ref('users').once("value", function (snapshot) {
    let tableHtml = "";
    if (snapshot.exists()){
        tableHtml += `<tbody>`;
        let i = 0;
        snapshot.forEach((child)=>{
            // If username is not available display preset username
            if (child.val().username == undefined){
                tableHtml += 
                `
                <tr>
                <th>${i}</th>
                <td>${child.val().phone}</td>
                <td>Username not set</td>
                <td><button onclick="updateVideoList(${child.val().phone})" class="pure-button pure-button-primary">View</button></td>
                </tr>
                `;
                i++;
            } else {
                tableHtml += 
                `
                <tr>
                <th>${i}</th>
                <td>${child.val().phone}</td>
                <td>${child.val().username}</td>
                <td><button onclick="updateVideoList(${child.val().phone})" class="pure-button pure-button-primary">View</button></td>
                </tr>
                `;
                i++;
            }
        })
        tableHtml += `</tbody>`;
        // Updates the page using jquery
        $("#userListTable").append(tableHtml);
    } else {
        console.log("No users");
    }
});

/**
 * Fires when a specific user has been selected
 * Shows the table containing the ideos that the user selected had watched
 * 
 * @param phoneNum: Phone number of the user selected 
 * @return: none
 */
function updateVideoList(phoneNum){
    $('#videoAnalyticContainer').hide();

    firebase.database().ref(`users/+${phoneNum}`).once("value", function(snapshot){
        if (snapshot.exists()){
            $('#videoListContainer').show();
            if (snapshot.val().videoHistory != null){
                let videoHistory = snapshot.val().videoHistory;
                buildVideoListTable(videoHistory, phoneNum)
            } else {
                buildVideoListTable(null)
            }
            generatePieChart(phoneNum);
        } else {
            console.error("Unexpected error");
        }
    })
}

/**
 * Generates the html for the video list table
 * 
 * @param videoDetails: Details of the video
 * @param phoneNum: Phone number of the user selected
 * @return: none
 */
function buildVideoListTable(videoDetails, phoneNum){
    if (videoDetails == null){
        $('#videoListBody').html("No data available");
    } else {
        let bodyHtml = 
        `
        <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">

            <div class="row my-1" >
                <table class="pure-table" id="videoListTable">
                
                </table>
            </div>
            </div>
        </div>
        </div>
        `;
        $('#videoListBody').html(bodyHtml);

        let videoListTableHtml = ``;
        videoListTableHtml += `
        <thead style="background-color: dimgray;">
            <tr>
                <th style="color: white;">No.</th>
                <th style="color: white;">Video title</th>
                <th style="color: white;">Video</th>
                <th style="color: white;">Watchcount</th>
                <th style="color: white;">Video tag</th>
                <th style="color: white;">View analytics</th>
            </tr>
        </thead>
        <tbody>`;

        for (i in videoDetails){
            videoListTableHtml += `
            <tr>
            <th>${i}</th>
            <td>${videoDetails[i].videoTitle}</td>
            <td><a href="${videoDetails[i].videoUrl}" target="_blank">Link</a></td>
            <td>${videoDetails[i].totalWatchCount}</td>
            <td>${videoDetails[i].interest}</td>
            <td><button onclick="updateVideoAnalyticsTable(${phoneNum}, ${i})" class="pure-button pure-button-primary">View</button></td>
            </tr>
            `;
        }

        videoListTableHtml += `</tbody>`;
        // Updates the page with the video lists with jquery
        $('#videoListTable').html(videoListTableHtml);
    }
    
}

/**
 * Converts time in seconds (e.g 300 seconds) to minutes (e.g. 2.39 minutes)
 * 
 * @param totalSeconds The time in seconds to be converted
 * @return The converted time in minutes as a string
 */
// Converts time in seconds only to minute and seconds
function convertSecToMin(totalSeconds){
    let minutes = Math.floor(totalSeconds/60);
    let seconds = (totalSeconds- minutes*60);
    let result = `${minutes} minutes ${seconds} seconds`;
    return result
}

/**
 * Generates video analytics table that contains specific analytics details on a specific video the user had watched before
 * 
 * @param phoneNum Phone number of user that the video analytics is about
 * @return none
 */

function updateVideoAnalyticsTable(phoneNum, i){
    $('#videoAnalyticContainer').show();

    let videoAnalyticsDetails = null;
    firebase.database().ref(`users/+${phoneNum}/videoHistory/${i}/videoAnalytics`).once("value", function(snapshot){
        if (snapshot.exists()){
            snapshot.forEach((date)=>{
                date.forEach((timestamp)=>{
                    videoAnalyticsDetails = timestamp.val();
                })
            })

            videoAnalyticsDetails.videoCurrentTime = convertSecToMin(videoAnalyticsDetails.videoCurrentTime);
            videoAnalyticsDetails.videoDuration = convertSecToMin(videoAnalyticsDetails.videoDuration);
            videoAnalyticsDetails.videoElapsedTime = convertSecToMin(videoAnalyticsDetails.videoElapsedTime);

            //Builds html for the page using the video analytics information
            let videoAnalyticsTableHtml = `
            <table class="pure-table pure-table-horizontal" style="width:100%">
                <tr>
                    <th>Stopped Watching at</th>
                    <td>${videoAnalyticsDetails.videoCurrentTime}</td>
                </tr>

                <tr>
                    <th>Video Duration</th>
                    <td>${videoAnalyticsDetails.videoDuration}</td>
                </tr>

                <tr>
                    <th>Video Watchtime</th>
                    <td>${videoAnalyticsDetails.videoElapsedTime}</td>
                </tr>

                <tr>
                    <th>Video Percentage Passed</th>
                    <td>${videoAnalyticsDetails.videoPercent}% </td>
                </tr>

                <tr>
                    <th>Video Watch Status</th>
                    <td>${videoAnalyticsDetails.videoStatus} </td>
                </tr>

                <tr>
                    <th>Video Visibility</th>
                    <td>${videoAnalyticsDetails.videoVisible} </td>
                </tr>   

            </table>
            `;
            // Updates page with jquery
            $("#videoAnalyticsTitle").html(`Video Analytics of #${i}`)
            $("#videoAnalyticsTable").html(videoAnalyticsTableHtml);

        } else {
            //No data for table
            $("#videoAnalyticsTable").html("No data available for selected video");
            console.log("No data available");
        }
    })

}

/**
 * Generates two pie charts for the dashboard
 * 
 * @param phoneNum Phone number of the user
 * @return none
 */
function generatePieChart(phoneNum){

    //20 pre-generated colors
    let backgroundColors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
    let backgroundColors2 = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
    let labels = [];
    let data = [];

    // Generate the first pie chart for favourites of the user
    firebase.database().ref(`users/+${phoneNum}/videoFavourite`).once("value", function(snapshot){
        if (snapshot.exists()){
            $('#barChart2').show();
            snapshot.forEach((video)=>{
                let videoDetails = video.val();
                if (!labels.includes(videoDetails.videoPreference)){
                    labels.push(videoDetails.videoPreference);
                    data.push(1);
                } else {
                    currentNum = data[labels.indexOf(videoDetails.videoPreference)];
                    currentNum++;
                    data[labels.indexOf(videoDetails.videoPreference)] = currentNum;
                }
            })

            let backgroundColor = backgroundColors.splice(0, labels.length);

            // Generating pie chart
            new Chart("chart2",{
                type: "bar",
                data: {
                    labels,
                    datasets: [{
                      data,
                      backgroundColor,
                      hoverOffset: 4
                    }]
                },
                options: {
                    scales: {
                        yAxes:[{
                            display: true,
                            ticks: {
                                suggestedMin: 0,
                                beginAtZero: true
                            }
                        }]
                    },
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Number of videos favourited by interest'
                    }
                }
            })
        } else {
            $('#barChart2').hide();
        }
    });
    
    let labelsHist = [];
    let dataHist = [];

    // Generates the second pie chart for the watch history of the user
    firebase.database().ref(`users/+${phoneNum}/videoHistory`).once("value", function(snapshot){
        if (snapshot.exists()){
            $('#barChart1').show();
            snapshot.forEach((video)=>{
                let videoDetails = video.val();
                if (!labelsHist.includes(videoDetails.interest)){
                    labelsHist.push(videoDetails.interest);
                    dataHist.push(1);
                } else {
                    currentNum = dataHist[labelsHist.indexOf(videoDetails.interest)];
                    currentNum++;
                    dataHist[labelsHist.indexOf(videoDetails.interest)] = currentNum;
                }
            })

            let backgroundColor = backgroundColors2.splice(0, labelsHist.length);

            // Generating pie chart
            new Chart("chart1",{
                type: "bar",
                data: {
                    labels : labelsHist,
                    datasets: [{
                        label: 'Count: ',
                        data: dataHist,
                        backgroundColor,
                        hoverOffset: 4,
                        max: 10
                    }]
                },
                options: {
                    scales: {
                        yAxes:[{
                            display: true,
                            ticks: {
                                suggestedMin: 0,
                                beginAtZero: true
                            }
                        }]
                    },
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Number of videos watched by interest'
                    }
                }
            })
        } else {
            $('#barChart1').hide();
        }
    });
}
