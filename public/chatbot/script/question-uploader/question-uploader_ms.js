/**
 * This file is used to automatically upload the survey questions
 * to the Firestore Database.
 *
 * @author Yong Peng (ychi0014@student.monash.edu)
 */

const SUB_QUESTIONS_1_12 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "Tinggal bersama seseorang di rumah", // Qs 1.12.1
    "Tinggal bersendirian di rumah", // Qs 1.12.2
    "Tinggal bersama seseorang di tempat penjagaan orang tua", // Qs 1.12.3
    "Tinggal bersendirian di tempat penjagaan orang tua" // Qs 1.12.4
];

const SUB_QUESTIONS_HINTS_1_12 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "memillih pilihan", // TODO get translation confirmation: "Select an Option" -> "pilih pilihan"
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan"
];

const SUB_QUESTIONS_1_13 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "Bergantung pada orang lain untuk memenuhi <b>keperluan saya</b>.", // Qs 1.13.a
    "Tidak mendapat rawatan <b>perubatan</b> yang diperlukan? ", // Qs 1.13.b
    "Tidak mempunyai wang untuk membeli <b>bahan makanan</b>. ", // Qs 1.13.c
    "Tidak dapat membayar <b>sekurang-kurangnya satu</b> bil." // Qs l.13.d
];

const SUB_QUESTIONS_HINTS_1_13 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan"
];

const SUB_QUESTIONS_1_14 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "Secara keseluruhan, kehidupan saya hampir ideal.", // Qs 1.14.a
    "Keadaan hidup saya sekarang sangat baik.", // Qs 1.14.b
    "Saya berpuas hati dengan hidup saya." // Qs 1.14.c
];

// TODO Fill in tooltips
const SUB_QUESTIONS_HINTS_1_14 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan"
];

const PART1 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "Berapakah <b>umur</b> anda dalam tahun?", // Qs 1.1
    "Apakah <b>jantina</b> anda?", // Qs 1.2
    "Apakah kumpulan <b>etnik</b> anda?", // Qs 1.3
    "Di mana anda tinggal sekarang?", // Qs 1.4
    "Berapakah <b>purata pendapatan isi rumah</b> anda sebulan?", // Qs 1.5
    "Apakah tahap <b>pendidikan</b> tertinggi anda yang telah habis diselesaikan?", // Qs 1.6
    "Apakah <b>status perkahwinan</b> anda?", // Qs 1.7
    "Berapa banyak <b>anak</b> yang dalam <b>tanggungan</b> anda?", // Qs 1.8
    "Berapa orang <b>anak</b> yang anda <b>berkomunikasi atau hubungi</b> setiap minggu? ", // Qs 1.9

    // The question above this line is question 1.9

    "Berapa banyak <b>saudara mara</b> yang rapat dengan anda?", // Qs 1.10 TODO get confirmation on translation "saudara" -> "saudara mara"
    "Berapa ramai <b>rakan karib</b> anda? ", // Qs 1.11
    "Apakah status kehidupan berdikari anda?", // Qs 1.12

    // The question above this line is a long question 1.12

    "Dalam 6 bulan terakhir, adakah anda mengalami situasi berikut?", // Qs 13

    // The question above this line is a long question (1.13)

    "Sejauh mana anda <b>berpuas hati</b> dengan kehidupan anda sekarang? (Nilai dari 1 hingga 5)" // Qs 1.14

    // The question above this line is a long question 1.14
];

const HINTS_PART1 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "masukkan nombor (e.g. 1, 2, 3)",
    "memilih pilihan", // TODO get translation confirmation: "Select an Option" -> "pilih pilihan"
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "masukkan nombor (e.g. 1, 2, 3)",
    "masukkan nombor (e.g. 1, 2, 3)",

    // The question above this line is question 1.10


    "masukkan nombor(e.g. 1, 2, 3)",
    "memilih pilihan", // TODO get translation confirmation: "Select an Option" -> "pilih pilihan"
    "memilih pilihan",
    // The question above this line is a long question (1.14)

    "memilih pilihan",
    // The question above this line is a long question (1.14)

    "memilih pilihan"
    // The question above this line is a long question (1.14)
];

const PART2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "Apakah status <b>pekerjaan anda sekarang?</b>", // Qs 2.1
    "Apa yang anda lakukan/ pekerjaan / profesion anda <b>sekarang?</b>", // Qs 2.2
    "Sejauh mana anda <b>berpuas hati</b> dengan status pekerjaan anda sekarang? (Nilai dari 1 hingga 5)", // Qs 2.3
    "Adakah anda kehilangan <b>pekerjaan</b> kerana wabak COVID-19?", // Qs 2.4
    "Adakah anda kehilangan <b>pendapatan</b> anda kerana wabak COVID-19?", // Qs 2.5
    "Seberapa yakin anda dalam mencari <b>pekerjaan baru</b> dalam masa terdekat?", // Qs 2.6
    "Sejauh mana anda yakin dapat mengekalkan <b>pekerjaan semasa</b> anda dalam masa terdekat?" // Qs 2.7
];

