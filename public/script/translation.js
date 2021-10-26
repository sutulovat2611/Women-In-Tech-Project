

const LANGUAGE_KEY = "LANGUAGE";

window.onload = execute();

document.getElementById("lang_butt_id_c").addEventListener("click", disableTranslateButton);  //listens to button change
document.getElementById("lang_butt_id_m").addEventListener("click", disableTranslateButton);  //listens to button change
document.getElementById("lang_butt_id_t").addEventListener("click", disableTranslateButton);  //listens to button change
document.getElementById("lang_butt_id_e").addEventListener("click", disableTranslateButton);  //listens to button change

function execute(){
    disableTranslateButton();
    eraseCookiesGoogle();
}


function eraseCookiesGoogle() {

    let list = ["__Secure-3PSIDCC","__Secure-3PSID","SID","SIDCC","__Secure-3PAPISID","__Secure-1PAPISID","HSID","SAPISID","APISID","SSID","1P_JAR","OGPC","CONSENT","OTZ","ANID","NID"]
    for(let cookie of list){
        document.cookie = `${cookie}=; domain=.google.com; expires=Thu, 01 Jan 1970 00:00:01 GMT`;

    }



}

function showTranslationModal(){
    document.getElementById("myModal").style.display = "block";
}

function hideTranslationModal(){
    document.getElementById("myModal").style.display = "none";
}


function disableTranslateButton(){

    let lang = localStorage.getItem(LANGUAGE_KEY);

    if (lang == "Malay"){
        document.getElementById("lang_butt_id_m").disabled = true;
        document.getElementById("lang_butt_id_c").disabled = false;
        document.getElementById("lang_butt_id_t").disabled = false;
        document.getElementById("lang_butt_id_e").disabled = false;
    }

    else if (lang == "Chinese (Simplified)"){
        document.getElementById("lang_butt_id_c").disabled = true;
        document.getElementById("lang_butt_id_m").disabled = false;
        document.getElementById("lang_butt_id_t").disabled = false;
        document.getElementById("lang_butt_id_e").disabled = false;
    }
    else if (lang == "Thai"){
        document.getElementById("lang_butt_id_t").disabled = true;
        document.getElementById("lang_butt_id_c").disabled = false;
        document.getElementById("lang_butt_id_m").disabled = false;
        document.getElementById("lang_butt_id_e").disabled = false;
    }
    else{
        document.getElementById("lang_butt_id_e").disabled = true;
        document.getElementById("lang_butt_id_c").disabled = false;
        document.getElementById("lang_butt_id_m").disabled = false;
        document.getElementById("lang_butt_id_t").disabled = false;
    }


}



function getUserLanguage(){
    return  localStorage.getItem(LANGUAGE_KEY)
}

function changeLang(lang){
    console.log(window.location);
    eraseCookiesGoogle();
    translateLanguage(lang);

    // if (window.location.pathname =="/"){  //reset the captcha
    //     setTimeout(function(){
    //         window.location.reload(false);
    //     }, 1000);
    //     }

}  



function reset(){

    eraseCookiesGoogle();
    localStorage.setItem(LANGUAGE_KEY, "English");
    jQuery('#\\:2\\.container').contents().find('#\\:2\\.restore').click();

    if (window.location.pathname =="/"){  //reset the captcha
        setTimeout(function(){
            window.location.reload(false);
        }, 1000);
    }

}


function googleTranslateElementInit() {
    eraseCookiesGoogle();
    new google.translate.TranslateElement(
        { pageLanguage: 'en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false },
        'google_translate_element');
}

function translateLanguage(lang) {


    localStorage.setItem(LANGUAGE_KEY, lang);

    googleTranslateElementInit();
    var $frame = $('.goog-te-menu-frame:first');
    if (!$frame.size()) {
        alert("Error: Could not find Google translate frame.");
        return new Promise(function(resolve, reject){resolve(false)});
    }
    $frame.contents().find('.goog-te-menu2-item span.text:contains(' + lang + ')').get(0).click();
    return new Promise(function(resolve, reject){resolve(false)});
}
