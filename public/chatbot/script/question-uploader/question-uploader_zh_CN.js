/**
 * This file is used to automatically upload the survey questions
 * to the Firestore Database.
 *
 * @author Yong Peng (ychi0014@student.monash.edu)
 */

const SUB_QUESTIONS_1_12 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "和其他人同居", // Qs 1.12.1
    "独居", // Qs 1.12.2
    "在老年护理机构和其他人同居", // Qs 1.12.3
    "在老年护理机构独居" // Qs 1.12.4
];

const SUB_QUESTIONS_HINTS_1_12 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "选择一个选项", // Select an Option (needs translation confirmation)
    "选择一个选项",
    "选择一个选项",
    "选择一个选项" // Select an Option (needs translation confirmation)
];

const SUB_QUESTIONS_1_13 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "依赖他人来满足<b>我的需要。</b>", // Qs 1.13.a
    "无法得到<b>医疗。</b>", // Qs 1.13.b
    "没钱买<b>生活用品</b>。", // Qs 1.13.c
    "无法支付<b>至少一张</b>账单。" // Qs l.13.d
];

const SUB_QUESTIONS_HINTS_1_13 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项"
];

const SUB_QUESTIONS_1_14 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "总的来说，我的生活很理想。", // Qs 1.14.a
    "我现在的生活状态很好。", // Qs 1.14.b
    "我对我的生活感到满意。" // Qs 1.14.c
];

// TODO Fill in tooltips
const SUB_QUESTIONS_HINTS_1_14 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项"
];

const PART1 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "您的<b>年龄</b>是几岁？", // Qs 1.1
    "您的<b>性别</b>是?", // Qs 1.2
    "您的<b>种族</b>是？", // Qs 1.3
    "您<b>现在</b>住在哪里？", // Qs 1.4
    "您每月的平均家庭<b>净收入</b>是多少？", // Qs 1.5
    "您完成的最高<b>教育程度</b>是？", // Qs 1.6
    "您的<b>婚姻状况</b>为？", // Qs 1.7
    "您<b>养育</b>了几名孩子？", // Qs 1.8
    "您每周与几个<b>孩子交谈或通信</b>？", // Qs 1.9

    // The question above this line is question 1.9

    "您与几个<b>亲戚</b>比较亲近？", // Qs 1.10
    "您有多少个<b>关系好的朋友</b>？", // Qs 1.11
    "您的生活状态是？", // Qs 1.12

    // The question above this line is a long question 1.12

    "在过去的 6 个月中，您是否经历过以下情况？", // Qs 13

    // The question above this line is a long question (1.13)

    "您对现在的生活<b>满意</b>吗？（等级从 1 到 5）"// Qs 1.14

    // The question above this line is a long question 1.14
];

const HINTS_PART1 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "请输入数字 (例如 1, 2, 3)",
    "选择一个选项", // Select an Option (needs translation confirmation)
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项", // Select an Option (needs translation confirmation)
    "请输入数字 (例如 1, 2, 3)",
    "请输入数字 (例如 1, 2, 3)",

    // The question above this line is question 1.10


    "请输入数字 (例如 1, 2, 3)",
    "选择一个选项",// Select an Option (needs translation confirmation)
    "选择一个选项",
    // The question above this line is a long question (1.14)

    "选择一个选项",
    // The question above this line is a long question (1.14)

    "选择一个选项"// Select an Option (needs translation confirmation)
    // The question above this line is a long question (1.14)
];

const PART2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "您<b>目前</b>的就业状况如何？", // Qs 2.1
    "您<b>目前</b>的工作/职业/专业是什么？", // Qs 2.2
    "您对目前的就业状况<b>满意</b>吗？ （等级从 1 到 5）", // Qs 2.3
    "由于COVID-19大流行您失去了<b>工作</b>？", // Qs 2.4
    "您是否因 COVID-19 大流行而失去了<b>收入</b>？", // Qs 2.5
    "您对在不久的将来找到<b>新工作</b>的信心如何？", // Qs 2.6
    "您对能够在不久的将来保住<b>目前的工作</b>有多大信心？" // Qs 2.7
];

const HINTS_PART2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "选择一个选项",
    "请输入答案",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项"
];

const SUB_QUESTIONS_3_2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "短信、短信（如 Whatsapp、微信等)", // Qs 3.2.a
    "浏览/浏览网站", // Qs 3.2.b
    "观看影片", // Qs 3.2.c
    "使用 Zoom、Facetime、Skype、Google Talk 等。", // Qs 3.2.d
    "使用 COVID-19 联系人追踪应用程序（例如 MySejahtera）", // Qs 3.2.e
    "网上购物或电子商务（如 Lazada、Shopee 等）", // Qs 3.2.f
    "使用手机银行/电子钱包（例如 GrabPay、BoostPay、FavePay、Touch N Go Pay 等）", // Qs 3.2.g
    // The question above this line is question 3.2g

    "在线订购食品或杂货", // Qs 3.2.h
    "使用社交网络（如 Facebook、Instagram、Twitter 等）", // Qs 3.2.i
    "拍照 ", // Qs 3.2.j
    "地图导航器（如 Google Map、Waze、Tom-Tom 等）", // Qs 3.2.k
    "在我的日历上管理我的约会", // Qs 3.2.l
    "阅读在线新闻或在线杂志", // Qs 3.2.m
    "记下我需要做的笔记（例如购物清单或任务)", // Qs 3.2.n
    "拍摄影片", // Qs 3.2.o
    // The question above this line is question 3.2o

    "听音乐", // Qs 3.2.p
    "玩游戏", // Qs 3.2.q
    "用于联系政府当局" // Qs 3.2.r
];

