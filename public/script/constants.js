/**
 * This file is used to store constants that are used throughout
 * the application.
 *
 * @author Yong Peng (ychi0014@student.monash.edu)
 */

// Indicates the question type as numeric
const TYPE_NUMERIC = "numeric";

// Indicates a numeric sub-question
const TYPE_NUMERIC_SUB_QUESTION = "numeric";

// Indicates the question type as multiple choice
const TYPE_MULTIPLE_CHOICE = "multiple-choice";

// Indicates a multiple choice question with an
// "Others" free text input
const TYPE_MULTIPLE_CHOICE_OTHERS = "multiple-choice-others";

// Indicates a multiple choice sub-question with an
// "Others" free text input
const TYPE_MULTIPLE_CHOICE_SUB_QUESTION = "multiple-choice-sub-question";

// Indicates a question accepting short text inputs
const TYPE_SHORT_TEXT = "short-text";

// Indicates a question accepting long text inputs
const TYPE_LONG_TEXT = "long-text";

// Indicates a long question (a questions containing sub-questions)
const TYPE_LONG_QUESTION = "long-question";

// Represents a logical survey skip operation
// that ends the survey
const SKIP_END_SURVEY = "end_survey";

// Represents a skip logic that doesn't allow skips
const SKIP_NOT_ALLOWED = "skip_not_allowed";


// Contains title strings for the survey parts
const PART_TITLE = [
    "",
    // The above title is a placeholder to allow 1-indexing

    "Part 1: About yourself",
    "Part 2: About your employment",
    "Part 3: About your mobile phone usage",
    "Part 4: About your learning interest",
    "Part 4: About your learning engagement"
]

// The paths for storing/retrieving questions from
// the Firebase Firestore Database
const QUESTIONS_BRANCHES = [
    "chatbot/survey_questions/questions_en/",
    "chatbot/survey_questions/questions_zh_CN/",
    "chatbot/survey_questions/questions_ms/",
    "chatbot/survey_questions/questions_th/"
]; // english, chinese, malay, thai

//Response branch
const RESPONSE_BRANCH = "chatbot/survey_responses";



// Index for access of each language branches
const EN_INDEX = 0;
const ZH_CN_INDEX = 1;
const MS_INDEX = 2;
const TH_INDEX = 3;

// The time it takes for the chat bot to output
// a chat bubble (in milliseconds)
const MESSAGE_OUTPUT_DELAY = 2000;

// The maximum number of characters for short
// text question responses
const SHORT_TEXT_LENGTH = 50;

// list of Questions IDs for each language translation
const QUESTION_IDS_EN = [
    // Part 1
    'xNbHpzuOiq9JtrH9MQWW',
    '3mby5I63jyQhCgyLQGdb',
    '3fPP86mMH0zMD0hLMHDQ',
    'Xp0ljiv9FOBVvpj4QF68',
    'zSXT73zpgQw09nJyueAQ',
    '3TenbSQR56yvJbjRO71i',
    'ZkdK3RRnb1cfPKliz1RO',
    '3bSljCrfuQlgCMHLCXA0',
    'Qk3PwN4FLwKnNb2ivVF9',
    'X9ENUSjr5j6xp7OVdrCv',
    'ZJ0US6Rpal9462GuvTp0',
    '7TlIpoJ3ruB3H2br7LdB',
    'fvKP4pr5ozuHMzWK6odL',
    'MoAeCjAXr0MQxDx7gX9R',

    // Part 2
    'hy2T0J3XgLoXtK50RgTS',
    'OGjgyFN1JQ4Wgwjjz4rl',
    'gHla3Qmq5ib968GokRSq',
    'dIXiu4PlHl2tqXJJ6eEu',
    '1iRmA9X5YAXhYdckjFlv',
    '5Q0sRn9HJ0tbxjDdrjTH',
    '8sZSjGqtrkIHXzTI544n',

    // Part 3
    'N6y7oDz00MovhV2kwBWr',
    'CyMaHOD5GHzkwe3eGkUW',

    // Part 4
    'TesH7zFZqxzBSpKovaY8',
    'ibjh0729HWpPZtbuTDIv',
    'NbNvSZeYZjxHSezpTqkf',
    'CyNgQPsfaQ8OK92fi03L',
    'MYtkpqNIE4VRWdFtiAhL',

    // Part 5
    'vCVBMcUohJuVInR6fCzp',
    '4u9BS9AVNe0pjGMuPw7q',
    'E5TcRtGZ8FYwjlLVMGuh',
    'S82wXg2bCwvuEpEuzAV7'
];

const QUESTION_IDS_ZH_CN = [
    // Part 1
    'tYvfVKDwwC5TSFa16k5l',
    'wZ3AFRx4ZolVWZ2d1OcM',
    'AHG0bUjhdcyITuzlBXZo',
    'x4jWNkPO6WbYjqjaw5d0',
    'zXeKf0JckZQ6I3iZxOsq',
    'zKdkHSGHd4Vb50XodZgJ',
    '6a0pSY2PiC6rwOkksDMS',
    'TWHHvxeGElOO3mnUWDyv',
    'gdRRNaicHUKmoNiIj8Dj',
    'fqnYOX1QaImLLwfFK8xb',
    'IXZLTDzbjS2J9Au8xkRd',
    'gMA2hqFcXZqJHgxXCssd',
    'o2aX0jLdT9lVitD1EhYc',
    'XGpKvzcQZNVzM06vpNXD',

    // Part 2
    'OG2NXtG3UMRZE5wuHUzs',
    'de07DdFXlVBJj4lgnpGs',
    'EoxGLVsXPEWaojgC4AdR',
    'LRmZhNhIRPGlQsuM41zR',
    'u0w7NbSAg3ja60i16dPj',
    'CTBLrD2HNOrP6PZY4PVh',
    'LmO7EPReiQL1u8o9SNNn',

    // Part 3
    'hJuDTXq7ChQdPn3yr70y',
    'DD2n1YS0WFckpfiUbQrI',

    // Part 4
    'rGTw88jnK8ah2op2b1BV',
    'NyRlUuhkATl0gD2Ei3GN',
    'm5eNDljy3g6ErnE7bEIu',
    'DC6krUccz1MzIxUBj5Ze',
    'ZmQoHCJ5EhKJg56mtrCC',

    // Part 5
    'FLuojTxj86floqSxPr2t',
    'Qb7tTutaGGPqwFgHitaj',
    'gTS6wseAUgX4khguk2Cn',
    'k0LzppjIAEWfdKuyP5kY'
];