const HINTS_PART2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "memilih pilihan",
    "Menaipkan jawapan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan"
];

const SUB_QUESTIONS_3_2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "SMS, pesanan teks (seperti Whatsapp, WeChat, dll.)", // Qs 3.2.a
    "Melayari laman web", // Qs 3.2.b
    "Menonton video", // Qs 3.2.c
    "Menggunakan Zoom, Facetime, Skype, Google Talk, dll.", // Qs 3.2.d
    "Menggunakan aplikasi pengesanan kontak COVID-19 (seperti MySejahtera)", // Qs 3.2.e
    "Membeli-belah atas talian atau e-dagang (seperti Lazada, Shopee, dll.)", // Qs 3.2.f
    "Menggunakan perbankan mudah alih / e-wallet (seperti GrabPay, BoostPay, FavePay, Touch N Go Pay, dll.)", // Qs 3.2.g
    // The question above this line is question 3.2g

    "Pemesanan atas talian untuk makanan atau bahan makanan mentah", // Qs 3.2.h
    "Menggunakan rangkaian sosial (seperti Facebook, Instagram, Twitter, dll.)", // Qs 3.2.i
    "Mengambil gambar", // Qs 3.2.j
    "Pemetaan (seperti Peta Google, Waze, Tom-Tom, dll.)", // Qs 3.2.k
    "Menguruskan janji temu di kalendar saya", // Qs 3.2.l
    "Membaca berita atas talian atau majalah atas talian", // Qs 3.2.m
    "Mencatat (seperti senarai belanja atau tugas) yang perlu saya lakukan", // Qs 3.2.n
    "Penggambaran video", // Qs 3.2.o
    // The question above this line is question 3.2o

    "Mendengarkan muzik", // Qs 3.2.p
    "Bermain permainan", // Qs 3.2.q
    "Menggunakan untuk menghubungi pihak berkuasa kerajaan" // Qs 3.2.r
];

const SUB_QUESTIONS_HINTS_3_2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    // The question above this line is question 3.2g

    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    // The question above this line is question 3.2p

    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
];

const PART3 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "Bagaimana anda mengakses Internet menggunakan telefon bimbit anda?", // Qs 3.1
    // The question above this line is question 3.1

    "Sejauh mana anda <b>yakin menggunakan telefon bimbit anda</b> untuk aktiviti berikut? (Nilai dari 1 hingga 5)" // Qs 3.2
    // The question above this line is a long question (3.2)
];

const HINTS_PART3 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "memilih pilihan",
    // The question above this line is question 3.1

    ""
    // The question above this line is a long question (3.2)

];

const SUB_QUESTIONS_4_3 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "Kemahiran ICT / teknologi (seperti cara menggunakan perisian telefon bimbit atau komputer)", // Qs 4.3.a
    "Kemahiran komunikasi sosial (seperti bagaimana memperbaiki hubungan atau berinteraksi dengan orang lain)", // Qs 4.3.b
    "Kemahiran pelengkap (seperti belajar kemahiran atau hobi yang tidak berkaitan dengan pekerjaan)", // Qs 4.3.c
    "Kemahiran yang berkaitan dengan pekerjaan (seperti cara meningkatkan produktiviti pekerjaan / perniagaan)" // Qs 4.3.d
];

const SUB_QUESTIONS_HINTS_4_3 = [
    "",
    // The above question is a placeholder to allow 1-indexing
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan"
];

const SUB_QUESTIONS_4_5 = [
    "",
    // The above question is a placeholder to allow 1-indexing
    "Saya memahami erti kehidupan.", // Qs 4.5.a
    "Saya memahami maksud aktiviti kehidupan seharian.", // Qs 4.5.b
    "Saya tertarik dalam aktiviti kehidupan seharian.", // Qs 4.5.c
    "Saya mempunyai keyakinan dalam aktiviti kehidupan seharian.", // Qs 4.5.d
    "Saya mempunyai keyakinan diri dalam pelaksanaan aktiviti kehidupan seharian.", // Qs 4.5.e
    "Saya mempunyai keyakinan terhadap aktiviti kehidupan seharian yang baru dibentuk.", // Qs 4.5.f
    "Saya mempunyai keupayaan untuk menunjukkan diri sendiri.", // Qs 4.5.g
    "Saya mempunyai keupayaan untuk memilih alternatif yang lebih baik.", // Qs 4.5.h
    "Saya mempunyai keupayaan untuk membuat keputusan mengenai masalah tertentu.", // Qs 4.5.i
    "Saya mempunyai keupayaan untuk bekerjasama dengan orang lain.", // Qs 4.5.j
    "Saya mempunyai keupayaan membina pasukan dengan yang lain.", // Qs 4.5.k
    "Saya mempunyai keupayaan untuk membina gabungan.", // Qs 4.5.l
    "Saya mempunyai keupayaan menyelesaikan masalah dengan orang lain." // Qs 4.5.m
];

