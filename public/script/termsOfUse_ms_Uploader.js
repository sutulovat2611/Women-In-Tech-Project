/*
* This file is dedicated to uploading the Bahasa Melayu version of the terms of use onto the firestore
* */

function uploadTermsOfUse_ms(){
    let contents = "<h4>PERJANJIAN TERHADAP TERMA DAN SYARAT</h4>" +
        "Terma Penggunaan ini merupakan perjanjian yang mengikat secara sah yang dibuat antara anda, sama ada secara " +
        "peribadi atau atas nama entiti (\"anda\") dan Women-in-tech (\"Syarikat\", \"kami\", atau \"kita\"), mengenai " +
        "akses dan penggunaan anda terhadap aplikasi Women-in-tech webWomen-in-tech serta bentuk media lain, saluran " +
        "media, webWomen-in-tech mudah alih atau aplikasi mudah alih yang berkaitan, dihubungkan, atau disambungkan " +
        "dengannya (secara kolektif, \"Women-in-tech\"). Anda bersetuju bahawa dengan mengakses Women-in-tech, anda " +
        "telah membaca, memahami, dan bersetuju untuk terikat dengan semua Syarat Penggunaan ini. JIKA ANDA TIDAK " +
        "SETUJU DENGAN SEMUA SYARAT PENGGUNAAN INI, ANDA ADALAH DILARANG MENGGUNAKAN WOMEN-IN-TECH DAN ANDA HARUS " +
        "MENGHENTIKAN PENGGUNAAN SERTA MERTA." +
        "<br><br>" +
        "Terma dan syarat tambahan atau dokumen yang mungkin disiarkan di Women-in-tech dari semasa ke semasa " +
        "digabungkan dengan rujukan yang jelas di sini. Kami berhak, mengikut budi bicara mutlak kami, untuk membuat " +
        "perubahan atau pengubahsuaian pada Syarat Penggunaan ini pada bila-bila masa dan dengan sebarang alasan. Kami " +
        "akan memberitahu anda mengenai perubahan dengan memperbaharui tarikh \"Kemaskini terakhir\" Terma Penggunaan " +
        "ini, dan anda tiada hak untuk menerima pemberitahuan khusus berkenaan setiap perubahan tersebut. Anda " +
        "bertanggungjawab untuk merujuk Terma Penggunaan ini secara berkala untuk terus mengetahui sebarang kemas kini. " +
        "Anda tertakluk dan dianggap telah diberitahu dan menerima pindaan dalam sebarang Terma Penggunaan yang " +
        "telah dipinda apabila anda meneruskan penggunaan Women-in-tech setelah tarikh pindaan Terma Penggunaan disiarkan." +
        "<br><br>" +
        "Maklumat yang disiarkan di Women-in-tech tidak bertujuan untuk edaran atau digunakan oleh individu atau entiti " +
        "dalam sebarang bidang kuasa atau negara yang mana pengedaran atau penggunaan tersebut bertentangan dengan " +
        "undang-undang atau peraturan atau yang menyebabkan kami tertakluk kepada keperluan pendaftaran  dalam bidang " +
        "kuasa atau negara tersebut. Oleh itu, mereka/individu yang memilih untuk mengakses Women-in-tech dari lokasi " +
        "lain melakukannya atas inisiatif sendiri dan bertanggung jawab sepenuhnya untuk mematuhi undang-undang " +
        "tempatan, jika dan sejauh mana undang-undang tempatan adalah berkaitan."+
        "<br><br>" +
        "Women-in-tech direka untuk pengguna yang berumur sekurang-kurangnya 18 tahun. Individu yang berumur di bawah " +
        "18 tahun tidak dibenarkan menggunakan atau mendaftar untuk Women-in-tech." +
        "<h4>HAK HARTA INTELEK</h4>" +
        "Kecuali dinyatakan sebaliknya, Women-in-tech adalah hak milik kami dan semua kod sumber, pangkalan data, " +
        "fungsi, perisian, reka bentuk webWomen-in-tech, audio, video, teks, gambar, dan grafik di Women-in-tech " +
        "(secara kolektif, \"Kandungan\") dan tanda dagangan, tanda perkhidmatan, dan logo yang terkandung di dalamnya " +
        "(\"Tanda\") dimiliki atau dikendalikan oleh kami atau dilesenkan kepada kami, dan dilindungi oleh " +
        "undang-undang hak cipta dan tanda dagangan dan pelbagai hak harta intelek lain dan undang-undang, " +
        "undang-undang hak cipta antarabangsa, dan konvensyen antarabangsa. Kandungan dan Tanda yang disediakan di " +
        "Women-in-tech \"SEBAGAIMANA ADANYA\" adalah untuk maklumat dan kegunaan peribadi anda sahaja. Kecuali " +
        "sebagaimana yang dinyatakan secara jelas dalam Syarat Penggunaan ini, tidak ada bahagian dari Women-in-tech " +
        "dan tidak ada Kandungan atau Tanda yang dapat disalin,  dihasilkan semula, digabungkan, diterbitkan semula, " +
        "dimuat naik, disiarkan, dipaparkan secara terbuka, dikodkan, diterjemahkan, dihantar, diedarkan, dijual, " +
        "dilesenkan, atau dieksploitasi untuk apa-apa tujuan komersial, tanpa kebenaran bertulis daripada kami terlebih " +
        "dahulu.<br><br>" +
        "Dengan syarat anda layak untuk menggunakan Women-in-tech, anda diberi lesen terhad untuk mengakses dan " +
        "menggunakan Women-in-tech dan untuk memuat turun atau mencetak salinan mana-mana bahagian Kandungan yang anda " +
        "telah mendapat akses dengan betul semata-mata untuk kegunaan peribadi anda dan bukan kegunaan komersial. Kami " +
        "mempunyai hak mutlak untuk secara jelasnya tidak memberi kepada anda Kandungan dan Tanda, Women-in-tech." +
        "<h4>PERWAKILAN PENGGUNA</h4>" +
        "Dengan menggunakan Women-in-tech, anda menyatakan dan menjamin bahawa: (1) semua maklumat pendaftaran yang " +
        "anda daftarkan adalah benar, tepat, terkini, dan lengkap; (2) anda akan mengekalkan ketepatan maklumat " +
        "tersebut dan segera mengemas kini maklumat pendaftaran yang diperlukan; (3) anda mempunyai kemampuan yang sah " +
        "dan anda bersetuju untuk mematuhi Terma Penggunaan ini; (4) anda bukan orang bawah umur di bidang kuasa tempat " +
        "anda tinggal; (5) anda tidak akan mengakses Women-in-tech melalui cara automatik atau bukan manusia, sama ada " +
        "melalui bot, skrip, atau sebagainya; (6) anda tidak akan menggunakan Women-in-tech untuk tujuan haram atau " +
        "tidak sah; dan (7) penggunaan Women-in-tech oleh anda tidak akan melanggar undang-undang atau peraturan yang " +
        "berkaitan.<br><br>" +
        "Sekiranya anda memberikan maklumat yang tidak benar, tidak tepat, tidak terkini, atau tidak lengkap, kami " +
        "berhak untuk menggantung atau menghentikan akaun anda dan menolak penggunaan Women-in-tech yang terkini atau " +
        "yang akan datang (atau sebahagian daripadanya)." +
        "<h4>PENDAFTARAN PENGGUNA</h4>" +
        "Anda mungkin diminta untuk mendaftar dengan Women-in-tech. Anda bersetuju untuk merahsiakan kata laluan anda " +
        "dan akan bertanggungjawab untuk semua penggunaan akaun dan kata laluan anda. Kami berhak untuk membuang, " +
        "menuntut semula, atau mengubah nama pengguna yang anda pilih jika kami mendapati, mengikut budi bicara kami " +
        "sendiri, bahawa nama pengguna tersebut tidak sesuai, lucah, atau tidak dapat diterima." +
        "<h4>AKTIVITI LARANGAN</h4>" +
        "Anda tidak boleh mengakses atau menggunakan Women-in-tech untuk tujuan lain selain yang kami sediakan untuk " +
        "Women-in-tech. Women-in-tech tidak boleh digunakan untuk sebarang usaha komersial kecuali yang disokong atau " +
        "disetujui secara khusus oleh kami.<br><br>" +
        "Sebagai pengguna Women-in-tech, anda bersetuju untuk tidak:<br><br>" +
        "1. Mengambil data atau kandungan lain dari Women-in-tech secara sistematik untuk mencipta atau menyusun, " +
        "secara langsung atau tidak langsung, koleksi, penyusunan, pangkalan data, atau direktori tanpa kebenaran " +
        "bertulis daripada kami.<br><br>" +
        "2. Memperdaya, menipu, atau mengelirukan kami dan pengguna lain, terutamanya dalam sebarang usaha untuk " +
        "mendapatkan maklumat sensitif akaun seperti kata laluan pengguna.<br><br>" +
        "3. Memintas, mematikan, atau mengganggu ciri-ciri keselamatan yang berkaitan dengan Women-in-tech, termasuk " +
        "ciri-ciri yang menghalang atau menyekat penggunaan atau penyalinan sebarang Kandungan atau mengenakan had pada " +
        "penggunaan Women-in-tech dan / atau Kandungan yang terdapat di dalamnya.<br><br>" +
        "4. Mengganggu, mencemarkan, atau memudaratkan, kami dan / atau Women-in-tech, mengikut pendapat kami.<br><br>" +
        "5. Menggunakan maklumat yang diperoleh dari Women-in-tech untuk mengganggu, menyalahgunakan, atau memudaratkan orang lain.<br><br>" +
        "6. Menyalahgunakan perkhidmatan sokongan kami atau menghantar laporan penyalahgunaan atau salah laku palsu.<br><br>" +
        "7. Menggunakan Women-in-tech dengan cara yang tidak sesuai dengan undang-undang atau peraturan yang berkaitan.<br><br>" +
        "8. Menggunakan Women-in-tech untuk mengiklankan atau menawarkan untuk penjualan barang dan perkhidmatan.<br><br>" +
        "9. Terlibat dalam mewujudkan kerangka atau pautan ke Women-in-tech tanpa izin.<br><br>" +
        "10. Memuat naik atau menghantar (atau cuba memuat naik atau menghantar) virus, Trojan horse, atau bahan lain, " +
        "termasuk menggunakan huruf besar berlebihan dan menghantar spam (pengeposan teks berulang secara berterusan), " +
        "yang mengganggu penggunaan dan kenikmatan tanpa gangguan mana-mana pihak Women-in-tech atau mengubah atau " +
        "mengganggu penggunaan, ciri-ciri, fungsi, operasi, atau penyelenggaraan Women-in-tech.<br><br>" +
        "11. Terlibat dalam penggunaan sistem secara automatik, seperti menggunakan skrip untuk menghantar komen atau " +
        "mesej, atau menggunakan perlombongan data, robot, atau alat pengumpulan dan pengekstrakan data yang serupa.<br><br>" +
        "12. Memadam hak cipta atau notis hak milik lain dari sebarang Kandungan.<br><br>" +
        "13. Mencuba untuk menyamar sebagai pengguna atau orang lain atau menggunakan nama pengguna lain.<br><br>" +
        "14. Menjual atau memindahkan profil anda.<br><br>" +
        "15. Memuat naik atau menghantar (atau cuba memuat naik atau menghantar) sebarang bahan yang bertindak sebagai " +
        "mekanisme pengumpulan atau penghantaran maklumat pasif atau aktif, termasuk tanpa batasan, format pertukaran " +
        "grafik yang jelas (\"gif\"), 1 × 1 piksel, bug web, kuki, atau peranti lain yang serupa (kadang-kadang disebut " +
        "sebagai \"perisian intip\" atau \"mekanisme pengumpulan pasif\" atau \"pcms\").<br><br>" +
        "16. Mengganggu, atau menimbulkan beban yang tidak wajar pada Women-in-tech atau rangkaian atau perkhidmatan " +
        "yang disambungkan ke Women-in-tech.<br><br>" +
        "17. Menyerang, mengganggu, mengugut, atau mengancam mana-mana pekerja atau ejen kami yang terlibat dalam " +
        "penyediaan mana-mana bahagian Women-in-tech kepada anda.<br><br>" +
        "18. Mencuba untuk memintas tindakan Women-in-tech yang direka untuk mencegah atau menyekat akses ke " +
        "Women-in-tech, atau mana-mana bahagian Women-in-tech mana pun.<br><br>" +
        "19. Menyalin atau menyesuaikan perisian Women-in-tech, termasuk tetapi tidak terhad kepada Flash, PHP, HTML, " +
        "JavaScript, atau kod lain.<br><br>" +
        "20. Menafsirkan, menguraikan, membongkar, atau mana-mana perisian yang terdiri atau yang membentuk mana-mana " +
        "bahagian dari Women-in-tech dengan apa cara sekalipun.<br><br>" +
        "21. Kecuali mungkin hasil penggunaan enjin carian standard atau penyemak imbas Internet, menggunakan, " +
        "melancarkan, mengembangkan, atau mengedarkan sistem automatik apa pun, termasuk tanpa batasan, mana-mana " +
        "labah-labah, robot, utiliti menipu, pengikis, atau pembaca luar talian yang mengakses Women-in-tech, atau " +
        "menggunakan atau melancarkan skrip atau perisian lain yang tidak dibenarkan.<br><br>" +
        "22. Menggunakan ejen membeli atau ejen pembelian untuk membuat pembelian di Women-in-tech.<br><br>" +
        "23. . Melakukan apa-apa penggunaan Women-in-tech secara tidak sah, termasuk mengumpulkan nama pengguna dan / " +
        "atau alamat e-mel pengguna dengan cara elektronik atau cara lain untuk tujuan menghantar e-mel tanpa diminta, " +
        "atau membuat akaun pengguna dengan cara automatik atau dengan alasan palsu.<br><br>" +
        "24. Menggunakan Women-in-tech sebagai sebahagian daripada usaha untuk bersaing dengan kami atau sebaliknya " +
        "menggunakan Women-in-tech dan / atau Kandungan untuk usaha menjana pendapatan atau perusahaan komersial." +
        "<h4>SUMBANGAN PENGGUNA</h4>" +
        "Women-in-tech tidak menawarkan pengguna untuk menyerah atau menghantar kandungan. Kami mungkin memberi anda " +
        "peluang untuk membuat, menyerahkan, mengirim, memaparkan, menghantar, melakukan, menerbitkan, menyebarkan, " +
        "atau menyiarkan kandungan dan bahan kepada kami atau di Women-in-tech, termasuk tetapi tidak terhad kepada " +
        "teks, tulisan, video, audio, gambar , grafik, komen, cadangan, atau maklumat peribadi atau bahan lain " +
        "(secara kolektif, \"Sumbangan\"). Sumbangan mungkin dapat dilihat oleh pengguna Women-in-tech yang lain dan " +
        "melalui pihak ketiga webWomen-in-tech. Oleh itu, setiap Sumbangan yang anda kirimkan akan diperlakukan sesuai " +
        "dengan Dasar Privasi Women-in-tech. Apabila anda mencipta atau menyediakan Sumbangan, anda dengan demikian " +
        "menyatakan dan menjamin bahawa:<br><br>" +
        "1. Pembuatan, pengedaran, penghantaran, paparan umum, atau persembahan, dan mengakses, memuat turun, atau " +
        "menyalin Sumbangan anda tidak dan tidak akan melanggar hak milik, termasuk tetapi tidak terbatas pada hak " +
        "cipta, paten, tanda dagang, rahsia perdagangan, atau hak moral mana-mana pihak ketiga.<br><br>" +
        "2. Anda adalah pencipta dan pemilik atau memiliki lesen, hak, persetujuan, pelepasan, dan izin yang " +
        "diperlukan untuk menggunakan dan memberi kuasa kepada kami, Women-in-tech, dan pengguna Women-in-tech lain " +
        "untuk menggunakan Sumbangan anda dengan cara apa pun yang difikirkan oleh Women-in-tech dan Terma Penggunaan ini.<br><br>" +
        "3. Anda mempunyai persetujuan bertulis, pelepasan, dan / atau izin dari setiap orang yang dapat dikenal pasti " +
        "dalam Sumbangan anda untuk menggunakan nama atau kesamaan setiap orang yang dapat dikenal pasti untuk " +
        "membolehkan penyertaan dan penggunaan Sumbangan anda dengan apa-apa cara yang dipertimbangkan oleh " +
        "Women-in-tech dan Terma Penggunaan ini.<br><br>" +
        "4. Sumbangan anda tidak salah, tepat, atau tidak mengelirukan.<br><br>" +
        "5. Sumbangan anda bukan iklan yang tidak diminta atau tidak sah, bahan promosi, skim piramid, surat berantai, " +
        "spam, mel kepada ramai orang, atau bentuk permintaan lain.<br><br>" +
        "6. Sumbangan anda tidak lucah, cabul, bernafsu, kotor, ganas, menyerang, memfitnah, atau tidak menjelekkan " +
        "(seperti yang ditentukan oleh kami).<br><br>" +
        "7. Sumbangan anda tidak memperolok-olokkan, mengejek, meremehkan, mengugut, atau menyalahgunakan sesiapa.<br><br>" +
        "8. Sumbangan anda tidak menyokong penggulingan pemerintah secara ganas atau menghasut, mendorong, atau " +
        "mengancam bahaya fizikal terhadap pihak lain.<br><br>" +
        "9. Sumbangan Anda tidak melanggar hukum, undang-undang, atau peraturan yang berkenaan.<br><br>" +
        "10. Sumbangan anda tidak melanggar hak privasi atau publisiti mana-mana pihak ketiga.<br><br>" +
        "11. Sumbangan anda tidak mengandungi bahan yang mengumpulkan maklumat peribadi dari sesiapa yang berumur 18 " +
        "tahun ke bawah atau mengeksploitasi individu di bawah umur 18 tahun secara seksual atau ganas.<br><br>" +
        "12. Sumbangan anda tidak melanggar undang-undang yang berlaku berkaitan pornografi kanak-kanak, atau " +
        "undang-undang yang bertujuan untuk melindungi kesihatan atau kesejahteraan kanak-kanak di bawah umur;<br><br>" +
        "13. Sumbangan anda tidak mengandungi komen yang menyinggung bangsa, asal negara, jantina, kecenderungan seksual, atau kecacatan fizikal.<br><br>" +
        "14. Sumbangan anda tidak melanggar, atau menghubungkan ke bahan yang melanggar, ketentuan Terma Penggunaan " +
        "ini, atau undang-undang atau peraturan yang berkaitan.<br><br>" +
        "Sebarang penggunaan Women-in-tech yang melanggar perkara di atas adalah melanggar Terma Penggunaan ini dan " +
        "dapat mengakibatkan, antara lain, penghentian atau penangguhan hak anda untuk menggunakan Women-in-tech." +
        "<h4>LESEN SUMBANGAN</h4>" +
        "Anda dan Women-in-tech bersetuju bahawa kami dapat mengakses, menyimpan, memproses, dan menggunakan segala " +
        "maklumat dan data peribadi yang anda berikan mengikuti syarat-syarat Dasar Privasi dan pilihan anda " +
        "(termasuk tetapan).<br><br>"+
        "Dengan mengemukakan cadangan atau maklum balas lain mengenai Women-in-tech, anda bersetuju bahawa kami boleh " +
        "menggunakan dan berkongsi maklum balas tersebut untuk tujuan apa sekalipun tanpa memerlukan kebenaran dan/atau " +
        "pampasan kepada anda.<br><br>" +
        "Kami tidak menyatakan kepemilikan ke atas Sumbangan anda. Anda kekal sebagai penuh ke atas semua Sumbangan " +
        "anda dan sebarang hak harta intelek atau hak milik lain yang berkaitan dengan Sumbangan anda. Kami tidak " +
        "bertanggungjawab untuk sebarang pernyataan atau perwakilan dalam Sumbangan yang diberikan oleh anda di " +
        "mana-mana bahagian di Women-in-tech. Anda bertanggungjawab sepenuhnya atas Sumbangan anda kepada " +
        "Women-in-tech dan anda dengan jelas bersetuju untuk membebaskan kami dari sebarang tanggungjawab dan untuk " +
        "tidak melakukan tindakan undang-undang terhadap kami mengenai Sumbangan anda." +
        "LESEN PERMOHONAN APLIKASI MUDAH ALIH<h4></h4>" +
        "Penggunaan Lesen<br><br>" +
        "Sekiranya anda mengakses Women-in-tech melalui aplikasi mudah alih, maka kami memberi anda hak yang boleh " +
        "dibatalkan, tidak eksklusif, tidak dapat dipindahtangankan, terhad untuk memasang dan menggunakan aplikasi " +
        "mudah alih pada peranti elektronik tanpa wayar yang dimiliki atau dikendalikan oleh anda, dan untuk mengakses " +
        "dan menggunakan aplikasi mudah alih pada peranti tersebut sesuai dengan terma dan syarat lesen aplikasi mudah " +
        "alih ini yang terkandung dalam Terma Penggunaan ini. Anda tidak boleh: (1) menguraikan, merekayasamundur, " +
        "membongkar, berusaha mendapatkan kod sumber, atau menyahsulitkan aplikasi; (2) melakukan pengubahsuaian, " +
        "penyesuaian, peningkatan, terjemahan, atau karya terbitan dari aplikasi; (3) melanggar undang-undang, " +
        "perintah, atau peraturan yang berkaitan dengan akses atau penggunaan aplikasi Anda; (4) menghapus, mengubah, " +
        "atau mengaburkan sebarang notis hak milik (termasuk notis hak cipta atau tanda dagangan) yang disiarkan oleh " +
        "kami atau pemberi lesen aplikasi; (5) menggunakan aplikasi untuk setiap usaha yang menghasilkan pendapatan, " +
        "perusahaan komersial, atau tujuan lain yang tidak dirancang atau dimaksudkan; (6) membuat aplikasi tersedia " +
        "melalui rangkaian atau persekitaran lain yang memungkinkan akses atau penggunaan oleh beberapa peranti atau " +
        "pengguna pada masa yang sama; (7) menggunakan aplikasi untuk membuat produk, perkhidmatan, " +
        "atau perisian yang, secara langsung atau tidak langsung, berdaya saing dengan atau dengan cara apa pun " +
        "sebagai pengganti aplikasi; (8) menggunakan aplikasi untuk menghantar pertanyaan automatik ke mana-mana " +
        "webWomen-in-tech atau untuk menghantar e-mel komersial yang tidak diminta; atau (9) menggunakan maklumat " +
        "proprietari atau antara muka atau harta intelek kami yang lain dalam reka bentuk, pengembangan, pembuatan, " +
        "pelesenan, atau pengedaran sebarang aplikasi, aksesori, atau peranti untuk digunakan dengan aplikasi tersebut.<br><br>" +
        "<h4>Peranti Apple and Android</h4>" +
        "Syarat berikut berlaku apabila anda menggunakan aplikasi mudah alih yang diperoleh dari Apple Store atau " +
        "Google Play (masing-masing \"Pengedar Aplikasi\") untuk mengakses Women-in-tech: (1) lesen yang " +
        "diberikan kepada anda untuk aplikasi mudah alih kami adalah terhad kepada yang lesen yang tidak boleh " +
        "dipindakmilik untuk menggunakan aplikasi pada peranti yang menggunakan sistem operasi Apple iOS atau " +
        "Android, sebagaimana berlaku, dan sesuai dengan peraturan penggunaan yang ditetapkan dalam syarat perkhidmatan " +
        "Pengedar Aplikasi yang berkenaan; (2) kami bertanggung jawab untuk menyediakan perkhidmatan penyelenggaraan " +
        "dan sokongan yang berkaitan dengan aplikasi mudah alih seperti yang ditentukan dalam syarat dan ketentuan " +
        "lesen aplikasi mudah alih ini yang terkandung dalam Terma Penggunaan ini atau sebagaimana yang dinyatakan di " +
        "bawah undang-undang yang berkenaan, dan Anda mengakui bahawa setiap Pengedar Aplikasi tidak mempunyai apa-apa " +
        "kewajiban untuk menyediakan perkhidmatan penyelenggaraan dan sokongan yang berkaitan dengan aplikasi mudah " +
        "alih; (3) sekiranya berlaku kegagalan aplikasi untuk beroperasi dengan mematuhi sebarang jaminan yang " +
        "berkenaan, Anda boleh memaklumkan Pengedar Aplikasi yang berkenaan, dan Pengedar Aplikasi, sesuai dengan " +
        "syarat dan polisi, boleh mengembalikan harga pembelian, jika ada, yang dibayarkan untuk pembelian aplikasi " +
        "mudah alih, dan sejauh yang dibenarkan oleh undang-undang yang berkenaan, Pengedar Aplikasi tidak akan " +
        "mempunyai sebarang kewajiban jaminan lain sehubungan dengan aplikasi mudah alih; (4) anda menyatakan dan " +
        "menjamin bahawa (i) anda tidak berada di negara yang dikenakan embargo pemerintah AS, atau yang telah " +
        "ditetapkan oleh pemerintah AS sebagai negara \"penyokong pengganas\" dan (ii) anda tidak disenaraikan dalam " +
        "senarai parti yang dilarang atau dihadkan oleh pemerintah AS; (5) anda mesti mematuhi syarat perjanjian pihak " +
        "ketiga yang berlaku ketika menggunakan aplikasi mudah alih, misalnya, jika anda mempunyai aplikasi VoIP, maka " +
        "anda tidak boleh melanggar perjanjian perkhidmatan data tanpa wayar mereka ketika menggunakan aplikasi mudah " +
        "alih; dan (6) anda mengakui dan bersetuju bahawa Pengedar Aplikasi adalah penerima pihak ketiga dari terma dan " +
        "syarat dalam lesen aplikasi mudah alih ini yang terkandung dalam Terma Penggunaan ini, dan bahawa setiap " +
        "Pengedar Aplikasi akan memiliki hak (dan akan dianggap menerima hak) untuk menguatkuasakan terma dan syarat " +
        "dalam lesen aplikasi mudah alih ini yang terkandung dalam Terma Penggunaan ini terhadap anda sebagai penerima " +
        "pihak ketiga daripadanya." +
        "<h4>PENYERAHAN</h4>" +
        "Anda mengakui dan bersetuju bahawa sebarang pertanyaan, komen, cadangan, idea, maklum balas, atau maklumat " +
        "lain mengenai Women-in-tech (\"Penyerahan\") yang anda berikan kepada kami adalah bukan rahsia dan akan " +
        "menjadi milik kami sendiri. Kami akan memiliki hak eksklusif, termasuk semua hak harta intelek, dan berhak " +
        "atas penggunaan dan penyebaran Penyerahan ini tanpa had untuk tujuan sah, komersial atau sebagainya, tanpa " +
        "pengakuan atau pampasan kepada anda. Anda dengan ini mengetepikan semua hak moral ke atas apa-apa Penyerahan " +
        "tersebut, dan dengan ini anda menjamin bahawa mana-mana Penyerahan tersebut adalah asli dengan anda atau " +
        "bahawa anda berhak untuk menghantar Penyerahan tersebut. Anda bersetuju bahawa tidak akan ada tuntutan " +
        "terhadap kami atas tuduhan pelanggaran atau penyalahgunaan atau penyalahgunaan hak milik dalam Penyerahan anda." +
        "<h4>PENGURUSAN WOMEN-IN-TECH</h4>" +
        "Kami berhak, tetapi tidak wajib, untuk: (1) memantau Women-in-tech atas pelanggaran Syarat Penggunaan ini; " +
        "(2) mengambil tindakan undang-undang yang sesuai terhadap sesiapa saja yang, menurut budi bicara kami, " +
        "melanggar undang-undang atau Terma Penggunaan ini, termasuk tanpa batasan, melaporkan pengguna tersebut " +
        "kepada pihak berwajib; (3) mengikut budi bicara kami dan tanpa batasan, menolak, menghadkan akses ke, " +
        "menghadkan ketersediaan, atau menyekat (sejauh mungkin teknologi) mana-mana Sumbangan anda atau sebahagian " +
        "daripadanya; (4) mengikut budi bicara kami dan tanpa batasan, notis, atau tanggungjawab, untuk membuang dari " +
        "Women-in-tech atau melumpuhkan semua fail dan kandungan yang bersaiz terlalu besar atau dengan cara apa pun " +
        "yang membebankan sistem kami; dan (5) menguruskan Women-in-tech dengan cara yang dirancang untuk melindungi " +
        "hak dan harta benda kami dan untuk memudahkan fungsi Women-in-tech dengan betul." +
        "<h4>TEMPOH DAN PENAMATAN</h4>" +
        "Syarat Penggunaan ini akan terus berkuatkuasa dan berkuat kuasa semasa anda menggunakan Women-in-tech. " +
        "TANPA MEMBATASKAN SETIAP PERUNTUKAN LAIN-LAIN SYARAT PENGGUNAAN INI, KAMI BERHAK UNTUK, MENGIKUT BUDI BICARA " +
        "KAMI DAN TANPA PEMBERITAHUAN ATAU TANGGUNGJAWAB, MENAFIKAN AKSES KEPADA DAN PENGGUNAAN WOMEN-IN-TECH " +
        "(TERMASUK MENYEKAT ALAMAT IP TERTENTU) ATAU SETIAP ORANG BAGI APA-APA ALASAN ATAU TIDAK ADA ALASAN, " +
        "TERMASUK TANPA BATASAN UNTUK PELANGGARAN SEBARANG PERWAKILAN, JAMINAN, ATAU PERJANJIAN YANG TERDAPAT DALAM " +
        "TERMA PENGGUNAAN INI ATAU SETIAP UNDANG-UNDANG ATAU PERATURAN YANG BERKAITAN. KAMI MUNGKIN MENGHENTIKAN " +
        "PENGGUNAAN ATAU PENYERTAAN ANDA DALAM APLIKASI WOMEN-IN-TECH ATAU MENGHAPUSKAN AKAUN ANDA DAN SETIAP " +
        "KANDUNGAN ATAU MAKLUMAT YANG ANDA HANTAR PADA BILA-BILA MASA, TANPA PERINGATAN, MENGIKUT BUDI BICARA KAMI.<br><br>" +
        "Sekiranya kami menghentikan atau menangguhkan akaun anda dengan alasan apa pun, anda dilarang mendaftar dan " +
        "membuat akaun baru dengan nama anda, nama palsu atau pinjaman, atau nama pihak ketiga, walaupun anda mungkin " +
        "bertindak atas nama pihak ketiga. Selain menghentikan atau menangguhkan akaun Anda, kami berhak untuk " +
        "mengambil tindakan undang-undang yang sesuai, tidak terhad kepada ganti rugi sivil, jenayah, dan injunksi " +
        "pemulihan." +
        "<h4>MODIFIKASI DAN GANGGUAN</h4>" +
        "Kami berhak untuk mengubah, atau membuang kandungan Women-in-tech pada bila-bila masa atau dengan alasan apa " +
        "pun mengikut budi bicara kami tanpa pemberitahuan. Namun, kami tidak berkewajiban untuk membaharui maklumat " +
        "mengenai Women-in-tech ini. Kami juga berhak untuk mengubah atau menghentikan semua atau sebahagian dari " +
        "Women-in-tech tanpa pemberitahuan pada bila-bila masa. Kami tidak akan bertanggungjawab kepada anda atau " +
        "pihak ketiga untuk sebarang pengubahsuaian, perubahan harga, penggantungan, atau penghentian Women-in-tech.<br><br>" +
        "Kami tidak dapat menjamin bahawa Women-in-tech akan tersedia setiap waktu. Kami mungkin mengalami masalah " +
        "perkakasan, perisian, atau masalah lain atau perlu melakukan penyelenggaraan yang berkaitan dengan " +
        "Women-in-tech, yang mengakibatkan gangguan, kelewatan, atau kesilapan. Kami berhak untuk mengubah, menyemak, " +
        "mengemas kini, menangguhkan, atau menghentikan Women-in-tech pada bila-bila masa atau dengan alasan apa pun " +
        "tanpa pemberitahuan kepada anda. Anda bersetuju bahawa kami tidak bertanggungjawab sama sekali atas segala " +
        "kehilangan, kerosakan, atau ketidakselesaan yang disebabkan oleh ketidakmampuan anda untuk mengakses atau " +
        "menggunakan Women-in-tech semasa tempoh tergendala atau pemberhentian Women-in-tech. Tidak ada dalam Terma " +
        "Penggunaan ini yang akan ditafsirkan untuk mewajibkan kami untuk menjaga dan menyokong Women-in-tech atau " +
        "memberikan pembetulan, kemas kini, atau siaran yang berkaitan dengannya." +
        "<h4>UNDANG-UNDANG KERAJAAN</h4>" +
        "Syarat-syarat ini akan ditadbir dan ditentukan berdasarkan undang-undang Malaysia. " +
        "<h4>PENYELESAIAN PERTIKAIAN</h4>" +
        "Anda bersetuju untuk menyerahkan semua pertikaian yang berkaitan dengan Syarat atau hubungan yang dibatalkan " +
        "oleh Perjanjian ini kepada bidang kuasa mahkamah Malaysia." +
        "<h4>PEMBETULAN</h4>" +
        "Mungkin ada maklumat tentang Women-in-tech yang mempunyai kesalahan tipografi, ketidaktepatan, atau " +
        "peninggalan, termasuk keterangan, harga, ketersediaan, dan berbagai maklumat lain. Kami berhak untuk " +
        "memperbaiki kesilapan, ketidaktepatan, atau kecatatandan untuk mengubah atau mengemas kini maklumat di " +
        "Women-in-tech pada bila-bila masa, tanpa pemberitahuan terlebih dahulu." +
        "<h4>PENAFIAN</h4>" +
        "WOMEN-IN-TECH DISEDIAKAN SEDIA ADA DAN TERSEDIA. ANDA SETUJU BAHAWA RISIKO PENGGUNAAN WOMEN-IN-TECH ANDA DAN " +
        "PERKHIDMATAN KAMI AKAN DITANGGUNG SEPENUHNYA OLEH ANDA. SEJAUH MANA YANG DIBENARKAN OLEH UNDANG-UNDANG, KAMI " +
        "MENAFIKAN SEMUA JAMINAN, YANG NYATA ATAU TERSIRAT, BERKAITAN DENGAN WOMEN-IN-TECH DAN PENGGUNAAN ANDA, " +
        "TERMASUK, TANPA HAD, JAMINAN TRSIRAT KEBOLEHDAGANGAN, KESESUAIAN UNTUK TUJUAN TERTENTU, DAN BUKAN PELANGGARAN. " +
        "KAMI TIDAK MEMBERIKAN JAMINAN ATAU PENYATAAN TENTANG KETEPATAN ATAU KELENGKAPAN KANDUNGAN WOMEN-IN-TECH ATAU " +
        "KANDUNGAN SETIAP WEB WOMEN-IN-TECH YANG BERKAITAN DENGAN WOMEN-IN-TECH DAN KAMI TIDAK AKAN BERTANGGUNGJAWAB " +
        "ATAS (1) KESILAPAN, KESALAHAN, ATAU KETIDAKTEPATAN KANDUNGAN DAN BAHAN, (2) KECEDERAAN PERIBADI ATAU KEROSAKAN " +
        "HARTA BENDA, APA JUA BENTUKNYA AKIBAT DARIPADA AKSES ANDA DAN PENGGUNAAN WOMEN-IN-TECH, (3) SETIAP AKSES TANPA " +
        "IZIN KE ATAU PENGGUNAAN PELAYAN SELAMAT KAMI DAN / ATAU SEBARANG MAKLUMAT PERIBADI DAN / ATAU MAKLUMAT " +
        "KEWANGAN YANG TERSIMPAN DI DALAMNYA , (4) SEBARANG GANGGUAN ATAU PENGHENTIAN PENGHANTARAN KE ATAU DARI " +
        "WOMEN-IN-TECH, (5) SETIAP PEPIJAT, VIRUS, TROJAN HORSES, ATAU SEUMPAMANYAYANG BOLEH DISEBARKAN KE ATAU " +
        "MELALUI PIHAK KETIGA WOMEN-IN-TECH, DAN / ATAU (6) SETIAP KESILAPAN ATAU PENINGGALAN DALAM APA-APA KANDUNGAN " +
        "DAN BAHAN ATAU KERANA SEGALA KERUGIAN ATAU KEROSAKAN SETIAP JENIS YANG BERLAKU AKIBAT PENGGUNAAN SETIAP " +
        "KANDUNGAN YANG DIHANTAR, DIJALANKAN, ATAU LAIN-LAIN YANG DISEDIAKAN OLEH WOMEN-IN-TECH. KAMI TIDAK MENJAMIN, " +
        "MENYOKONG, ATAU MEMIKUL TANGGUNGJAWAB UNTUK APA-APA PRODUK ATAU PERKHIDMATAN YANG DIIKTIRAF ATAU DITAWARKAN " +
        "OLEH PIHAK KETIGA MELALUI APLIKASI WOMEN-IN-TECH, APA-APA WEB WOMEN-IN-TECH HYPERLINKED, ATAU APA-APA " +
        "WEBWOMEN-IN-TECH, ATAU APLIKASI MUDAH ALIH YANG TERKANDUNG DALAM SETIAP SEPANDUK ATAU PENGIKLANAN LAIN, " +
        "DAN TIDAK BERTANGGUNGJAWAB UNTUK PEMANTAUAN SETIAP TRANSAKSI ANTARA ANDA DAN MANA-MANA PIHAK KETIGA YANG " +
        "MENYEDIAKAN PRODUK ATAU PERKHIDMATAN. SEPERTI MEMBELI PRODUK ATAU PERKHIDMATAN MELALUI APA-APA MEDIUM ATAU " +
        "LINGKUNGAN, ANDA HARUS MENGGUNAKAN PERTIMBANGAN DAN BUDI BICARA TERBAIK ANDA DAN BERHATI-HATI APABILA PERLU." +
        "<h4>BATASAN TANGGUNGJAWAB</h4>" +
        "TIADA APA-APA KEADAAN YANG BOLEH MENGAKIBATKAN KAMI, PENGARAH, PEKERJA, ATAU EJEN KAMI BERTANGGUNGJAWAB " +
        "KEPADA ANDA ATAU MANA-MANA PIHAK KETIGA UNTUK MANA-MANA KEROSAKAN LANGSUNG, TIDAK LANGSUNG, BERSEPADU, " +
        "TELADAN, INSIDEN, KHAS, ATAU PUNITIF, TERMASUK KEHILANGAN KEUNTUNGAN, KEHILANGAN HASIL, KEHILANGAN DATA, " +
        "ATAU KEROSAKAN LAIN AKIBAT DARI PENGGUNAAN WOMEN-IN-TECH ANDA, WALAUPUN SEKIRANYA KAMI TELAH MENYAMPAIKAN " +
        "KEMUNGKINAN KEROSAKAN TERSEBUT." +
        "<h4>INDEMNIFIKASI</h4>" +
        "Anda bersetuju untuk membela, mengganti rugi, dan tidak memperbahayakan kami, termasuk anak syarikat, sekutu, " +
        "dan semua pegawai, ejen, rakan kongsi, dan pekerja kami masing-masing, dari dan terhadap sebarang kerugian, " +
        "kerosakan, tanggungjawab, tuntutan, atau permintaan, termasuk yuran dan perbelanjaan peguam yang munasabah, " +
        "yang dibuat oleh mana-mana pihak ketiga akibat atau yang timbul daripada: (1) penggunaan Women-in-tech; (2) " +
        "pelanggaran Syarat Penggunaan ini; (3) setiap pelanggaran pernyataan dan jaminan Anda yang ditetapkan dalam " +
        "Terma Penggunaan ini; (4) pelanggaran hak pihak ketiga oleh anda, termasuk tetapi tidak terhad kepada hak " +
        "harta intelek; atau (5) apa-apa tindakan berbahaya secara terbuka terhadap pengguna lain Women-in-tech " +
        "dengan sesiapa yang anda hubungi melalui Women-in-tech. Walau apa pun yang disebutkan di atas, kami berhak, " +
        "atas perbelanjaan anda, untuk mengambil alih pembelaan dan kawalan eksklusif bagi apa-apa perkara yang anda " +
        "dikehendaki ganti rugi kepada kami, dan anda bersetuju untuk bekerjasama, dengan perbelanjaan anda, dengan " +
        "pembelaan terhadap tuntutan tersebut. Kami akan menggunakan usaha yang munasabah untuk memberitahu anda " +
        "mengenai tuntutan, tindakan, atau proses yang tertakluk kepada ganti rugi ini setelahmenyedarinya." +
        "<h4>DATA PENGGUNA</h4>" +
        "Kami akan menyimpan data tertentu yang anda hantar ke Women-in-tech untuk tujuan pengurusan prestasi " +
        "Women-in-tech, serta data yang berkaitan dengan penggunaan Women-in-tech oleh Anda. Walaupun kami melakukan " +
        "data sandaran rutin secara berkala, Anda sepenuhnya bertanggung jawab atas semua data yang anda hantar atau " +
        "yang berkaitan dengan aktiviti yang telah Anda lakukan menggunakan Women-in-tech. Anda bersetuju bahawa kami " +
        "tidak akan bertanggung jawab kepada anda atas kehilangan atau kerosakan data tersebut, dan anda dengan ini " +
        "mengetepikan hak tindakan terhadap kami yang timbul dari kehilangan atau kerosakan data tersebut." +
        "<h4>KOMUNIKASI ELEKTRONIK, TRANSAKSI, DAN TANDATANGAN</h4>" +
        "Mengunjungi Women-in-tech, menghantar e-mel kepada kami, dan mengisi borang dalam talian merupakan komunikasi " +
        "elektronik. Anda bersetuju untuk menerima komunikasi elektronik, dan anda bersetuju bahawa semua perjanjian, " +
        "pemberitahuan, pendedahan, dan komunikasi lain yang kami berikan kepada anda secara elektronik, melalui e-mel " +
        "dan di Women-in-tech, memenuhi apa-apa syarat undang-undang bahawa komunikasi tersebut secara bertulis. ANDA " +
        "SETUJU DENGAN PENGGUNAAN TANDATANGAN ELEKTRONIK, KONTRAK, PESANAN, DAN REKOD LAIN, DAN PEMBERITAHUAN " +
        "ELEKTRONIK, DASAR, DAN REKOD TRANSAKSI YANG DIMULAKAN ATAU DILENGKAPI OLEH KAMI ATAU MELALUI WOMEN-IN-TECH. " +
        "Anda dengan ini mengetepikan apa-apa hak atau syarat di bawah undang-undang, peraturan, atau undang-undang " +
        "lain di mana-mana bidang kuasa yang memerlukan tandatangan asal atau penghantaran atau penyimpanan rekod " +
        "bukan elektronik, atau pembayaran atau pemberian kredit dengan cara lain daripada kaedah elektronik." +
        "<h4>PERKARA LAIN</h4>" +
        "Terma Penggunaan ini dan sebarang polisi atau peraturan operasi yang dihantarkan oleh kami di Women-in-tech " +
        "atau berkenaan dengan Women-in-tech merupakan keseluruhan perjanjian dan persefahaman antara anda dan kami. " +
        "Kegagalan kami untuk melaksanakan atau menegakkan hak atau syarat di dalam Terma Penggunaan ini tidak akan " +
        "berfungsi sebagai pengabaian hak atau peruntukan tersebut. Terma Penggunaan ini beroperasi sejauh mana yang " +
        "dibenarkan oleh undang-undang. Kami boleh menyerahkan mana-mana atau semua hak dan kewajiban kami kepada " +
        "orang lain pada bila-bila masa. Kami tidak akan bertanggungjawab atau dipertanggungjawab atas kehilangan, " +
        "kerosakan, kelewatan, atau kegagalan untuk bertindak yang disebabkan oleh sebarang perkara di luar kawalan " +
        "kami yang munasabah. Sekiranya ada syarat atau bahagian dari syarat dari Terma Penggunaan ini ditentukan " +
        "sebagai melanggar undang-undang, tidak sah atau tidak dapat dilaksanakan, syarat atau bahagian dari syarat " +
        "tersebut dianggap terputus dari Terma Penggunaan ini dan tidak mempengaruhi kesahihan dan keberkesanan syarat " +
        "yang selebihnya. Tidak ada usaha sama, perkongsian, pekerjaan atau hubungan agensi yang dibuat antara anda dan " +
        "kami sebagai hasil daripada Terma Penggunaan atau penggunaan Women-in-tech ini. Anda bersetuju bahawa " +
        "Terma Penggunaan ini tidak akan ditafsirkan terhadap kami kerana kami telah menyusunnya."

    firebase.firestore().collection("TermsOfUse").doc("TermsOfUse_ms").set({
        contents: contents
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}