const SUB_QUESTIONS_HINTS_3_2 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    // The question above this line is question 3.2g

    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    // The question above this line is question 3.2p

    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
];

const PART3 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "您如何使用手机使用互联网？", // Qs 3.1
    // The question above this line is question 3.1

    "您的<b>手机使用状况</b>是？(等级从 1 到 5)" // Qs 3.2
    // The question above this line is a long question (3.2)
];

const HINTS_PART3 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "选择一个选项",
    // The question above this line is question 3.1

    ""
    // The question above this line is a long question (3.2)

];

const SUB_QUESTIONS_4_3 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "ICT/技术技能（例如如何使用手机或电脑软件）", // Qs 4.3.a
    "社交沟通技巧（例如如何改善人际关系或与他人互动）", // Qs 4.3.b
    "辅助技能（例如学习与工作无关的技能或爱好） ", // Qs 4.3.c
    "与工作相关的技能（例如如何提高工作/企业生产力）" // Qs 4.3.d
];

const SUB_QUESTIONS_HINTS_4_3 = [
    "",
    // The above question is a placeholder to allow 1-indexing
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项"
];

const SUB_QUESTIONS_4_5 = [
    "",
    // The above question is a placeholder to allow 1-indexing
    "我明白生命的意义。", // Qs 4.5.a
    "我了解日常生活活动的意义。", // Qs 4.5.b
    "我觉得生活很精彩。", // Qs 4.5.c
    "我对日常生活活动有信心。", // Qs 4.5.d
    "我心态很好。", // Qs 4.5.e
    "我对新的日常活动有信心。", // Qs 4.5.f
    "我有表达自我的能力", // Qs 4.5.g
    "我有能力选择更好的替代品。", // Qs 4.5.h
    "我有能力对特定问题做出决定。", // Qs 4.5.i
    "我有与他人合作的能力。", // Qs 4.5.j
    "我有能力与他人建立团队。", // Qs 4.5.k
    "我有建立朋友交往的能力。", // Qs 4.5.l
    "我有与他人一起解决问题的能力。" // Qs 4.5.m
];

const SUB_QUESTIONS_HINTS_4_5 = [
    "",
    // The above question is a placeholder to allow 1-indexing
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项",
    "选择一个选项"
];

const PART4 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "您尝试使用手机学习新的或有用的东西的<b>频率</b>如何？(等级从 1 到 7)\n" +
    "[1] 从不, [2] 一个月一次, [3] 一个月几次, [4] 每周一次, [5] 一周几次, [6] 一天一次, [7] 一天多次", // Qs 4.1

    "您<b>每周花多少小时</b>用手机学习新的或有用的东西？（请输入数字）", // Qs 4.2
    // The question above this line is question 4.2

    "您对<b>使用手机学习</b>以下技能的<b>兴趣</b>如何？(等级从 1 到 5)", // Qs 4.3
    // The question above this line is a long question (4.3)

    "您希望通过手机学习哪些<b>与工作相关的技能</b>？", // Qs 4.4
    // The question above this line is question 4.4

    "您在多大程度上同意或不同意以下陈述<b>对您的描述</b>？(等级从 1 到 5)" // Qs 4.5
    // The question above this line is question 4.5
];

const HINTS_PART4 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "请输入数字 (例如 1, 2, 3)",
    "请输入数字 (例如 1, 2, 3)",
    // The question above this line is question 4.2

    "选择一个选项",
    // The question above this line is a long question (4.3)

    "",
    "选择一个选项"
]

const PART5 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "您为什么对使用手机学习感兴趣？", // Qs 5.1
    "您希望拥有哪些使用手机学习的资源？", // Qs 5.2
    "到目前为止，使用手机学习最令人沮丧的事情是什么？", // Qs 5.3
    "告诉我们您在工作中遇到的问题或挑战。" // Qs 5.4
]