const SUB_QUESTIONS_HINTS_4_5 = [
    "",
    // The above question is a placeholder to allow 1-indexing
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan",
    "memilih pilihan"
];

const PART4 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "Berapa <b>kerap</b> anda cuba mempelajari sesuatu yang baru atau berguna menggunakan \n" +
    "telefon bimbit? (Nilai dari 1 hingga 7)\n" +
    "[1] Tidak pernah, [2] Sebulan sekali, [3] Beberapa kali dalam sebulan, [4] Seminggu sekali, " +
    "[5] Beberapa kali seminggu, [6] Sekali sehari, [7] Berkali-kali sehari", // Qs 4.1

    "Berapa <b>jam seminggu</b> yang anda curahkan untuk mempelajari sesuatu yang baru atau berguna, menggunakan telefon bimbit?", // Qs 4.2
    // The question above this line is question 4.2

    "Seberapa <b>minat</b> anda <b>mempelajari</b> kemahiran berikut menggunakan telefon bimbit? (Nilai dari 1 hingga 5)", // Qs 4.3
    // The question above this line is a long question (4.3)

    "Apakah <b>kemahiran yang berkaitan dengan pekerjaan</b> yang ingin anda pelajari menggunakan telefon bimbit?", // Qs 4.4
    // The question above this line is question 4.4

    "Sejauh mana anda bersetuju atau tidak setuju bahawa pernyataan berikut <b>menerangkan tentang anda</b>? (Nilai dari 1 hingga 5)" // Qs 4.5
    // The question above this line is question 4.5
];

const HINTS_PART4 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "masukkan nombor (e.g. 1, 2, 3)",
    "masukkan nombor (e.g. 1, 2, 3)",
    // The question above this line is question 4.2

    "memilih pilihan",
    // The question above this line is a long question (4.3)

    "",
    "memilih pilihan"
]

const PART5 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "Mengapa anda berminat belajar menggunakan telefon bimbit?", // Qs 5.1
    "Sumber apa yang anda mahukan untuk belajar menggunakan telefon bimbit?", // Qs 5.2
    "Apakah perkara yang paling mengecewakan sejauh ini semasa belajar menggunakan telefon bimbit?", // Qs 5.3
    "Beritahu kami mengenai masalah atau cabaran anda di tempat kerja. " // Qs 5.4
]

const HINTS_PART5 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "Taipkan tindak balas",
    "Taipkan tindak balas",
    "Taipkan tindak balas",
    "Taipkan tindak balas"
]

// TODO 2.6 and 2.7 - Likert Scale

let question_1_10_id = "";
let question_1_8_id = "";
let question_2_1_id = "";
let question_2_3_id = "";

