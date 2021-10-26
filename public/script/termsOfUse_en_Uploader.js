/*
* This file is dedicated to uploading the english version of the terms of use onto the firestore
* */

function uploadTermsOfUse_en(){
    let contents = "<h4>AGREEMENT TO TERMS</h4>" +
        "These Terms and Conditions of Use (\"Terms of Use\") constitute a legally binding agreement made " +
        "between you, whether in your personal capacity or on behalf of an entity (\"you\") and Women-in-tech " +
        "(\"Company\", \"we\", \"us\", or \"our\"), concerning your access to and use of the Women-in-tech webWomen-in-tech " +
        "as well as any other media form, media channel, mobile webWomen-in-tech or mobile application related, " +
        "linked, or otherwise connected thereto (collectively, the \"Women-in-tech\"). You agree that by accessing " +
        "the Women-in-tech, you have read, understood, and agreed to be bound by all of these Terms of Use. " +
        "IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING " +
        "WOMEN-IN-TECH AND YOU MUST DISCONTINUE USE IMMEDIATELY." +
        "<br><br>" +
        "Supplemental terms and conditions or documents that may be posted on the Women-in-tech platform from time " +
        "to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole " +
        "discretion, to make changes or modifications to these Terms of use at any time and for any reason. " +
        "We will alert you about any changes by updating the \"Last updated\" date of these Terms of Use, " +
        "and you waive any right to receive specific notice of each such change. It is your responsibility to " +
        "periodically review these Terms of Use to stay informed of updates. You will be subject to, and will be " +
        "deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your " +
        "continued use of the Women-in-tech after the date such revised Terms of use are Posted." +
        "<br><br>" +
        "The information provided on the Women-in-tech is not intended for distribution to or use by any person or " +
        "entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation" +
        " or which would subject us to any registration requirement within such jurisdiction or country. " +
        "Accordingly, those persons who choose to access the Women-in-tech from other locations do so on their own " +
        "initiative and are solely responsible for compliance with local laws, if and to the extent local laws are " +
        "applicable."+
        "<br><br>" +
        "The Women-in-tech is intended for users who are at least 18 years old. Persons below the age of 18 are not " +
        "permitted to use or register for the Women-in-tech." +
        "<h4>INTELLECTUAL PROPERTY RIGHTS</h4>" +
        "Unless otherwise indicated, the Women-in-tech is our proprietary property and all source code, databases, " +
        "functionality, software, webWomen-in-tech designs, audio, video, text, photographs, and graphics on the " +
        "Women-in-app (collectively, the \"Content\") and the trademarks, service marks, and logos contained therein " +
        "(the \"Marks\") are owned or controlled by us or licensed to us, and are protected by copyright and trademark" +
        " laws and various other intellectual property rights including international copyright laws and conventions" +
        ". The Content and the Marks are provided in these Terms of Use, no part of the Women-in-tech and no Content" +
        " or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, " +
        "encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial " +
        "purpose whatsoever, without our express prior written permission.<br><br>" +
        "Provided that you are eligible to use the Women-in-tech, you are granted a limited license to access and use " +
        "the Women-in-tech and to download or print a copy of any portion of the Content to which you have properly " +
        "gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you " +
        "in and to the Women-in-tech, the Content and the Marks." +
        "<h4>USER REPRESENTATIONS</h4>" +
        "By using the Women-in-tech, you represent and warrant that: (1) all registration information you submit will be" +
        " true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly " +
        "update such registration information as necessary; (3) you have the legal capacity and you agree to comply " +
        "with these Terms of Use; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not " +
        "access the Women-in-tech through automated or non-human means, whether through a bot, script, or otherwise; " +
        "(6) you will not use the Women-in-tech for any illegal or unauthorized purpose; and (7) your use of the " +
        "Women-in-tech will not violate any applicable law or regulation." +
        "<h4></h4>" +
        "If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to " +
        "suspend or terminate your account and refuse any and all current or future use of the Women-in-tech " +
        "(or any portion thereof)." +
        "<h4>USER REGISTRATION</h4>" +
        "You may be required to register with the Women-in-tech. You agree to keep your password confidential and will " +
        "be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a " +
        "username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or " +
        "otherwise objectionable." +
        "<h4>PROHIBITED ACTIVITIES</h4>" +
        "You may be required to register with the Women-in-tech for any purpose other than that for which we make the " +
        "Women-in-tech available. The Women-in-tech may not be used in connection with any commercial endeavors except " +
        "those that are specifically endorsed or approved by us.<br><br>" +
        "As a user of the Women-in-tech, you agree not to:<br><br>" +
        "1. Systematically retrieve data or other content from the Women-in-tech to create or compile, directly or " +
        "indirectly, a collection, compilation, database, or directory without written permission from us.<br><br>" +
        "2. Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account " +
        "information such as user passwords.<br><br>" +
        "3. Circumvent, disable, or otherwise interfere with security-related features of the Women-in-tech, including " +
        "features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the " +
        "Women-in-tech and/or the Content contained therein.<br><br>" +
        "4. Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Women-in-tech.<br><br>" +
        "5. Use any information obtained from the Women-in-tech in order to harass, abuse, or harm another person.<br><br>" +
        "6. Make improper use of our support services or submit false reports of abuse or misconduct.<br><br>" +
        "7. Use the Women-in-tech in a manner inconsistent with any applicable laws or regulations.<br><br>" +
        "8. Use the Women-in-tech to advertise or offer to sell goods and services.<br><br>" +
        "9. Engage in unauthorized framing of or linking to the Women-in-tech.<br><br>" +
        "10. Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, " +
        "including excessive use of capital letters and spamming (continuous posting of repetitive text), that " +
        "interferes with any party’s uninterrupted use and enjoyment of the Women-in-tech or modifies, impairs, " +
        "disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Women-in-tech.<br><br>" +
        "11. Engage in any automated use of the system, such as using scripts to send comments or messages, or using any" +
        " data mining, robots, or similar data gathering and extraction tools.<br><br>" +
        "12. Delete the copyright or other proprietary rights notice from any Content.<br><br>" +
        "13. Attempt to impersonate another user or person or use the username of another user.<br><br>" +
        "14. Sell or otherwise transfer your profile.<br><br>" +
        "15. Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or " +
        "active information collection or transmission mechanism, including without limitation, clear graphics " +
        "interchange formats (\"gifs\"), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to " +
        "as \"spyware\" or \"passive collection mechanisms\" or \"pcms\").<br><br>" +
        "16. Interfere with, disrupt, or create an undue burden on Women-in-tech or the networks or services connected to the Women-in-tech.<br><br>" +
        "17. Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any Women-in-tech service to you.<br><br>" +
        "18. Attempt to bypass any measures of the Women-in-tech designed to prevent or restrict access to the Women-in-tech e, or any portion of the Women-in-tech.<br><br>" +
        "19. Copy or adapt the Women-in-tech’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.<br><br>" +
        "20. Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Women-in-tech.<br><br>" +
        "21. Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or " +
        "distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or " +
        "offline reader that accesses the Women-in-tech, or using or launching any unauthorized script or other software.<br><br>" +
        "22. Use a buying agent or purchasing agent to make purchases on the Women-in-tech.<br><br>" +
        "23. Make any unauthorized use of the Women-in-tech, including collecting usernames and/or email addresses of " +
        "users by electronic or other means for the purpose of sending unsolicited email, or " +
        "creating user accounts by automated means or under false pretenses.<br><br>" +
        "24. Use the Women-in-tech as part of any effort to compete with us or otherwise use the " +
        "Women-in-tech and/or the Content for any revenue-generating endeavor or commercial enterprise." +
        "<h4>USER GENERATED CONTRIBUTIONS</h4>" +
        "The Women-in-tech does not offer users to submit or post content. We may provide you with the opportunity to " +
        "create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us" +
        " or on Women-in-tech, including but not limited to text, writings, video, audio, photographs, graphics, comments," +
        " suggestions, or personal information or other material (collectively, \"Contributions\"). Contributions may be " +
        "viewable by other users of Women-in-tech and through third party webWomen-in-tech. As such, any Contributions " +
        "you transmit may be treated in accordance with the Women-in-tech Privacy Policy. When you create or make " +
        "available any Contributions, you thereby represent and warrant that:<br><br>" +
        "1. The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or" +
        " copying of your Contributions do not and will not infringe the proprietary rights, including but not limited " +
        "to the copyright, patent, trademark, trade secret, or moral rights of any third party.<br><br>" +
        "2. You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions" +
        " to use and to authorize us, the Women-in-tech, and other users of the Women-in-tech to use your Contributions " +
        "in any manner contemplated by the Women-in-tech and these Terms of Use.<br><br>" +
        "3. You have the written consent, release, and/or permission of each and every identifiable individual person in" +
        " your Contributions to use the name or likeness of each and every such identifiable individual person to enable" +
        " inclusion and use of your Contributions in any manner contemplated by the Women-in-tech and these Terms of Use.<br><br>" +
        "4. Your Contributions are not false, inaccurate, or misleading.<br><br>" +
        "5. Your Contributions are not unsolicited or unauthorized advertising, promotional materials, " +
        "pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.<br><br>" +
        "6. Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, " +
        "slanderous, or otherwise objectionable (as determined by us).<br><br>" +
        "7. Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.<br><br>" +
        "8. Your Contributions do not advocate the violent overthrow of any government or incite, " +
        "encourage, or threaten physical harm against another.<br><br>" +
        "9. Your Contributions do not violate any applicable law, regulation, or rule.<br><br>" +
        "10. Your Contributions do not violate the privacy or publicity rights of any third party.<br><br>" +
        "11. Your Contributions do not contain any material that solicits personal information from anyone " +
        "under the age of 18 or exploits people under the age of 18 in a sexual or violent manner.<br><br>" +
        "12. Your Contributions do not violate any applicable law concerning child pornography, or otherwise " +
        "intended to protect the health or well-being of minors.<br><br>" +
        "13. Your Contributions do not include any offensive comments that are connected to race, national " +
        "origin, gender, sexual preference, or physical handicap.<br><br>" +
        "14. Your Contributions do not otherwise violate, or link to material that violates, any provision of " +
        "these Terms of use, or any applicable law or regulation.<br><br>" +
        "Any use of Women-in-tech in violation of the foregoing violates these Terms of Use and may result in, among " +
        "other things, termination or suspension of your rights to use the Women-in-tech." +
        "<h4>CONTRIBUTION LICENSE</h4>" +
        "You and the Women-in-tech agree that we may access, store, process, and use any information and personal data " +
        "that you provide following the terms of the Privacy Policy and your choices (including settings).<br><br>"+
        "By submitting suggestion or other feedback regarding the Women-in-tech, you agree that we can use and share " +
        "such feedback for any purpose without obtaining any consent and/or compensation to you.<br><br>" +
        "We do not assert any ownership over your Contributions. You retain full ownership of all your Contributions and " +
        "any intellectual property rights, or other proprietary rights associated with your Contributions. We are not " +
        "liable for any statements or representations in your Contributions provided by you in any area on the " +
        "Women-in-tech. You are solely responsible for your Contributions to the Women-in-tech and you expressly agree " +
        "to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your " +
        "Contributions." +
        "<h4>MOBILE APPLICATION LICENSE</h4>" +
        "Use License<br><br>" +
        "If you access the Women-in-tech via a mobile application, then we grant you a revocable, non-exclusive, " +
        "non-transferable, limited right to install and use the mobile application on wireless electronic devices owned " +
        "or controlled by you, and to access and use the mobile application on such devices strictly in accordance with " +
        "the terms and conditions of this mobile application license contained in these Terms of Use. You shall not: " +
        "(1) decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the application;" +
        " (2) make any modification, adaptation, improvement, enhancement, translation, or derivative work from the " +
        "application; (3) violate any applicable laws, rules, or regulations in connection with your access or use of " +
        "the application; (4) remove, alter, or obscure any proprietary notice (including any notice of copyright or " +
        "trademark) posted by us or the licensors of the application; (5) use the application for any revenue generating" +
        " endeavor, commercial enterprise, or other purpose for which it is not designed or intended; (6) make the " +
        "application available over a network or other environment permitting access or use by multiple devices or " +
        "users at the same time; (7) use the application for creating a product, service, or software that is, " +
        "directly or indirectly, competitive with or in any way a substitute for the application; (8) use the application" +
        " to send automated queries to any webWomen-in-tech or to send any unsolicited commercial e-mail; or (9) use " +
        "any proprietary information or any of our interfaces or our other intellectual property in the design, " +
        "development, manufacture, licensing, or distribution of any applications, accessories, or devices for " +
        "use with the application." +
        "<h4>Apple and Android Devices</h4>" +
        "The following terms apply when you use a mobile application obtained from either the Apple Store or Google Play" +
        " (each an \"App Distributor\") to access the Women-in-tech: (1) the license granted to you for our mobile " +
        "application is limited to a non-transferable license to use the application on a device that utilizes the Apple" +
        " iOS or Android operating systems, as applicable, and in accordance with the usage rules set forth in the " +
        "applicable App Distributor’s terms of service; (2) we are responsible for providing any maintenance and support" +
        " services with respect to the mobile application as specified in the terms and conditions of this mobile " +
        "application license contained in these Terms of Use or as otherwise required under applicable law, and you " +
        "acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support " +
        "services with respect to the mobile application; (3) in the event of any failure of the mobile application to " +
        "conform to any applicable warranty, you may notify the applicable App Distributor, and the App Distributor, " +
        "in accordance with its terms and policies, may refund the purchase price, if any, paid for the mobile " +
        "application, and to the maximum extent permitted by applicable law, the App Distributor will have no other " +
        "warranty obligation whatsoever with respect to the mobile application; (4) you represent and warrant that (i) " +
        "you are not located in a country that is subject to a U.S. government embargo, or that has been designated by " +
        "the U.S. government as a \"terrorist supporting\" country and (ii) you are not listed on any U.S. government " +
        "list of prohibited or restricted parties; (5) you must comply with applicable third-party terms of agreement " +
        "when using the mobile application, e.g., if you have a VoIP application, then you must not be in violation " +
        "of their wireless data service agreement when using the mobile application; and (6) you acknowledge and agree " +
        "that the App Distributors are third-party beneficiaries of the terms and conditions in this mobile application " +
        "license contained in these Terms of Use, and that each App Distributor will have the right (and will be deemed " +
        "to have accepted the right) to enforce the terms and conditions in this mobile application license contained " +
        "in these Terms of Use against you as a third-party beneficiary thereof." +
        "<h4>SUBMISSIONS</h4>" +
        "You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information " +
        "regarding the Women-in-tech (\"Submissions\") provided by you to us are non-confidential and shall become our " +
        "sole property. We shall own exclusive rights, including all intellectual property rights, and shall be " +
        "entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or " +
        "otherwise, without acknowledgement or compensation to you. You hereby waive all moral rights to any such " +
        "Submissions, and you hereby warrant that any such Submissions are original with you or that you have the " +
        "right to submit such Submissions. You agree there shall be no recourse against us for any alleged or actual " +
        "infringement or misappropriation of any proprietary right in your Submissions." +
        "<h4>WOMEN-IN-TECH MANAGEMENT</h4>" +
        "We reserve the right, but not the obligation, to: (1) monitor the Women-in-tech for violations of these Terms " +
        "of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or " +
        "these Terms of Use, including without limitation, reporting such user to law enforcement authorities; (3) in " +
        "our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable " +
        "(to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole " +
        "discretion and without limitation, notice, or liability, to remove from the Women-in-tech or otherwise disable " +
        "all files and content that are excessive in size or are in any way burdensome to our systems; and (5) " +
        "otherwise manage the Women-in-tech in a manner designed to protect our rights and property and to facilitate " +
        "the proper functioning of the Women-in-tech." +
        "<h4>TERM AND TERMINATION</h4>" +
        "These Terms of Use shall remain in full force and effect while you use the Women-in-tech. WITHOUT LIMITING ANY " +
        "OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR " +
        "LIABILITY, DENY ACCESS TO AND USE OF THE WOMEN-IN-TECH (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY " +
        "PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, " +
        "WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE " +
        "YOUR USE OR PARTICIPATION IN THE WOMEN-IN-TECH OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU " +
        "POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.<br><br>" +
        "If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new " +
        "account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on " +
        "behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take " +
        "appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress." +
        "<h4>MODIFICATIONS AND INTERRUPTIONS</h4>" +
        "We reserve the right to change, modify, or remove the contents of the Women-in-tech at any time or for any " +
        "reason at our sole discretion without notice. However, we have no obligation to update any information on our " +
        "Women-in-tech. We also reserve the right to modify or discontinue all or part of the Women-in-tech without " +
        "notice at any time. We will not be liable to you or any third party for any modification, price change, " +
        "suspension, or discontinuance of the Women-in-tech.<br><br>" +
        "We cannot guarantee the Women-in-tech will be available at all times. We may experience hardware, software, or " +
        "other problems or need to perform maintenance related to the Women-in-tech, resulting in interruptions, delays" +
        ", or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the " +
        "Women-in-tech at any time or for any reason without notice to you. You agree that we have no liability " +
        "whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Women-in-tech " +
        "during any downtime or discontinuance of the Women-in-tech. Nothing in these Terms of Use will be construed to " +
        "obligate us to maintain and support the Women-in-tech or to supply any corrections, updates, or releases in " +
        "connection therewith." +
        "<h4>GOVERNING LAW</h4>" +
        "These Terms shall be governed by the laws of Malaysia." +
        "<h4>DISPUTE RESOLUTION</h4>" +
        "You agree to irrevocably submit all disputes related to this Terms of Use to the exclusive jurisdiction of the " +
        "Malaysia courts." +
        "<h4>AMENDMENTS</h4>" +
        "There may be information on the Women-in-tech which contains typographical errors, inaccuracies, or omissions, " +
        "including descriptions, pricing availability, and various other information. We reserve the right to correct any " +
        "errors, inaccuracies, or omissions and to change or to update the information on the Women-in-tech at any time, " +
        "without prior notice." +
        "<h4>DISCLAIMER</h4>" +
        "THE USE OF THE WOMEN-IN-TECH IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE " +
        "WOMEN-IN-TECH AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM " +
        "ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE WOMEN-IN-TECH AND YOUR THEREOF AND NON-INFRINGEMENT. " +
        "WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE WOMEN-IN-TECH’S USE, " +
        "CONTENT OR THE CONTENT OF ANY WEBWOMEN-IN-TECH LINKED TO THE WOMEN-IN-TECH AND WE WILL ASSUME NO LIABILITY OR " +
        "RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR " +
        "PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE WOMEN-IN-TECH, (3) ANY " +
        "UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL " +
        "INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE WOMEN-IN-TECH, " +
        "(5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE WOMEN-IN-TECH BY " +
        "ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF " +
        "ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA " +
        "THE WOMEN-IN-TECH. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE " +
        "ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE WOMEN-IN-TECH, ANY HYPERLINKED WEBWOMEN-IN-TECH, OR ANY " +
        "WEBWOMEN-IN-TECH OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY " +
        "TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF " +
        "PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, " +
        "YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE." +
        "<h4>LIMITATIONS OF LIABILITY</h4>" +
        "IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS INCLUDING AFFILIATES AND SUBSIDIARIES BE LIABLE TO " +
        "YOU OR ANY THIRD PARTY(S) FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE " +
        "DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE " +
        "WOMEN-IN-TECH, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES." +
        "<h4>INDEMNIFICATION</h4>" +
        "You agree to defend, indemnify, and hold us harmless including our respective offices, employees, agents, " +
        "partners, from and against any loss, damage, liability, claim, or demand, including reasonable legal fees " +
        "and expenses, made by any third party due to or arising out of: (1) use of the Women-in-tech; (2) breach of " +
        "these Terms of Use; (3) any breach of your representations and warranties set forth in these Terms of Use; " +
        "(4) your violation of the rights of a third party, including but not limited to intellectual property rights; " +
        "or (5) any over harmful act toward any other use of the Women-in-tech with whom you connect via the " +
        "Women-in-tech. Notwithstanding the foregoing we reserve the right, at your expense, to assume the exclusive " +
        "defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at " +
        "your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, " +
        "action, or proceeding which is subject to this indemnification upon becoming aware of it." +
        "<h4>USER DATA</h4>" +
        "We will maintain certain data that you transmit to the Women-in-tech for the purpose of managing the " +
        "performance of the Women-in-tech, as well as data relating to your use of the Women-in-tech. Although we perform" +
        " regular routine backups of data, you are solely responsible for all data that you transmit or that which " +
        "relates to any activity you have undertaken using the Women-in-tech. You agree that we shall have no liability " +
        "to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising " +
        "from any such loss or corruption of such data." +
        "<h4>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h4>" +
        "Visiting the Women-in-tech, sending us emails, and completing online forms constitute electronic communications. " +
        "You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and " +
        "other communications we provide to you electronically, via email and on the Women-in-tech, satisfy any legal " +
        "requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, " +
        "CONTRACTS, ORDERS, ANDOTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF " +
        "TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE WOMEN-IN-TECH." +
        "<h4>MISCELLANEOUS</h4>" +
        "These Terms of Use and any policies or operating rules posted by us on Women-in-tech or in respect to the " +
        "Women-in-tech constitute the entire agreement and understanding between you and us. Our failure to exercise " +
        "or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or " +
        "provision. These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of " +
        "our rights and obligations to others at any time. We shall not be responsible or liable for any loss, " +
        "damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part " +
        "of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or " +
        "part of the provision is deemed severable from these Terms of Use and does not affect the validity and " +
        "enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency " +
        "relationship created between you and us as a result of these Terms of Use or use of the Women-in-tech. You " +
        "agree that these Terms of Use will not be construed against us by virtue of having drafted them."

    firebase.firestore().collection("TermsOfUse").doc("TermsOfUse_en").set({
        contents: contents
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}