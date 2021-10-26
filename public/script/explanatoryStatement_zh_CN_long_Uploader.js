/*
* This file is dedicated to uploading the long chinese version of the explanatory statement onto the firestore
* */

function uploadExplanatoryStatement_zh_CN_long(){
    let contents = "<center><b>(参与者调查组)</b></center><br>" +
        "<b>Project ID: 29459</b><br>" +
        "<b>项目名称：马来西亚和泰国年长女性通过Women-in-Tech女性技术应用程序实现职业工作的持续性：行动研究和设计科学的整合方案</b><br><br>" +
        "<center><b>项目邮箱: womenintech@monash.edu</b></center><br>" +
        "<b>郑佩莉教授</b><br>" +
        "商学院<br>" +
        "电话: +603-55144971<br>" +
        "电子邮件:teh.pei.lee@monash.edu<br><br>" +
        "<b>刘洁莹博士</b><br>" +
        "商学院<br>" +
        "电话: +603-55145872<br>" +
        "电子邮件:ewilly.liew@monash.edu<br><br>" +
        "邀请您参与这项研究。在决定是否参与本研究之前，请仔细阅读本解释性声明。如果您想了解更多关于该项目的其他信息，" +
        "我们欢迎您通过上方列出的电话号码或电子邮件地址与研究人员取得联系。<br><br>" +
        "<b>研究包括什么？</b><br><br>" +
        "在马来西亚和泰国，许多年长女性们在经济上没有保障以及不习惯使用科技。 新冠肺炎大流行加剧了对年长女性们的影响，" +
        "鉴于她们担心面临被感染的可能、失业和失去社会保障。随着行动管制令和工作场所的关闭，此项目特为不善于运用科技的年长女性们提供" +
        "合适的在线学习方案。本研究的宗旨在于调查马来西亚和泰国郊外地区年长女性对科技的当前认识、需求、了解、态度和实践。<br><br>" +
        "我们希望了解您对使用智能手机移动应用程序来学习生活或工作相关技能的需求和看法。您所提供的信息将从社会和文化层面上解读并用于提高我们" +
        "新移动应用程序的设计，即Women-in-tech女性技术应用程序，以帮助郊区的年长女性适应科技运用和在线学习。Women-in-tech " +
        "移动应用程序提供了人工智能的推荐服务，针对年长女性选择适合的在线学习资源。<br><br>" +
        "邀请您在由马来西亚蒙纳士研究人员开发的移动应用程序中，参与完成聊天机器人的调查。聊天机器人调查将通过您的智能手机的浏览器进行，" +
        "大约需要 15 到 30 分钟。在聊天机器人调查结束时，您的页面将跳转到到另一个 Qualtrics 表单，您将被要求表明是否同意在接下来的六 " +
        "(6) 个月内选择参加更深入的后续采访。<br><br>" +
        "<b>付款/补偿</b><br><br>" +
        "完成聊天机器人调查后，您将通过在线交易获得RM 10 的现金奖励。在聊天机器人调查结束时，如果您希望通过 (a) 在线银行转账或 (b) " +
        "在线电子钱包转账接收奖励，您的页面将跳转到另一个 Qualtrics 表格以表明您的选择。确切来说，蒙纳士财务团队将要求您提供银行详细信息，" +
        "例如收款人姓名、收款人电话号码、收款人身份证号码、银行帐号、银行名称和电子邮件地址，以便进行在线交易和审计。尽管不能够匿名，" +
        "但这些个人信息仅用于在线交易以示感谢，而不被用于研究的任何其他部分。附加信息将单独存储，不会与您的访谈回答相关联。现金报销后，" +
        "所有支付数据将从Qualtrics平台永久删除。请通过参阅 " +
        "<a href='https://www.qualtrics.com/privacy-statement/' target='_blank'>Qualtrics 隐私声明</a>" +
        " 获取更多信息。<br><br>" +
        "<b>研究程序</b><br><br>" +
        "聊天机器人调查要求您使用智能手机在网络浏览器上进行问卷调查。因此，您的手机号码将作为启动聊天机器人的唯一指标。" +
        "一旦您提交了问卷调查的回复，在聊天机器人调查结束后，我们将取消识别您手机号与调查回复之间的连接，并为您分配一个匿名研究代码取而代之。" +
        "唯有匿名的调查回复会被分析。您可以选择四种不同的语言回答聊天机器人的调查，即英语、马来语、华语和泰语。<br><br>" +
        "<b>您为什么被邀请参加这项研究？</b><br><br>" +
        "您参与本研究是自愿的。邀请 50 岁及以上的女性参与这项研究。我们对您关于使用科技进行学习以及通过基于人工智能的推荐服务的移动" +
        "应用程序进行在线学习的看法感兴趣。<br><br>" +
        "<b>资金来源</b><br><br>" +
        "这项研究得到了 MUM-ASEAN 可持续发展研究资助计划 2021 – 2023 的支持。<br><br>" +
        "<b>同意参与项目并退出研究</b><br><br>" +
        "参与本研究是自愿的，您没有义务同意参与。继续调查即表示您同意参与本研究，并同意解释声明中提供的信息。在聊天机器人调查期间，" +
        "您可以随时退出。我们可以在聊天机器人调查结束前撤回您提交的回复。但是，因聊天机器人调查结束时，" +
        "您提交的回复将从您的手机号码中取消识别关联。届时，一旦您提交的答案输入到数据库中，你的数据便已进行了去标识化和匿名化处理。" +
        "因此我们再也无法追踪您的调查回复，也无法从研究中撤回您的数据。<br><br>" +
        "<b>参与者可能的利益和风险</b><br><br>" +
        "该研究的结果将有助于我们更好地理解一种基于社会技术设计和人工智能 (AI) 能力开发的适合老年人的技术解决方案，" +
        "以促进发展中国家老年妇女的未来。这将有助于研究人员和政府机构审议新技术解决方案，以在竞争激烈的世界中改善老年妇女的社会经济福利。" +
        "对于报告，将使用匿名研究代码进行分析，以确保共享的信息是私密的和机密的。<br><br>" +
        "短期或长期没有可预见的潜在风险，除了在调查期间花费的时间，使用参与者的手机通过低技术聊天机器人回答调查问题。<br><br>" +
        "<b>保密</b><br><br>" +
        "这是一个研究项目，涉及来自马来西亚蒙纳士大学和泰国法政大学的研究人员。您提供的所有数据都将被匿名化。因此，在完成聊天机器人调查后，" +
        "您将获得一个匿名研究代码 ID，您的回答将保密。您的回答不会被说明身份，也不会报告任何个人的结果。只有马来西亚蒙纳士大学的研究人员才" +
        "能访问完整的数据。此外，结果将发表在同行评审的期刊、书籍/书籍章节、学生论文和会议上。在调查结束时，您可以选择是否接受已获得审批的未" +
        "来相关研究项目的联系。如果您选择接受联系（这是可选的），页面将跳转到到另一个 Qualtrics 调查，您可以在其中提供您的姓名和手机号码" +
        "——所提供的此可选信息不会与您的调查回复相关联。<br><br>" +
        "<b>数据存储</b><br><br>" +
        "收集到的数据将按照蒙纳士大学的规定进行存储和保存。对于以纸质格式获得的所有数据副本，" +
        "这些副本将被转录为电子格式并销毁原始硬拷贝。因此，所有数据都将以密码保护的数字格式存储，只有参与本研究的研究人员才能访问数据。" +
        "如果不再需要或长达五 (5) 年，数字格式的数据将被永久删除。<br><br>" +
        "<b>将数据用于其他目的</b><br><br>" +
        "数据分析将基于已删除所有个人身份信息的数据进行。参与者可以联系研究人员以了解基于已删除所有个人身份信息的数据进行的分析的结果。" +
        "根据数据共享指南，其他研究人员可以使用去标识化数据。这些数据将保存在安全的公共存储库中，并且可能是某些期刊在出版之前的要求。" +
        "任何共享数据都不会包括您的识别详细信息。<br><br>" +
        "<b>结果</b><br><br>" +
        "如果您想了解研究结果，请联系郑佩莉教授，电话：+603-55144971 或电子邮件：teh.pei.lee@monash.edu<br><br>" +
        "<b>投诉</b><br><br>" +
        "如果您对项目的进行有任何疑虑或投诉，欢迎您联系以下官员<br><br>" +
        "<b>Jocelyn Fam女士<br>" +
        "人类研究伦理委员会, 蒙纳士大学<br>" +
        "Jalan Lagoon Selatan, 47500, Bandar Sunway, Selangor Darul Ehsan, Malaysia.<br>" +
        "电话: (+603) 5514 5664<br>" +
        "电子邮件: jocelyn.fam@monash.edu</b><br><br>" +
        "谢谢您。<br><br><br>" +
        "<b>郑佩莉教授</b><br>" +
        "商学院,<br>" +
        "蒙纳士大学<br>" +
        "电话: +603-55144971; 电子邮件: teh.pei.lee@monash.edu"

    firebase.firestore().collection("ExplanatoryStatement").doc("ExplanatoryStatement_zh_CN_long").set({
        contents: contents
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}