function pushPart1Questions() {
    // Set part index to 1 and reset
    // the question counter
    setPartNumber(1);

    // Question 1.1
    pushNumeric("1.1", PART1[1], 50, 100, true, SKIP_END_SURVEY, HINTS_PART1[1]);

    // Question 1.2
    let choices_1_2 = ["Lelaki", "Perempuan"]
    let skip_choices_1_2 = ["Lelaki"];
    pushMultipleChoice("1.2", PART1[2], choices_1_2, skip_choices_1_2, SKIP_END_SURVEY, HINTS_PART1[2]);

    // Question 1.3
    let choices_1_3 = ["Malayu", "Cina", "India", "Thai", "Lain-lain"];
    //pushMultipleChoice("1.3", PART1[3], choices_1_3, [], SKIP_NOT_ALLOWED, HINTS_PART1[3]);
    pushMultipleChoiceOthers("1.3", PART1[3], choices_1_3, [], SKIP_NOT_ALLOWED, HINTS_PART1[3]);

    // Question 1.4
    let choices_1_4 = ["Kawasan bandar", "Kawasan luar bandar"];
    pushMultipleChoice("1.4", PART1[4], choices_1_4, [], SKIP_NOT_ALLOWED, HINTS_PART1[4]);

    // Question 1.5
    let choices_1_5 = ["Tiada pendapatan", "Kurang dari MYR2500", "MYR2501-3169", "MYR3170-3969", "MYR3970-4849", "MYR4850 atau lebih"];
    pushMultipleChoice("1.5", PART1[5], choices_1_5, [], SKIP_NOT_ALLOWED, HINTS_PART1[5]);

    // Question 1.6
    let choices_1_6 = ["Tiada pendidkan formal", "Sekolah rendah", "Sekolah menengah / tinggi", "Sijil vokasional / teknikal", "Universiti"];
    pushMultipleChoice("1.6", PART1[6], choices_1_6, [], SKIP_NOT_ALLOWED, HINTS_PART1[6]);

    // Question 1.7
    let choices_1_7 = ["Bujang", "Berkahwin", "Bercerai", "Kematian pasangan", "Hubungan lain"];
    pushMultipleChoiceOthers("1.7", PART1[7], choices_1_7, [], SKIP_NOT_ALLOWED, HINTS_PART1[7]);

    // Question 1.8
    pushNumeric("1.8", PART1[8], 1, 999, true, "insert question 1.10 id here", HINTS_PART1[8]);

    // Question 1.9
    pushNumeric("1.9", PART1[9], 0, 999, false, SKIP_NOT_ALLOWED, HINTS_PART1[9]);

    // Question 1.10
    pushNumeric("1.10", PART1[10], 0, 999, false, SKIP_NOT_ALLOWED, HINTS_PART1[10]);

    // Question 1.11
    pushNumeric("1.11", PART1[11], 0, 999, false, SKIP_NOT_ALLOWED, HINTS_PART1[11]);

    // Question 1.13
    pushLongQuestion("1.13", PART1[13]).then((q13docRef) => {
        // [START]                  Question 1.12                   [START]
        // Inserted after Question 1.13

        pushLongQuestion("1.12", PART1[12]).then((q12docRef) => {
            // Record the id of the question itself
            longQuestionIds.push(q12docRef.id);

            // Log it in the console
            let questionNumber = "1.12";
            recordLongQuestionPush(questionNumber, q12docRef);

            // Start preparing for the pushes of its sub-questions
            initLongQuestionParams();

            // Question 1.12a
            let choices_1_12 = ["Ya", "Tidak"];
            let skip_choices_1_12 = ["Ya"];
            appendMultipleChoice(questionNumber, q12docRef.id, SUB_QUESTIONS_1_12[1], choices_1_12, skip_choices_1_12, q13docRef.id, SUB_QUESTIONS_HINTS_1_12[1]);

            // Question 1.12b
            appendMultipleChoice(questionNumber, q12docRef.id, SUB_QUESTIONS_1_12[2], choices_1_12, skip_choices_1_12, q13docRef.id, SUB_QUESTIONS_HINTS_1_12[2]);

            // Question 1.12c
            appendMultipleChoice(questionNumber, q12docRef.id, SUB_QUESTIONS_1_12[3], choices_1_12, skip_choices_1_12, q13docRef.id, SUB_QUESTIONS_HINTS_1_12[3]);

            // Question 1.12d
            appendMultipleChoice(questionNumber, q12docRef.id, SUB_QUESTIONS_1_12[4], choices_1_12, skip_choices_1_12, q13docRef.id, SUB_QUESTIONS_HINTS_1_12[4]);
        });

        // [END]                       Question 1.12                    [END]

        // Record the id of the question itself
        longQuestionIds.push(q13docRef.id);

        // Log it in the console
        let questionNumber = "1.13";
        recordLongQuestionPush(questionNumber, q13docRef)

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Question 1.13a
        let choices_1_13 = ["Ya", "Tidak"];
        appendMultipleChoice(questionNumber, q13docRef.id, SUB_QUESTIONS_1_13[1],
            choices_1_13, [], SKIP_NOT_ALLOWED,
            SUB_QUESTIONS_HINTS_1_13[1]);

        // Question 1.13b
        appendMultipleChoice(questionNumber, q13docRef.id, SUB_QUESTIONS_1_13[2],
            choices_1_13, [], SKIP_NOT_ALLOWED,
            SUB_QUESTIONS_HINTS_1_13[2]);

        // Question 1.13c
        appendMultipleChoice(questionNumber, q13docRef.id, SUB_QUESTIONS_1_13[3],
            choices_1_13, [], SKIP_NOT_ALLOWED,
            SUB_QUESTIONS_HINTS_1_13[3]);

        // Question 1.13d
        appendMultipleChoice(questionNumber, q13docRef.id, SUB_QUESTIONS_1_13[4],
            choices_1_13, [], SKIP_NOT_ALLOWED,
            SUB_QUESTIONS_HINTS_1_13[4]);
    });

    // Question 1.14
    pushLongQuestion("1.14", PART1[14]).then((docRef) => {
        // Record the id of the question itself
        longQuestionIds.push(docRef.id);

        // Log it in the console
        let questionNumber = "1.14";
        recordLongQuestionPush(questionNumber, docRef)

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Question 1.16a
        appendNumeric(questionNumber, docRef.id, SUB_QUESTIONS_1_14[1],
            1, 5, false, SUB_QUESTIONS_HINTS_1_14[1]);

        // Question 1.16b
        appendNumeric(questionNumber, docRef.id, SUB_QUESTIONS_1_14[2],
            1, 5, false, SUB_QUESTIONS_HINTS_1_14[2]);

        // Question 1.16c
        appendNumeric(questionNumber, docRef.id, SUB_QUESTIONS_1_14[3],
            1, 5, false, SUB_QUESTIONS_HINTS_1_14[3]);
    });
}