const QUESTION_IDS_MS = [
    // Part 1
    '7qW2s4kMLsoH49q7pf6q',
    'efIrLOvtuD45pVphsaQR',
    '5sY7o6j9c0afLvMeVv2i',
    '6oTgF7aNfnaYBcpDUwZl',
    'Qkm7uFhzXI4z6QO9TI9w',
    'SAgUaAVhXj3rNUC8ItZC',
    'APtlA7CQBcUv33HQtz7i',
    'CUfFxs8DHzfMf4m8Uii8',
    '3GEfJ5iAitv9DzxMidLT',
    '84L3btG9RFqb7J4cHArh',
    'BbugNwPdNfVSSxvoBKtR',
    '4b9Y8QzNnM2WQwqfMnD2',
    'sCJOyC8IJPhUqV2a1CNg',
    'DoKon2wEEOFvDay6cIBE',

    // Part 2
    'i8eCqvhP7SIkbTu61kAD',
    'mKNWK5VPegu5uqH8hAEL',
    'qWpFnM7xYfvSx0qVTyV9',
    'Z09Nwy3zjr4IwEs7MdOE',
    'UAJcpkvmDqkepJ8mR1cJ',
    'oj5HLo7kvR1YgmepnIbn',
    'YkxOM6aKtaqQwj8Hfscb',

    // Part 3
    'Ok1PgTXZmPRkuVtpYHXA',
    'dAhK06xif0YlfvjAmOOX',

    // Part 4
    'fl4NOgvvp8XOxQKZIR3z',
    'GUDT1XpPdXYaV8gwNscW',
    'FNCZ9GBEwqH4zPGxAICW',
    'XHCYARvyVYvcEGcckXBA',
    'kHiTBbV4C93umcrM0lcw',

    // Part 5
    'P1pu56aRMyn1Pysln9Jj',
    'POKBzejlzXC57LQl36zS',
    'KKShMP5huIXTn5gQHYwU',
    'GVBVFw0hR8zUMoc2AQe8'
];

const QUESTION_IDS_TH = [
    // Part 1
    'TcBaR4sTcOcGXPXY5b6L',
    'cikkMITeFfXTLAvP0669',
    'd5TlN1r4b1VgusoeWpiw',
    'jDTtSaROweodWdSYYkjs',
    '1fk878cWt31OzyuRNhLN',
    'DVSnri8Rp2UatG8JzvHr',
    '0GZ6FVx8JxTw8PfLL2Cm',
    'OAF1mdsQOeF2mPtSHX7X',
    'TcYfMWuWRxowyt3d6AcK',
    'Sh133s3YmDvxuNJNRw89',
    'uLtwBcwuRh2KdzkyKNHw',
    'uZfHY9gjKZ3EVke2oVMx',
    '6MqxdxlgmfC1IAmI8FkD',
    'z3dUAKF8itdKPAVDUXkE',

    // Part 2
    'ZvVATOepzC3rWrupeQOt',
    'I8sg2rPYX1f9JtwbTD6U',
    'jW3cCqx2RPczBcmxXCx9',
    'WL0L0eYc00Ue3vStiJue',
    'feiRX3lcrxEmC8JbXiwO',
    'erPg2fCzLgpcLlx9MCC2',
    '7CskfZ2KOfhMYh9TCZ9w',

    // Part 3
    'TXRN8vYY0SRuAzsaklwK',
    'ZnsJ1dgbmfO3rseByRMh',

    // Part 4
    'oGENILnDhXjVbhr589ly',
    'Kw0t6EKVvOSmTpylTPnr',
    'IZwqrQfCnpJ86m2MBedq',
    'fhX2JsZUCH1WI6YTa1RM',
    'pdX7WC2iFaJFH439kujO',

    // Part 5
    'XiqgMIhdgLoQxMMVbPLr',
    'Rs2a57sMJq8wYQqw7DPe',
    'EhIfrhrtBenAeKewjKmU',
    '8p6yCvYRutU4NCbzTSE3'
];

// A list of arrays of IDs of question objects of each supported language that are stored in the Firestore Database
const QUESTION_IDS = [
    QUESTION_IDS_EN,
    QUESTION_IDS_ZH_CN,
    QUESTION_IDS_MS,
    QUESTION_IDS_TH
];

const OTHERS_OPTION_HINTS = [
    "Type in a Response",
    "输入回复",
    "Taipkan tindak balas",
    "พิมพ์ตอบกลับ"
]

// The value of questionIndex when answering the first question
const NO_QUESTIONS_DONE = 0;

// Tha value of questionIndex when the survey has been completed
const LAST_QUESTION_DONE = QUESTION_IDS[0].length;

// The users branch in the Firestore Database, currently stores
// user responses
const USERS_BRANCH = "users";