/*
* This file is dedicated to uploading the long malay version of the explanatory statement onto the firestore
* */

function uploadExplanatoryStatement_ms_long(){
    let contents = "<center><b>(Kumpulan Peserta Tinjauan)</b></center><br>" +
        "<b>Project ID: 29459</b><br>" +
        "<b>Tajuk projek: Kerja Lestari melalui Aplikasi Women-in-Tech untuk Wanita Berumur di Malaysia dan Thailand: " +
        "Mengintegrasikan Penyelidikan Tindakan dan Pendekatan Sains Reka Bentuk</b><br><br>" +
        "<center><b>E-mel projek: </b>womenintech@monash.edu</center><br>" +
        "<b>Professor Teh Pei Lee</b><br>" +
        "School of Business <br>" +
        "Tel: +603-55144971<br>" +
        "e-mel: teh.pei.lee@monash.edu <br><br>" +
        "<b>Dr Ewilly Liew Jie Ying</b><br>" +
        "School of Business<br>" +
        "Tel: +603-55145872<br>" +
        "e-mel: ewilly.liew@monash.edu<br><br>" +
        "Anda dijemput untuk mengambil bahagian dalam kajian ini. Sila baca Pernyataan Penjelasan ini dengan lengkap " +
        "sebelum memutuskan untuk mengambil bahagian dalam penyelidikan ini atau tidak. Sekiranya anda ingin mendapatkan " +
        "maklumat lebih lanjut mengenai aspek projek ini, anda digalakkan untuk menghubungi penyelidik melalui nombor " +
        "telefon atau alamat e-mel di atas.<br><br>" +
        "<b>Apa yang penyelidikan ini melibatkan?</b><br><br>" +
        "Di Malaysia dan Thailand, ramai wanita berumur tidak terjamin dari segi kewangan dan kurang pengalaman teknologi. " +
        "Pandemik COVID-19 ini lagi mendesakkan wanita berumur dengan risiko tinggi terhadap kemungkinan jangkitan, " +
        "kehilangan pekerjaan, dan kehilangan sokongan social. Dengan perintah kawalan pergerakan dan penutupan tempat " +
        "kerja yang semakin ketara, alternatif harus disediakan untuk mendidik wanita berumur yang kurang berpengetahuan " +
        "dan berpengalaman mengenai penggunaan teknologi. Kajian ini bertujuan untuk mengkaji kesedaran, " +
        "keperluan, pengetahuan, sikap dan amalan semasa terhadap teknologi di kalangan wanita berumur di kawasan " +
        "luar bandar di Malaysia dan Thailand.<br><br>" +
        "Kami ingin memahami keperluan dan persepsi anda mengenai pembelajaran kemahiran berkaitan dengan kehidupan " +
        "dan / atau pekerjaan melalui penggunaan aplikasi mudah alih. Maklumat anda akan ditafsirkan dan diterjemahkan " +
        "dari segi sosial dan budaya demi meningkatkan reka bentuk aplikasi mudah alih kami, iaitu Women-in-tech yang " +
        "bermanfaat untuk wanita berumur di kawasan luar bandar terhadap pembelajaran kemahiran dalam talian. " +
        "Aplikasi mudah alih Women-in-tech kami direkakan dengan perkhidmatan cadangan berasaskan kecerdasan buatan " +
        "(Artificial Intelligence) sebagai pilihan panduan pembelajaran dalam talian yang tersedia khas untuk wanita berumur.<br><br>" +
        "Anda dijemput untuk menyelesaikan tinjauan chatbot dalam aplikasi mudah alih yang dikembangkan oleh penyelidik" +
        " Monash Malaysia. Tinjauan chatbot akan dilakukan pada penyemak imbas web menggunakan telefon bimbit anda, " +
        "dan akan mengambil masa sekitar 15 - 30 minit untuk diselesaikan. Pada akhir tinjauan chatbot, anda akan " +
        "dibawa ke borang Qualtrics lain untuk menunjukkan pilihan anda jika anda ingin memilih untuk dihubungi " +
        "untuk temu ramah lanjutan dalam enam (6) bulan ke depan.<br><br>" +
        "<b>Pembayaran / Pampasan</b><br><br>" +
        "Anda akan diberikan tanda penghargaan sebanyak RM 10 tunai melalui transaksi dalam talian setelah selesai " +
        "tinjauan chatbot. Pada akhir tinjauan chatbot, anda akan dinawa ke borang Qualtrics lain untuk memilih sama ada " +
        "anda ingin menerima pembayaran tunai melalui (a) pemindahan perbankan dalam talian atau (b) pemindahan e-dompet " +
        "dalam talian. Secara khusus, anda akan diminta untuk memberikan perincian perbankan seperti Nama Penerima " +
        "Pembayaran, Nombor Telefon Penerima, Nombor Kad Pengenalan Penerima, Nombor Akaun Bank, Nama Bank dan " +
        "Alamat E-mel untuk transaksi dalam talian dan untuk tujuan pengauditan oleh pasukan kewangan Monash. Ada " +
        "kemungkinan tidak disebutkan namanya tetapi maklumat peribadi ini hanya digunakan untuk tujuan transaksi " +
        "dalam talian sebagai tanda penghargaan dan bukan untuk bahagian lain dalam kajian ini. Maklumat tambahan " +
        "akan disimpan secara berasingan dan tidak akan dihubungkan dengan respons tinjauan chatbot anda. Selepas " +
        "pembayaran tunai, semua data pembayaran akan dihapus secara kekal dari platform Qualtrics. Sila lihat" +
        "<a href='https://www.qualtrics.com/privacy-statement/' target='_blank'>Penyataan Privasi Qualtrics</a>" +
        " untuk maklumat lebih lanjut.<br><br>" +
        "<b>Prosedur Penyelidikan</b><br><br>" +
        "Tinjauan chatbot mengharuskan anda mengakses tinjauan di penyemak imbas web menggunakan telefon bimbit anda. " +
        "Oleh itu, nombor telefon bimbit anda diperlukan sebagai pengecam unik untuk memulakan tinjauan chatbot. " +
        "Setelah anda menghantar respons tinjauan anda, kami akan membatalkan identifikasi jawapan tinjauan anda dari " +
        "nombor telefon bimbit anda setelah tinjauan chatbot berakhir. Respons yang dihantar anda akan diberikan ID " +
        "tanpa nama dan hanya respons tinjauan tanpa nama yang akan dianalisis. Anda boleh memilih untuk menjawab " +
        "tinjauan chatbot dalam empat bahasa yang berbeza iaitu Bahasa Inggeris, Bahasa Malaysia, Bahasa Cina, dan Thai.<br><br>" +
        "<b>Mengapa anda dijemput untuk menyertai penyelidikan ini?</b><br><br>" +
        "Penyertaan anda dalam kajian ini adalah sukarela. Wanita berumur 50 tahun ke atas dijemput untuk mengambil " +
        "bahagian dalam kajian ini. Kami berminat dengan keperluan dan persepsi anda mengenai penggunaan teknologi " +
        "untuk pembelajaran dan pandangan mengenai penggunaan aplikasi mudah alih untuk pembelajaran dalam talian " +
        "menggunakan perkhidmatan cadangan berasaskan AI.<br><br>" +
        "<b>Sumber pembiayaan</b><br><br>" +
        "Kajian ini disokong oleh Skim Geran Penyelidikan Pembangunan Lestari MUM-ASEAN 2021 - 2023.<br><br>" +
        "<b>Bersetuju untuk mengambil bahagian dalam projek dan menarik diri dari penyelidikan</b><br><br>" +
        "Penyertaan dalam kajian ini adalah sukarela dan anda tidak berkewajiban untuk bersetuju untuk turut serta. " +
        "Dengan meneruskan tinjauan, anda bersetuju untuk mengambil bahagian dalam penyelidikan ini dan bersetuju " +
        "dengan maklumat yang diberikan dalam Pernyataan Penjelasan. Anda boleh menarik diri dari kajian ini pada " +
        "bila-bila masa semasa tinjauan chatbot. Kami boleh menarik balik tanggapan anda sebelum tinjauan chatbot " +
        "berakhir. Namun, ketika tinjauan chatbot berakhir, tanggapan yang anda kirimkan akan dinyahpastikan dari " +
        "nombor telefon bimbit anda. Pada ketika itu, kami tidak dapat menarik balik jawapan anda dari kajian setelah " +
        "tanggapan yang anda kirimkan dimasukkan ke dalam pangkalan data setelah tinjauan chatbot berakhir kerana kami " +
        "tidak dapat menelusuri jawapan anda lagi setelah data yang disusun dinyah-identifikasi dan dianonimkan.<br><br>" +
        "<b>Kemungkinan faedah dan risiko kepada peserta</b><br><br>" +
        "Hasil kajian akan membantu meningkatkan pemahaman kita tentang penyelesaian teknologi yang sesuai dengan usia, " +
        "berdasarkan peranan reka bentuk sosio-teknikal dan pengembangan kemampuan kecerdasan buatan (AI), untuk masa " +
        "depan wanita berumur di negara-negara membangun. Ini akan membantu penyelidik dan agensi kerajaan untuk " +
        "mempertimbangkan penyelesaian teknologi baru untuk meningkatkan kesejahteraan sosio-ekonomi wanita berumur " +
        "dalam dunia yang kompetitif.<br><br>" +
        "Tidak ada risiko potensial yang dapat diramalkan dalam jangka pendek atau panjang, kecuali untuk waktu yang " +
        "dihabiskan selama tinjauan, menggunakan telefon bimbit peserta untuk menjawab pertanyaan tinjauan melalui " +
        "chatbot berteknologi rendah.<br><br>" +
        "<b>Kerahsiaan</b><br><br>" +
        "Ini adalah projek penyelidikan yang melibatkan penyelidik dari Monash University Malaysia dan Thammasat " +
        "University, Thailand. Semua data yang anda sumbangkan akan dianonimkan. Oleh itu, anda akan diberikan ID tanpa " +
        "nama setelah tinjauan chatbot selesai, dan jawapan anda akan dirahsiakan. Respons anda tidak akan dikenal pasti, " +
        "dan tidak ada satu pun hasil yang akan dilaporkan. Hanya penyelidik dari Universiti Monash Malaysia yang " +
        "dapat mengakses data lengkap. Selain itu, hasilnya akan diterbitkan dalam jurnal yang dikaji rakan sebaya, " +
        "bab buku / buku, tesis pelajar dan dibentangkan di persidangan. Pada akhir tinjauan, anda mempunyai pilihan " +
        "untuk memilih untuk dihubungi mengenai projek penyelidikan masa depan (berkaitan) yang telah mendapat " +
        "kelulusan etika. Sekiranya anda memilih untuk dihubungi (ini adalah sukarelawan), anda akan diarahkan ke " +
        "tinjauan Qualtrics lain di mana anda dapat memberikan nama dan nombor telefon bimbit anda - maklumat pilihan " +
        "yang diberikan ini tidak akan dihubungkan dengan respons tinjauan anda.<br><br>" +
        "<b>Penyimpanan data</b><br><br>" +
        "Data yang dikumpulkan akan disimpan dan disimpan sesuai dengan peraturan Monash University. Untuk semua " +
        "salinan data yang diperoleh dalam format kertas, salinan ini akan ditranskripsikan ke dalam format elektronik " +
        "dan salinan cetak asal akan dihancurkan. Oleh itu, semua data akan disimpan dalam format digital dengan " +
        "perlindungan kata laluan dan hanya penyelidik yang terlibat dalam kajian ini yang dapat mengakses data " +
        "tersebut. Data dalam format digital akan dihapus secara kekal jika tidak diperlukan lagi atau hingga lima " +
        "(5) tahun.<br><br>" +
        "<b>Penggunaan data untuk tujuan lain</b><br><br>" +
        "Analisis data akan dilakukan berdasarkan data yang mana semua maklumat peribadi yang telah dikeluarkan telah " +
        "dihapus. Peserta boleh menghubungi penyelidik untuk mengetahui hasil analisis yang dilakukan berdasarkan data " +
        "yang mana semua maklumat peribadi yang telah dikeluarkan telah dikeluarkan. Sesuai dengan garis panduan " +
        "perkongsian data, data yang tidak dikenali dapat disediakan untuk digunakan oleh penyelidik lain. Data ini " +
        "akan disimpan di repositori awam yang selamat dan mungkin menjadi keperluan beberapa jurnal sebelum " +
        "diterbitkan. Maklumat pengenalan anda tidak ankan dimasukkan ke dalam data yang dikongsi.<br><br>" +
        "<b>Keputusan</b><br><br>" +
        "Sekiranya anda ingin diberitahu mengenai hasil penyelidikan, sila hubungi Profesor Teh Pei Lee di " +
        "Tel: + 603-55144971 atau e-mel: teh.pei.lee@monash.edu.<br><br>" +
        "<b>Aduan</b><br><br>" +
        "Sekiranya anda mempunyai kebimbangan atau aduan mengenai pelaksanaan projek, anda boleh menghubungi pegawai berikut<br><br>" +
        "<b>Cik Jocelyn Fam<br>" +
        "Quality and Governance, Monash University Malaysia<br>" +
        "Jalan Lagoon Selatan, 47500, Bandar Sunway, Selangor Darul Ehsan, Malaysia.<br>" +
        "Tel: (+603) 5514 5664<br>" +
        "E-mel: jocelyn.fam@monash.edu</b><br><br>" +
        "Terima kasih.<br><br><br>" +
        "<b>Dr. Teh Pei Lee</b><br>" +
        "Professor<br>" +
        "School of Business, Monash University Malaysia.<br>" +
        "Tel: +603-55144971; E-mel: teh.pei.lee@monash.edu"

    firebase.firestore().collection("ExplanatoryStatement").doc("ExplanatoryStatement_ms_long").set({
        contents: contents
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}