function pushPart2Questions() {
    // Set part index to 2 and reset
    // the question counter
    setPartNumber(2);

    // Question 2.1
    let choices_2_1 = ["Bekerja", "Bersara", "Separa pesara", "Tidak berkerja", "Tidak bekerja tetapi melakukan kerja sukarela", "Tidak bekerja tetapi mencari pekerjaan", "Lain-Lain"];
    let skip_choices_2_1 = ["Bersara", "Tidak berkerja", "Tidak bekerja tetapi melakukan kerja sukarela", "Tidak bekerja tetapi mencari pekerjaan"];
    pushMultipleChoiceOthers("2.1", PART2[1], choices_2_1, skip_choices_2_1, "insert question 2.3 id here", HINTS_PART2[1]);

    // Question 2.2
    pushShortText("2.2", PART2[2], HINTS_PART2[2]);

    // Question 2.3
    pushNumeric("2.3", PART2[3], 0, 5, false, SKIP_NOT_ALLOWED, HINTS_PART2[3]);

    // Question 2.4
    let choices_2_4 = ["Ya", "Tidak", "Tidak berkenaan"];
    pushMultipleChoice("2.4", PART2[4], choices_2_4, [],
        SKIP_NOT_ALLOWED, HINTS_PART2[4]);

    // Question 2.5
    let choices_2_5 = ["Ya", "Tidak", "Tidak berkenaan"];
    pushMultipleChoice("2.5", PART2[5], choices_2_5, [],
        SKIP_NOT_ALLOWED, HINTS_PART2[5]);

    // TODO 2.6 and 2.7 - Are these numeric questions or multiple-choice questions?

    // Question 2.6
    let choices_2_6 = ["Tidak berkenaan", "Tidak yakin sama sekali", "Agak tidak yakin", "Cukup yakin", "Agak yakin", "Sangat yakin"];
    pushNumeric("2.6", PART2[6], 0, 5, false, SKIP_NOT_ALLOWED, HINTS_PART2[6]);

    // Question 2.7
    let choices_2_7 = ["Tidak berkenaan", "Tidak yakin sama sekali", "Agak tidak yakin", "Cukup yakin", "Agak yakin", "Sangat yakin"];
    pushNumeric("2.7", PART2[7], 0, 5, false, SKIP_NOT_ALLOWED, HINTS_PART2[7]);
}

function pushPart3Questions() {
    // Set part index to 3 and reset
    // the question counter
    setPartNumber(3);

    // Question 3.1
    let choices_3_1 = [
        "Pelan data mudah alih prabayar",
        "Pelan data mudah alih pascabayar",
        "Pelan jalur lebar WiFi rumah",
        "Hotspot WiFi awam",
        "Saya tidak tahu cara mengakses Internet"
    ];
    pushMultipleChoice("3.1", PART3[1], choices_3_1, [],
        SKIP_NOT_ALLOWED, HINTS_PART3[1]);

    // Question 3.2
    pushLongQuestion("3.2", PART3[2]).then((docRef) => {
        // Record the id of the question itself
        longQuestionIds.push(docRef.id);

        // Log it in the console
        let questionNumber = "3.2";
        recordLongQuestionPush(questionNumber, docRef);

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Questions 3.2 a to r (18 questions in total)
        for (let i = 1; i < SUB_QUESTIONS_3_2.length; i++) {
            appendNumeric(questionNumber, docRef.id, SUB_QUESTIONS_3_2[i],
                0, 5, false,
                SUB_QUESTIONS_HINTS_3_2[i]);
        }
    });
}

function pushPart4Questions() {
    // Set part index to 4 and reset
    // the question counter
    setPartNumber(4);

    // Question 4.1
    pushNumeric("4.1", PART4[1], 1, 7, false, SKIP_NOT_ALLOWED,
        HINTS_PART4[1]);

    // Question 4.2
    pushNumeric("4.2", PART4[2], 0, 168, false, SKIP_NOT_ALLOWED,
        HINTS_PART4[2]);

    // Question 4.3
    pushLongQuestion("4.3", PART4[3]).then((docRef) => {
        // Record the id of the question itself
        longQuestionIds.push(docRef.id);

        // Log it in the console
        let questionNumber = "4.3";
        recordLongQuestionPush(questionNumber, docRef);

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Questions 4.3 a to d (4 questions in total)
        for (let i = 1; i < 5; i++) {
            appendNumeric(questionNumber, docRef.id, SUB_QUESTIONS_4_3[i],
                1, 5, false,
                SUB_QUESTIONS_HINTS_4_3[i]);
        }
    });

    // Question 4.4
    pushLongText("4.4", PART4[4], HINTS_PART4[4]);

    // Question 4.5
    pushLongQuestion("4.5", PART4[5]).then((docRef) => {
        // Record the id of the question itself
        longQuestionIds.push(docRef.id);

        // Log it in the console
        let questionNumber = "4.5";
        recordLongQuestionPush(questionNumber, docRef);

        // Start preparing for the pushes of its sub-questions
        initLongQuestionParams();

        // Questions 4.5 a to m (13 questions in total)
        for (let i = 1; i < 14; i++) {
            appendNumeric(questionNumber, docRef.id, SUB_QUESTIONS_4_5[i],
                1, 5, false,
                SUB_QUESTIONS_HINTS_4_5[i]);
        }
    });
}

