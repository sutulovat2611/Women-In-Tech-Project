/**
 * Function that exports general user data to csv
 * 
 * @param: none
 * @return: none
 */
function csvExportUser() { 
    const user_arr = [];
    var data;
    var csv_data;
    firebase.database().ref('users').once("value", x => {
        x.forEach(snapshot => {
            user_arr.push(snapshot.val());
            data = user_arr.map(user => ({
                user_id: user.phone,
                username: user.username ? user.username : "No username given", 
                phone: user.phone
            }));
        });
    }).then(() => {
        console.log(data)
        csv_data = convertObjectToCSV(data); 
    }).then(() => {
        csvDownload(csv_data, "general_user_data");
    });
}


/**
 * Function that exports general user video history data to csv
 * 
 * @param: none
 * @return: none
 */
function csvExportVideoHistory() {
    var data_array = [];
    var csv_data;
    firebase.database().ref('users').once("value", function(snapshot){
        let user_array = snapshot.val()
        let data;

        for(id in user_array){
            for(i in user_array[id]['videoHistory']){
                data = {
                    user_id: user_array[id]['phone'],
                    username: user_array[id]['username'],
                    phone: user_array[id]['phone'],
                    video_title: user_array[id]['videoHistory'][i]['videoTitle'],
                    video_url: user_array[id]['videoHistory'][i]['videoUrl'],
                    video_watch_count: user_array[id]['videoHistory'][i]['totalWatchCount'],
                    video_like: user_array[id]['videoHistory'][i]['like'],
                    video_dislike: user_array[id]['videoHistory'][i]['dislike'],
                    video_interest: user_array[id]['videoHistory'][i]['interest'],
                    post_id: user_array[id]['videoHistory'][i]['postId']
                    
                }

                data_array.push(data);
            }
            
        }

    }).then(() => {
        csv_data = convertObjectToCSV(data_array); 
    }).then(() => {
        csvDownload(csv_data, "recommender_user_watched_history");
    });
    
}

/**
 * Function that exports user video analytics data to csv. The latest video analytics data and timestamp will be taken
 * 
 * @param: none
 * @return: none
 */
function csvExportVideoAnalytics(){
    var data_array = [];
    var csv_data;
    firebase.database().ref('users').once("value", function(snapshot){
        let user_array = snapshot.val()
        let data;
        let videoAnalytics;

        for(id in user_array){
            for(i in user_array[id]['videoHistory']){
    
                if(user_array[id]['videoHistory'][i]['videoAnalytics'] !== undefined){
                    videoAnalytics = user_array[id]['videoHistory'][i]['videoAnalytics']
                
                    for(j in videoAnalytics){
                        for(k in videoAnalytics[j]){
                            data = {
                                user_id: user_array[id]['phone'],
                                username: user_array[id]['username'],
                                phone: user_array[id]['phone'],
                                post_id: user_array[id]['videoHistory'][i]['postId'],
                                video_watch_date: j,
                                video_last_watched_time: k,  // timestamp
                                video_duration_seconds: videoAnalytics[j][k]['videoDuration'],
                                video_current_time_seconds: videoAnalytics[j][k]['videoCurrentTime'],
                                video_elapsed_time_seconds: videoAnalytics[j][k]['videoElapsedTime'],
                                video_status: videoAnalytics[j][k]['videoStatus'],
                                video_percent_done: videoAnalytics[j][k]['videoPercent'],
                                video_visible_on_screen: videoAnalytics[j][k]['videoVisible']
    
                            } 
                        }

                        data_array.push(data)
                    }
  
                }
            }
            
        }

    }).then(() => {
        csv_data = convertObjectToCSV(data_array); 
    }).then(() => {
        csvDownload(csv_data, "recommender_user_video_analytics");
    });
}


/**
 * Function that exports data on users' favourited videos to csv
 * 
 * @param: none
 * @return: none
 */
function csvExportFavouritedVideos(){
    var data_array = [];
    var csv_data;
    firebase.database().ref('users').once("value", function(snapshot){
        let user_array = snapshot.val()
        let data;
        let videoFavourites;

        for(id in user_array){
            for(i in user_array[id]['videoFavourite']){
    
                if(user_array[id]['videoFavourite'] !== undefined){
                    videoFavourites = user_array[id]['videoFavourite']
                
                    data = {
                        user_id: user_array[id]['phone'],
                        username: user_array[id]['username'],
                        phone: user_array[id]['phone'],
                        post_id: user_array[id]['videoFavourite'][i]['postId'],
                        video_title: user_array[id]['videoFavourite'][i]['videoTitle'],
                        video_url: user_array[id]['videoFavourite'][i]['videoUrl'],
                        video_interest: user_array[id]['videoFavourite'][i]['interest'],
                        post_id: user_array[id]['videoFavourite'][i]['postId']

                    } 
                    

                    data_array.push(data)
                    
  
                }
            }
            
        }

    }).then(() => {
        csv_data = convertObjectToCSV(data_array); 
    }).then(() => {
        csvDownload(csv_data, "recommender_user_favourited_videos");
    });
}


/**
 * Function that exports the number of times a skill was selected on the learning interests page
 * and the number of times a video under that skill have been added to favourites
 * 
 * @param: none
 * @return: none
 */
function csvExportSkillsSelectedFreq(){
    let freq_arr = [];
    var data;
    var csv_data;

    firebase.database().ref('recommenderData').child(`skills/`).once("value", x => {
        x.forEach(snapshot => {
            freq_arr.push(snapshot.val());

            data = freq_arr.map(skill => ({
                skill_name: skill.skill,
                num_times_favourite_saved: skill.favouritedAmount,
                num_times_skill_selected_on_skills_page: skill.selectedAmount 
                
            }));

        });
    }).then(() => {
        csv_data = convertObjectToCSV(data); 
    }).then(() => {
        csvDownload(csv_data, "recommender_skill_selected_frequency");
    });

}

/**
 * Function that converts a data object array into a csv suitable format
 * 
 * @param: none
 * @return: none
 */
function convertObjectToCSV(data) {

    // get the headers 
    var headers = Object.keys(data[0]);
    headers = headers.join(',') + "\n";

    // loop through the rows
    var body = data.map(function(d) {
        return Object.keys(d).map(function(key) {
            return d[key];
        }).join(',');
    }).join("\n");

    return headers + body;
}

/**
 * Function that allows the user to download data into a csv file
 * 
 * @param csv_data: the data object that has been converted separated comma format
 * @param filename: name of the file that is created for the data to be saved into
 * @return: none
 */
function csvDownload(csv_data, filename) {
    // Adding the extension 
    var filename = filename + ".csv";
    
    // Create a blob
    var blob = new Blob([csv_data], {type: 'text/csv;charset=utf-8'});
    const url = window.URL.createObjectURL(blob);
    const a= document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


/**
 * Function that removes special characters such as comma and double quotation marks
 * in a string to prevent the csv format from being messy
 * 
 * @param str: a character string
 * @return: none
 */
function removeSpecialChar(str) {
    if (str == null || str == '') {
        return '';
    }
    return str.replace(/[^a-zA-Z0-9 ]/g, '');
}


/**
 * Function that calls all the export csv functions for the recommender
 * 
 * @param: none
 * @return: none
 */
function csvExportRecommenderData() {
    csvExportUser()
    csvExportVideoHistory()
    csvExportVideoAnalytics()
    csvExportFavouritedVideos()
    csvExportSkillsSelectedFreq()
}