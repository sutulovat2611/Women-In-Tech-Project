/*
* This file is dedicated to uploading the short chinese version of the explanatory statement onto the firestore
* */

function uploadExplanatoryStatement_zh_CN_short(){
    let contents = "<center><b>(调查参与者组)</b></center><br>" +
        "<center><b>MUHREC Project ID: 29459</b><br>" +
        "<b>项目邮箱: </b>womenintech@monash.edu</center><br>" +
        "<b>郑佩莉教授</b><br>" +
        "商学院<br>" +
        "电话: +603-55144971<br>" +
        "电子邮件: teh.pei.lee@monash.edu<br><br>" +
        "<b>刘洁莹博士</b><br>" +
        "商学院<br>" +
        "电话: +603-55145872<br>" +
        "电子邮件: ewilly.liew@monash.edu<br><br>" +
        "<b>研究包括什么？</b>我们想了解您对学习使用移动应用程序的需求和看法。邀请您在由马来西亚蒙纳士大学研究人员开发的移动应用程序中，" +
        "参与完成聊天机器人的调查，该调查大约需要 15 到 30 分钟。<br><br>" +
        "<b>谁可以参与此项调查？</b> 仅对 <b>50 岁及以上的女性开放。</b><br><br>" +
        "<b>退出：</b>在调查期间，您可以随时退出，或者稍后从您上次尝试离开的地方继续进行调查。<br>" +
        "<b>付款：</b>完成调查后，您将获得 <b>RM10 现金</b> 作为感谢。<br><br>" +
        "<b>保密性：</b>该项调查是匿名的。您递交的所有回复都将被匿名处理。在调查结束时，页面将跳转到另一个 Qualtrics 表单，并要求您提供两" +
        "个额外的信息。 (1) 您可以选择通过手机号码联系您，以便参与未来获得伦理审批的（相关）研究项目。 (2) 您可以选择通过提供 " +
        "(a) 网上银行的详细信息，或 (b) 电子钱包的详细信息，或 (c) 终止调查来决定您希望获得现金答谢的方式。附加信息将单独存储，" +
        "并且不会链接到与您在聊天机器人中的调查答复进行关联。现金报销后，所有支付数据将从Qualtrics平台永久删除。请通过参阅 " +
        "<a href='https://www.qualtrics.com/privacy-statement/' target='_blank'>Qualtrics 隐私声明</a>" +
        " 获取更多信息。<br><br>" +
        "<b>调查结果：</b>不会报告任何个人的结果。只有去除个人信息的汇总结果才会在同行评审期刊、书籍/书籍章节中发表，并在会议上呈现。" +
        "参与者可以联系主要研究者了解分析结果。<br><br>" +
        "<b>投诉：</b>关于项目实施的道德问题或投诉，请联系蒙纳士大学人类研究伦理委员会 muhrec@monash.edu " +
        "或马来西亚蒙纳士大学质量与治理的 Jocelyn Fam 女士电话：(+603) 5514 5664 或电子邮件：jocelyn.fam@monash.edu。<br><br>" +
        "请注意，继续调查即表示您同意参与本研究，并同意解释性声明中提供的信息。<br><br>" +
        "<a href='./explanatoryStatementLongPage.html'>链接到解释性声明完整版</a>"

    firebase.firestore().collection("ExplanatoryStatement").doc("ExplanatoryStatement_zh_CN_short").set({
        contents: contents
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}