function pushPart5Questions() {
    // Set part index to 5 and reset
    // the question counter
    setPartNumber(5);

    // Question 5.1
    pushLongText("5.1", PART5[1], HINTS_PART5[1]);

    // Question 5.2
    pushLongText("5.2", PART5[2], HINTS_PART5[2]);

    // Question 5.3
    pushLongText("5.3", PART5[3], HINTS_PART5[3]);

    // Question 5.4
    pushLongText("5.4", PART5[4], HINTS_PART5[4]);
}

function pushNumeric(questionNumber, questionText, lowerRange, upperRange, skipIfInvalid, skipTarget, hint) {
    // Leaving this here as a reference to numeric
    // question objects.
    let reference = {
        question_number: "1.1",
        category: "Part I: About yourself",
        type: "numeric",
        question: "What is your age in years?",
        restrictions: {
            lowerRange: 50,
            upperRange: 100,
            skipIfInvalid: true,
            skipTarget: "end_survey"
        },
        hint: "Enter a Number"
    };

    let questionObject = {
        question_number: questionNumber,
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_NUMERIC,
        question: questionText,
        restrictions: {
            lowerRange: lowerRange,
            upperRange: upperRange,
            skipIfInvalid: skipIfInvalid,
            skipTarget: skipTarget
        },
        hint: hint
    };

    // Increment the question number
    questionNumber++;

    // Record the IDs
    pushQuestionObject(questionObject)
        .then((docRef) => recordQuestionPush(questionObject, docRef));
}

function pushMultipleChoice(questionNumber, questionText, choices, skipChoices, skipTarget, hint) {
    // Leaving these here as references to multiple choice
    // question objects.
    let reference = {
        question_number: "1.2",
        category: "Part I: About yourself",
        type: "multiple-choice",
        question: "What is your gender?",
        restrictions: {
            choices: ["Male", "Female"],
            skipChoice: ["Male"],
            skipTarget: "end_survey"
        },
        hint: "placeholder"
    };

    let reference2 = {
        question_number: "1.3",
        category: "Part I: About yourself",
        type: "multiple-choice",
        question: "What is your ethnic group?",
        restrictions: {
            choices: ["Malay", "Chinese", "Indian", "Thai", "Others"],
            skipChoices: [],
            skipTarget: "skip_not_allowed"
        },
        hint: "placeholder"
    };

    let reference3 = {
        question_number: "1.14a",
        category: "Part I: About yourself",
        type: "multiple-choice",
        question: "Are you currently living with someone at home?",
        restrictions: {
            choices: ["Yes", "No"],
            skipChoices: "Yes",
            skipTarget: "insert 1.15 question id here"
        },
        hint: "placeholder"
    };

    let questionObject = {
        question_number: questionNumber,
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_MULTIPLE_CHOICE,
        question: questionText,
        restrictions: {
            choices: choices,
            skipChoices: skipChoices,
            skipTarget: skipTarget
        },
        hint: hint
    };

    // Increment the question number
    questionNumber++;

    // Record the IDs
    pushQuestionObject(questionObject)
        .then((docRef) => recordQuestionPush(questionObject, docRef));
}


function pushMultipleChoiceOthers(questionNumber, questionText, choices,
                                  skipChoices, skipTarget, hint) {
    // Leaving this here as a reference to multiple choice
    // question objects with an "Others" free text input
    let reference = {
        question_number: "2.1",
        category: "Part II: About your employment",
        type: "multiple-choice-others",
        question: "What is your current employment status?",
        restrictions: {
            choices: ["Working", "Retired", "Semi-retired", "Not working",
                "Not working but doing voluntary work",
                "Not working but looking for a job"],
            skipChoices: ["Retired", "Not working",
                "Not working but doing voluntary work",
                "Not working but looking for a job"],
            skipTarget: "insert 2.1 question id here"
        },
        hint: "placeholder"
    };

    let questionObject = {
        question_number: questionNumber,
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_MULTIPLE_CHOICE_OTHERS,
        question: questionText,
        restrictions: {
            choices: choices,
            skipChoices: skipChoices,
            skipTarget: skipTarget
        },
        hint: hint
    };

    // Increment the question number
    questionNumber++;

    // Record the IDs
    pushQuestionObject(questionObject)
        .then((docRef) => recordQuestionPush(questionObject, docRef));
}

function pushShortText(questionNumber, questionText, hint) {
    // Leaving this here as a reference to short text
    // question objects.
    let reference = {
        question_number: "2.2",
        category: "Part II: About your employment",
        type: "short-text",
        question: "What is your current job/ occupation/ profession?",
        restrictions: {},
        hint: "placeholder"
    };

    let questionObject = {
        question_number: questionNumber,
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_SHORT_TEXT,
        question: questionText,
        restrictions: {},
        hint: hint
    };

    // Increment the question number
    questionNumber++;

    // Record the IDs
    pushQuestionObject(questionObject)
        .then((docRef) => recordQuestionPush(questionObject, docRef));
}