const HINTS_PART5 = [
    "",
    // The above question is a placeholder to allow 1-indexing

    "输入回复",
    "输入回复",
    "输入回复",
    "输入回复"
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
    let choices_1_2 = ["男性", "女性"]
    let skip_choices_1_2 = ["男性"];
    pushMultipleChoice("1.2", PART1[2], choices_1_2, skip_choices_1_2, SKIP_END_SURVEY, HINTS_PART1[2]);

    // Question 1.3
    let choices_1_3 = ["巫裔", "华裔", "印裔", "泰裔", "其他"];
    //pushMultipleChoice("1.3", PART1[3], choices_1_3, [], SKIP_NOT_ALLOWED, HINTS_PART1[3]);
    pushMultipleChoiceOthers("1.3", PART1[3], choices_1_3, [], SKIP_NOT_ALLOWED, HINTS_PART1[3]);

    // Question 1.4
    let choices_1_4 = ["市区", "郊外"];
    pushMultipleChoice("1.4", PART1[4], choices_1_4, [], SKIP_NOT_ALLOWED, HINTS_PART1[4]);

    // Question 1.5
    let choices_1_5 = ["没有收入", "低于 MYR2500", "MYR2501-3169", "MYR3170-3969", "MYR3970-4849", "MYR4850 或以上"];
    pushMultipleChoice("1.5", PART1[5], choices_1_5, [], SKIP_NOT_ALLOWED, HINTS_PART1[5]);

    // Question 1.6
    let choices_1_6 = ["没有受过正规教育", "小学", "中学/高中", "职业/技术认证", "大学"];
    pushMultipleChoice("1.6", PART1[6], choices_1_6, [], SKIP_NOT_ALLOWED, HINTS_PART1[6]);

    // Question 1.7
    let choices_1_7 = ["单身", "已婚", "离婚", "丧偶", "其他关系"];
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
            let choices_1_12 = ["是", "否"];
            let skip_choices_1_12 = ["是"];
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
        let choices_1_13 = ["是", "否"];
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
    let choices_2_1 = ["工作", "退休", "半退休", "不工作", "不工作但做义工", "不工作但在找工作", "其他"];
    let skip_choices_2_1 = ["退休", "不工作", "不工作但做义工", "不工作但在找工作"];
    pushMultipleChoiceOthers("2.1", PART2[1], choices_2_1, skip_choices_2_1, "insert question 2.3 id here", HINTS_PART2[1]);

    // Question 2.2
    pushShortText("2.2", PART2[2], HINTS_PART2[2]);

    // Question 2.3
    pushNumeric("2.3", PART2[3], 0, 5, false, SKIP_NOT_ALLOWED, HINTS_PART2[3]);

    // Question 2.4
    let choices_2_4 = ["是", "否", "不适用"];
    pushMultipleChoice("2.4", PART2[4], choices_2_4, [],
        SKIP_NOT_ALLOWED, HINTS_PART2[4]);

    // Question 2.5
    let choices_2_5 = ["是", "否", "不适用"];
    pushMultipleChoice("2.5", PART2[5], choices_2_5, [],
        SKIP_NOT_ALLOWED, HINTS_PART2[5]);

    // TODO 2.6 and 2.7 - Are these numeric questions or multiple-choice questions?

    // Question 2.6
    let choices_2_6 = ["不适用", "极度不自信", "有点不自信", "适度自信", "有点自信", "极度自信"];
    pushNumeric("2.6", PART2[6], 0, 5, false, SKIP_NOT_ALLOWED, HINTS_PART2[6]);

    // Question 2.7
    let choices_2_7 = ["不适用", "极度不自信", "有点不自信", "适度自信", "有点自信", "极度自信"];
    pushNumeric("2.7", PART2[7], 0, 5, false, SKIP_NOT_ALLOWED, HINTS_PART2[7]);
}

function pushPart3Questions() {
    // Set part index to 3 and reset
    // the question counter
    setPartNumber(3);

    // Question 3.1
    let choices_3_1 = [
        "预付费移动数据计划",
        "后付费移动数据计划",
        "家庭无线宽带计划",
        "公共无线热点",
        "我不清楚如何上网"
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

    // Increment the alphabetIndex (the alphabetic numerics of sub-questions)
    alphabetIndex++;

    pushQuestionObject(questionObject)
        .then((docRef) => {
            recordSubQuestionPush(longQuestionId, questionObject, docRef)
        });
}

function pushQuestionObject(questionObject) {
    return firebase.firestore().collection(QUESTIONS_BRANCHES[ZH_CN_INDEX]).add(questionObject);
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

        firebase.firestore().collection(QUESTIONS_BRANCHES[ZH_CN_INDEX]).doc(longQuestionId)
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

function uploadQuestions_zh_CN() {
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
function housekeeping_zh_CN() {
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
    firebase.firestore().collection(QUESTIONS_BRANCHES[ZH_CN_INDEX]).doc(question_2_1_id)
        .update({
            "restrictions.skipTarget": question_2_3_id
        })
        .then(() => {
            let info = "Question 2.1 has been updated with Question 2.3 ID: " +
                question_2_3_id;
            console.log(info);
        });

    // Update question 1.8's skipTarget with 1.10's ID
    firebase.firestore().collection(QUESTIONS_BRANCHES[ZH_CN_INDEX]).doc(question_1_8_id)
        .update({
            "restrictions.skipTarget": question_1_10_id
        })
        .then(() => {
            let info = "Question 1.8 has been updated with Question 1.10 ID: " +
                question_1_10_id;
            console.log(info);
        });
}