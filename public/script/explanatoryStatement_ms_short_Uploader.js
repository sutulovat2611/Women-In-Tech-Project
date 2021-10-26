/*
* This file is dedicated to uploading the short malay version of the explanatory statement onto the firestore
* */

function uploadExplanatoryStatement_ms_short(){
    let contents = "<center><b>(Kumpulan Peserta Tinjauan)</b></center><br>" +
        "<center><b>MUHREC Project ID: 29459</b><br>" +
        "<b>E-mel projek:</b> womenintech@monash.edu</center><br>" +
        "<b>Professor Teh Pei Lee</b><br>" +
        "School of Business<br>" +
        "Tel: +603-55144971<br>" +
        "emel: teh.pei.lee@monash.edu<br><br>" +
        "<b>Dr Ewilly Liew Jie Ying</b><br>" +
        "School of Business<br>" +
        "Tel: +603-55145872<br>" +
        "emel: ewilly.liew@monash.edu<br><br>" +
        "<b>Apa yang penyelidikan ini melibatkan?</b>Kami ingin memahami keperluan dan persepsi anda tentang pembelajaran " +
        "menggunakan aplikasi mudah alih. Anda dijemput untuk menyelesaikan tinjauan chatbot dalam aplikasi mudah alih " +
        "yang dicipta oleh penyelidik Monash Malaysia, yang akan mengambil masa sekitar 15 - 30 minit.<br><br>" +
        "<b>Siapa yang boleh menyertai tinjauan ini?</b> Terbuka kepada <b>semua wanita berumur 50 tahun ke atas sahaja.</b><br><br>" +
        "<b>Pengeluaran: </b>Anda boleh menarik diri pada bila-bila masa sepanjang tempoh tinjauan, atau mengambil " +
        "tinjauan kemudian di tempat yang anda tinggalkan dari percubaan terakhir.<br>" +
        "<b>Pembayaran: </b>Anda akan diberikan tanda penghargaan sebanyak <b>RM10</b> tunai setelah tinjauan diselesaikan.<br><br>" +
        "<b>Kerahsiaan: </b>Tinjauan ini adalah sulit. Semua respons yang anda sumbangkan akan dianonimkan. Pada akhir " +
        "tinjauan, anda akan dibawa ke borang Qualtrics yang lain dan akan diminta dua maklumat tambahan. (1) Anda " +
        "mempunyai pilihan untuk memilih untuk dihubungi di nombor telefon bimbit anda untuk projek penyelidikan " +
        "(berkaitan) yang akan datang yang telah mendapat kelulusan etika. (2) Anda mempunyai pilihan untuk menentukan " +
        "bagaimana anda ingin menerima pembayaran balik wang tunai dengan memberikan (a) perincian perbankan dalam " +
        "talian, atau (b) perincian e-wallet, atau (c) menghentikan tinjauan. Maklumat tambahan akan disimpan secara " +
        "berasingan dan tidak akan berkaitan dengan respons tinjauan chatbot anda. Selepas pembayaran tunai, semua " +
        "data pembayaran akan dihapus secara kekal dari platform Qualtrics. Sila lihat " +
        "<a href='https://www.qualtrics.com/privacy-statement/' target='_blank'>Penyataan Privasi Qualtrics</a>" +
        " untuk maklumat lebih lanjut.<br><br>" +
        "<b>Hasil tinjauan: </b>Tidak ada respons individu yang akan dilaporkan. Hanya respons agregat yang dikenal " +
        "pasti akan diterbitkan dalam jurnal, buku / bab buku yang disemak oleh rakan sebaya dan dibentangkan di " +
        "persidangan. Peserta boleh menghubungi ketua penyiasat untuk mengetahui keputusananalisis.<br><br>" +
        "<b>Aduan: </b>untuk masalah etika atau aduan mengenai pelaksanaan projek, sila hubungi Jawatankuasa Etika " +
        "Penyelidikan Manusia Universiti Monash di muhrec@monash.edu atau Cik Jocelyn Fam dari Quality and Governance, " +
        "Monash University Malaysia di Tel: (+603) 5514 5664 atau e-mel: jocelyn.fam@monash.edu.<br><br>" +
        "Harap maklum, dengan meneruskan tinjauan, anda bersetuju untuk mengambil bahagian dalam penyelidikan ini dan " +
        "bersetuju dengan maklumat yang diberikan dalam Pernyataan Penjelasan.<br><br>" +
        "<a href='./explanatoryStatementLongPage.html'>Pautan ke Penyataan Penjelasan Panjang</a>"

    firebase.firestore().collection("ExplanatoryStatement").doc("ExplanatoryStatement_ms_short").set({
        contents: contents
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}