function pushLongText(questionNumber, questionText, hint) {
    // Leaving this here as a reference to long text
    // question objects.
    let reference = {
        question_number: "5.1",
        category: "Part V: About your learning engagement",
        type: "long-text",
        question: "Why are you interested in learning using a mobile phone?",
        restrictions: {},
        hint: "placeholder"
    };

    let questionObject = {
        question_number: questionNumber,
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_LONG_TEXT,
        question: questionText,
        restrictions: {},
        hint: hint
    };

    // Increment the question number
    questionNumber++;

    // Record the IDs
    pushQuestionObject(questionObject)
        .then((docRef) => recordQuestionPush(questionObject, docRef));
}

function pushLongQuestion(questionNumber, questionText) {
    // Leaving this here as a reference to long questions
    // (questions with sub-questions)
    let reference = {
        question_number: "4.3",
        category: "Part IV: About your learning interest",
        type: "long-question",
        question: "How interested are you to learn the following skills" +
            "using a mobile phone ? (Rate from 1 to 7)" +
            "[1] extremely not interested, [2] very not interested, " +
            "[3] not interested," +
            "[4] moderately interested, [5] highly interested, " +
            "[6] very interested," +
            "[7] extremely interested",
        restrictions: {},
        hint: "placeholder",
        arrangement: []
    };

    let questionObject = {
        question_number: questionNumber,
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_LONG_QUESTION,
        question: questionText,
        restrictions: {},
        hint: {},
        arrangement: []
    };

    // Increment the question number
    questionNumber++;

    return pushQuestionObject(questionObject);
}

function appendNumeric(questionNumber, longQuestionId, questionText,
                       lowerRange, upperRange, skipIfInvalid, hint) {
    // Leaving this here as a reference to numeric
    // question objects.
    let reference = {
        question_number: "3.2b",
        category: "Part III: About your mobile phone usage",
        type: "numeric-sub-question",
        question: "SMS, text messaging (such as Whatsapp, WeChat, etc.)",
        restrictions: {
            lowerRange: 1,
            upperRange: 5,
            skipIfInvalid: false
        },
        hint: "placeholder",
        longQuestionId: longQuestionId
    };

    let questionObject = {
        question_number: getLongQuestionNumber(questionNumber),
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_NUMERIC_SUB_QUESTION,
        question: questionText,
        restrictions: {
            lowerRange: lowerRange,
            upperRange: upperRange,
            skipIfInvalid: skipIfInvalid
        },
        hint: hint,
        longQuestionId: longQuestionId
    };

    // Increment the alphabetIndex (the alphabetic numericals of sub-questions)
    alphabetIndex++;

    pushQuestionObject(questionObject)
        .then((docRef) => {
            recordSubQuestionPush(longQuestionId, questionObject, docRef)
        });
}

function appendMultipleChoice(questionNumber, longQuestionId,
                              questionText, choices, skipChoices, skipTarget,
                              hint) {
    // Leaving this here as a reference to multiple choice
    // question objects.
    let reference = {
        question_number: "1.2",
        category: "Part I: About yourself",
        type: "multiple-choice-sub-question",
        question: "What is your gender?",
        restrictions: {
            choices: ["Male", "Female"],
            skipChoice: ["Male"],
            skipTarget: "end_survey"
        },
        hint: "placeholder",
        longQuestionId: longQuestionId
    };

    let questionObject = {
        question_number: getLongQuestionNumber(questionNumber),
        category: PART_TITLE[getPartNumber(questionNumber)],
        type: TYPE_MULTIPLE_CHOICE_SUB_QUESTION,
        question: questionText,
        restrictions: {
            choices: choices,
            skipChoices: skipChoices,
            skipTarget: skipTarget
        },
        hint: hint,
        longQuestionId: longQuestionId
    };

    // Increment the alphabetIndex (the alphabetic numericals of sub-questions)
    alphabetIndex++;

    pushQuestionObject(questionObject)
        .then((docRef) => {
            recordSubQuestionPush(longQuestionId, questionObject, docRef)
        });
}

function pushQuestionObject(questionObject) {
    return firebase.firestore().collection(QUESTIONS_BRANCHES[MS_INDEX]).add(questionObject);
}

let partNumber = 0;
let questionNumber = 0;
let alphabetIndex = 0;

// A list of question IDs of the current survey part
let questionIds = [];

// A sequence of IDs of long questions, will come in handy
// when we need to append the IDs of sub-questions to them.
let longQuestionIds = [];

// A dictionary for storing IDs of sub-questions where the key
// is the question ID of its associated long question
let subQuestionIds = {};

function recordQuestionPush(questionObject, docRef) {
    // Save the question ID
    questionIds.push(docRef.id);

    if (questionObject.question_number === "2.3") {
        question_2_3_id = docRef.id;
    } else if (questionObject.question_number === "2.1") {
        question_2_1_id = docRef.id;
    } else if (questionObject.question_number === "1.8"){
        question_1_8_id = docRef.id;
    } else if (questionObject.question_number === "1.10"){
        question_1_10_id = docRef.id;
    }

    // Print some logs, maybe even display the questions via HTML
    console.log(
        `Question ${questionObject.question_number} pushed with ID ${docRef.id}`
    );
}

function recordLongQuestionPush(questionNumber, docRef) {
    // Save the question ID
    questionIds.push(docRef.id);

    // Print some logs, maybe even display the questions via HTML
    console.log(
        `Question ${questionNumber} pushed with ID ${docRef.id}`
    );
}

function setPartNumber(number) {
    partNumber = number;
    questionNumber = 1;
}

function recordSubQuestionPush(longQuestionId, questionObject, docRef) {
    // Record the ID of the current sub-question
    if (!(longQuestionId in subQuestionIds)) {
        // List does not exist in dictionary, make one
        // before pushing
        subQuestionIds[longQuestionId] = [];
    }
    subQuestionIds[longQuestionId].push(docRef.id);

    // Increment the alphabet index
    alphabetIndex++;

    // Print some logs, maybe even display the questions via HTML
    console.log(
        `Sub-question ${questionObject.question_number} pushed with ID ${docRef.id}`
    );
}

function initLongQuestionParams() {
    // Initialize the ASCII code to 97 for 'a'
    alphabetIndex = 97;
}

/**
 * Returns the alphabetic numeral of the current sub-question
 */
function getLongQuestionNumber(questionNumber) {
    let alphabet = String.fromCharCode(alphabetIndex);
    return `${questionNumber}${alphabet}`;
}

/**
 * Extracts the part number from a question number string.
 * @param questionNumber A question number string
 * (e.g. "1.14a" or "1.14")
 * @return {number} An integer representing the part number
 * (e.g. 1 if the question number is "1.14a")
 */
function getPartNumber(questionNumber) {
    return parseInt(questionNumber.split(".")[0]);
}

/**
 * "What the **** is up with this long function name?" - Probably you
 * <br>
 * "Hey, you only need to call it once, why fret?" - Probably me
 */
function updateLongQuestionsWithSubQuestionIds() {
    for (let longQuestionId of Object.getOwnPropertyNames(subQuestionIds)) {
        // For each long question, update its
        // arrangement attribute with a list
        // of IDs representing its sub-questions.

        let arrangement = subQuestionIds[longQuestionId];

        firebase.firestore().collection(QUESTIONS_BRANCHES[MS_INDEX]).doc(longQuestionId)
            .update({
                "arrangement": arrangement
            })
            .then(() => {
                let info = "Long question with id " +
                    longQuestionId +
                    "has been updated with subQuestionIds:";
                console.log(info);
                console.log(arrangement);
            });
    }
}

function uploadQuestions_ms() {
    pushPart1Questions();
    pushPart2Questions();
    pushPart3Questions();
    pushPart4Questions();
    pushPart5Questions();
}

/**
 * Call this manually AFTER uploadQuestions() has completely finished to
 * <br>
 * 1. Output the question IDs for each part and
 * <br>
 * 2. To update the long question objects with IDs of their sub-questions.
 */
function housekeeping_ms() {
    updateLongQuestionsWithSubQuestionIds();

    let result = [];
    // Try to output the list of question Ids for each part
    // 14 questions for part 1
    // 7 questions for part 2
    // 2 questions for part 3
    // 5 questions for part 4
    // 4 questions for part 5

    // These are the indices where each survey part changes to the next one
    let startingIndex = 0;
    let indices = [14, 21, 23, 28, 32];

    // Before we start slicing, insert the last item (Q1.12)
    // to the correct spot (before Q1.13, or before index 11)
    // This is because Q1.12 is pushed last to firebase and we need to move it's ID from last to its corresponding place
    let lastItem = questionIds[questionIds.length - 1];
    questionIds.splice(11, 0, lastItem);

    for (let endingIndex of indices) {
        result.push(questionIds.slice(startingIndex, endingIndex));
        startingIndex = endingIndex;
    }

    // Print the parts and their question IDs onto the console (Copy and paste these IDs into constants.js)
    for (let i = 0; i < result.length; i++) {
        console.log(`Part ${i + 1} IDs:`);
        console.log(result[i]);
    }

    // Update question 2.1's skipTarget with 2.3's ID
    firebase.firestore().collection(QUESTIONS_BRANCHES[MS_INDEX]).doc(question_2_1_id)
        .update({
            "restrictions.skipTarget": question_2_3_id
        })
        .then(() => {
            let info = "Question 2.1 has been updated with Question 2.3 ID: " +
                question_2_3_id;
            console.log(info);
        });

    // Update question 1.8's skipTarget with 1.10's ID
    firebase.firestore().collection(QUESTIONS_BRANCHES[MS_INDEX]).doc(question_1_8_id)
        .update({
            "restrictions.skipTarget": question_1_10_id
        })
        .then(() => {
            let info = "Question 1.8 has been updated with Question 1.10 ID: " +
                question_1_10_id;
            console.log(info);
        });
}