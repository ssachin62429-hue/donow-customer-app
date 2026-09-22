import { PartnerLanguage } from '../types';

export const partnerTranslations = {
  en: {
    // Brand & App
    partnerAppTitle: 'DoNow Partner',
    tagline: 'Earn with pride. Deliver real assistance.',
    subTagline: 'Professional Human Assistance Marketplace',
    languageToggle: 'हिन्दी',

    // Screen 1: Splash
    splashSubtitle: 'Partner App',
    splashStatus: 'Starting Partner Portal...',

    // Screen 2: Login & OTP
    loginTitle: 'Partner Sign In',
    loginSubtitle: 'Enter your 10-digit registered mobile number to proceed.',
    mobilePlaceholder: '98765 43210',
    getOtpBtn: 'GET OTP VIA SMS',
    otpTitle: 'Verify Mobile Number',
    otpSubtitle: 'Enter the 6-digit verification code sent to',
    resendOtpIn: 'Resend OTP in',
    resendOtpBtn: 'RESEND OTP',
    verifyOtpBtn: 'VERIFY & CONTINUE',
    demoOtpNotice: 'Demo OTP: 4 8 2 9 1 0 is auto-filled for quick testing.',

    // Screen 3: Strict Permissions
    permissionsTitle: 'Mandatory Device Permissions',
    permissionsNotice: 'CRITICAL: DoNow Partner requires these 3 permissions active at all times. Orders CANNOT be matched or dispatched if any permission is disabled.',
    permLocationTitle: 'Location (Set to "Always Allow")',
    permLocationDesc: 'Needed for matching within 3–7 km and precise 50m customer arrival geofencing.',
    permNotifTitle: 'Notifications (High Priority)',
    permNotifDesc: 'Crucial for immediate incoming order ringing alarms and emergency dispatch alerts.',
    permCameraTitle: 'Camera & Storage',
    permCameraDesc: 'Required for KYC selfie, Aadhaar/PAN photo upload, and support evidence.',
    grantPermissionsBtn: 'GRANT ALL PERMISSIONS & PROCEED',
    allPermissionsGranted: 'All Mandatory Permissions Active',

    // Screen 4: KYC & Registration
    kycTitle: 'Partner KYC Verification',
    kycSubtitle: 'Submit your official identity documents for background check and service assignment.',
    fullNameLabel: 'Full Legal Name (as on Aadhaar)',
    selfieLabel: 'Live Selfie Photo',
    selfieHint: 'Take a clear front-facing photo without sunglasses or cap',
    aadhaarLabel: 'Aadhaar Card (Front & Back)',
    panLabel: 'PAN Card Photo',
    tapToUpload: 'Tap to capture / upload',
    uploadedSuccess: 'Document Uploaded ✓',
    submitKycBtn: 'SUBMIT KYC FOR VERIFICATION',
    noSkillNoticeTitle: '⚠️ Important Service Assignment Policy:',
    noSkillNoticeDesc: 'Partners do NOT select their own services. DoNow administrators review your background, physical capability, and verification documents to assign permitted eligible service categories.',
    underReviewTitle: 'KYC Under Verification',
    underReviewDesc: 'Your documents have been submitted to DoNow Admin Team. Verification typically takes 2–4 hours. Once verified, eligible service categories will be activated automatically.',
    proceedDemoBtn: 'EXPLORE APPROVED PARTNER DASHBOARD (DEMO)',

    // Screen 5: Home Dashboard
    online: 'ONLINE — RECEIVING ORDERS',
    offline: 'OFFLINE — PAUSED',
    switchToGoOnline: 'Go Online to receive nearby assistance tasks',
    switchToGoOffline: 'You are Online. Stay active to receive task alerts.',
    searchingRadar: 'Scanning for assistance requests within 3–7 km...',
    todayEarnings: "Today's Earnings",
    pendingCommission: 'Pending Commission',
    completedOrders: 'Completed Tasks',
    assignedServicesHeader: 'Admin Assigned Services',
    verifiedBadge: 'KYC Verified ✓',

    // Screen 6: Incoming Order Alert
    incomingOrderAlert: 'INCOMING ORDER REQUEST',
    serviceType: 'Service Category',
    location: 'Meeting Location',
    scheduledTime: 'Scheduled Slot',
    expectedDuration: 'Estimated Duration',
    yourEarningLabel: 'Your Guaranteed Earning',
    customerTipLabel: 'Customer Tip (100% Yours)',
    totalEarningLabel: 'TOTAL EARNING FOR YOU',
    earningTransparencyNotice: 'Transparency Rule: You receive 100% of the Tip. Platform commission is already excluded from your earning.',
    swipeToAccept: 'SWIPE RIGHT TO ACCEPT',
    tapToReject: 'DECLINE ORDER',

    // Screen 7: Navigation to Customer
    navigatingTitle: 'En Route to Customer',
    customerLabel: 'Customer',
    distanceToCustomer: 'Distance',
    etaToCustomer: 'Estimated ETA',
    callMaskedBtn: 'CALL (MASKED PROXY)',
    messageBtn: 'IN-APP CHAT',
    privacyNoticePhone: '🔒 Privacy Protected: Personal phone numbers are masked through DoNow virtual call bridge.',
    slideToArrive: 'SLIDE TO MARK ARRIVED (Within 50m)',

    // Screen 8: Arrival Exceptions
    tooFarTitle: 'Arrival Distance Error',
    tooFarMessage: 'You are currently 350 metres away from the customer location. Automatic arrival is ONLY permitted within a strict 50-metre radius.',
    enterArrivalCodeBtn: 'ENTER CUSTOMER ARRIVAL CODE',
    arrivalCodeModalTitle: 'Manual Arrival Verification',
    arrivalCodeModalSub: 'If GPS is drifting or building interior blocks signal, ask the customer for their 4-digit Arrival Code.',
    arrivalCodePrompt: 'Enter 4-Digit Customer Code (Demo: 4829)',
    verifyCodeBtn: 'VERIFY ARRIVAL CODE',
    invalidCodeMsg: 'Incorrect code. Please check with customer.',
    simLocationToggle: 'Toggle GPS to <50m (Within Range)',

    // Screen 9: Work in Progress (Timer)
    workInProgressTitle: 'Active Job in Progress',
    liveTimerLabel: 'Task Elapsed Timer',
    scheduledStartNotice: '⏳ Scheduled Start Time Rule: Even if you arrived early, customer billing starts strictly at the scheduled time (10:00 AM).',
    offlineModeActive: 'Offline Mode Active — Timer continuing safely via local device clock.',
    offlineToggle: 'Simulate Network Loss (Offline Timer Mode)',
    onlineModeActive: 'Network Connected — Live Cloud Sync',
    sosEmergencyBtn: 'EMERGENCY SOS',
    endWorkBtn: 'END WORK & GENERATE BILL',

    // Screen 10: Work Completed (Cash Collection)
    taskCompletedTitle: 'Task Completed Successfully!',
    actualDurationLabel: 'Actual Worked Time',
    serviceFareCalc: 'Base Service Earning (150m @ ₹3/min)',
    customerTipAdded: 'Customer Tip Added',
    platformCommCut: 'DoNow Platform Fee (Cash Collection)',
    collectCashHeader: 'COLLECT CASH FROM CUSTOMER',
    cashCollectNotice: 'Customer was instructed to keep exact cash ready. Hand over any balance change accurately.',
    slideCashCollected: 'SLIDE: CASH RECEIVED ₹490',

    // Screen 11: Commission Wallet (Warning)
    commissionWalletTitle: 'DoNow Commission Wallet',
    pendingCommissionAmount: 'Pending Commission Due',
    ordersCompletedCount: 'Orders Completed Since Settle',
    walletWarningRule: '⚠️ Important Rule: If pending commission reaches ₹100 OR 3 completed orders, your account will be temporarily locked from receiving new orders until settled.',
    thresholdNotice: 'Current Status: Approaching Limit (₹85 / 2 Orders)',
    payCommissionBtn: 'PAY COMMISSION NOW VIA UPI',

    // Screen 12: Commission Locked (Account Paused)
    accountLockedTitle: 'ACCOUNT PAUSED — COMMISSION DUE',
    accountLockedBanner: 'NEW ORDERS TEMPORARILY PAUSED',
    lockedReason: 'Commission threshold exceeded: ₹115 due across 3 completed cash orders. To maintain marketplace integrity, settle your commission to immediately unpause orders.',
    payToUnlockBtn: 'PAY ₹115 VIA UPI TO UNLOCK ORDERS',
    upiSuccessNotice: 'Payment verified! Your account is now Active and unlocked.',

    // Screen 13: Performance & Cooldown
    performanceTitle: 'Performance & Tier Rating',
    lastTenTitle: 'Completion Rate (Last 10 Orders)',
    bestTierBadge: 'GREEN / BEST TIER (8/10 Completed)',
    cooldownWarningTitle: 'Cancellation Cooldown Policy',
    cooldownRuleDesc: 'If a partner cancels 3 accepted orders within 24 hours, an automated 12-hour account cooldown is applied where no new orders can be received.',
    simulateCooldownBtn: 'Toggle 12-Hour Cooldown Simulation',
    cooldownActiveAlert: '⚠️ 12-Hour Cooldown Active: 3 cancellations recorded in 24 hours. Resumes in 11h 42m.',

    // Screen 14: No-Show / Cancellation
    noShowTitle: 'Customer No-Show Assistance',
    noShowInstructions: 'You have arrived at the designated location. If customer is unreachable, please wait for the mandatory 10-minute grace window.',
    timerWaitLabel: 'Mandatory Waiting Period',
    timerRunningHint: 'Please call customer twice via masked calling before marking no-show.',
    markNoShowBtn: 'MARK CUSTOMER NO-SHOW & CLAIM COMPENSATION',
    waitingPeriodActive: 'Waiting window active (Button enables after 10m)',
    skipTimerDemo: 'Fast-Forward 10 Mins (Demo)',

    // Screen 15: Help & Support Ticket
    supportTitle: 'Partner Help Desk',
    supportSubtitle: 'Raise a ticket for immediate assistance regarding payments, safety, or customers.',
    issueCategoryLabel: 'Select Issue Category',
    catCash: 'Cash Dispute / Customer Refused Cash',
    catBehaviour: 'Customer Inappropriate Behavior',
    catApp: 'App / Timer / Location Glitch',
    describeIssueLabel: 'Detailed Explanation',
    describePlaceholder: 'Provide location, customer name, and details of what happened...',
    attachPhotoLabel: 'Attach Photo / Screenshot Proof',
    submitTicketBtn: 'SUBMIT SUPPORT TICKET',
    ticketSuccessMsg: 'Ticket #DN-PT-8832 logged. Partner Support will call within 10 minutes.',

    // Screen 16: Profile & Settings
    profileTitle: 'Partner Profile & Settings',
    partnerName: 'Rahul Sharma',
    partnerPhone: '+91 98765 43210 (Verified)',
    kycStatusVerified: 'Full KYC Verified (Aadhaar & PAN)',
    assignedServicesLabel: 'Admin Assigned Service Categories (Read Only)',
    appLanguageLabel: 'Application Language',
    deleteAccountBtn: 'DELETE PARTNER ACCOUNT',
    deleteAccountWarning: 'Deleting your partner account will permanently remove your KYC profile, rating tier, and forfeit any pending payouts.',
  },
  hi: {
    // Brand & App
    partnerAppTitle: 'DoNow पार्टनर',
    tagline: 'सम्मान के साथ कमाएं। असली सहायता प्रदान करें।',
    subTagline: 'व्यावसायिक मानव सहायता मार्केटप्लेस',
    languageToggle: 'English',

    // Screen 1: Splash
    splashSubtitle: 'पार्टनर ऐप',
    splashStatus: 'पार्टनर पोर्टल शुरू हो रहा है...',

    // Screen 2: Login & OTP
    loginTitle: 'पार्टनर लॉगिन',
    loginSubtitle: 'आगे बढ़ने के लिए अपना 10-अंकों का पंजीकृत मोबाइल नंबर दर्ज करें।',
    mobilePlaceholder: '98765 43210',
    getOtpBtn: 'SMS से OTP प्राप्त करें',
    otpTitle: 'मोबाइल नंबर सत्यापित करें',
    otpSubtitle: 'इस नंबर पर भेजा गया 6-अंकों का सत्यापन कोड दर्ज करें:',
    resendOtpIn: 'पुनः OTP भेजें',
    resendOtpBtn: 'OTP पुनः भेजें',
    verifyOtpBtn: 'सत्यापित करें और आगे बढ़ें',
    demoOtpNotice: 'डेमो OTP: 4 8 2 9 1 0 त्वरित परीक्षण के लिए स्वतः भरा गया है।',

    // Screen 3: Strict Permissions
    permissionsTitle: 'अनिवार्य डिवाइस अनुमतियां',
    permissionsNotice: 'महत्वपूर्ण: DoNow पार्टनर ऐप को हर समय ये 3 अनुमतियां सक्रिय रखना आवश्यक है। किसी भी अनुमति के बिना ऑर्डर प्राप्त नहीं किए जा सकते।',
    permLocationTitle: 'स्थान ("हमेशा अनुमति दें" पर सेट करें)',
    permLocationDesc: '3–7 किमी के दायरे में ऑर्डर मैचिंग और 50 मीटर ग्राहक आगमन पहचान के लिए आवश्यक।',
    permNotifTitle: 'सूचनाएं (उच्च प्राथमिकता)',
    permNotifDesc: 'इनकमिंग ऑर्डर रिंगिंग अलार्म और आपातकालीन संदेशों के लिए अनिवार्य।',
    permCameraTitle: 'कैमरा और स्टोरेज',
    permCameraDesc: 'KYC सेल्फी, आधार/पैन अपलोड और सहायता साक्ष्य के लिए आवश्यक।',
    grantPermissionsBtn: 'सभी अनुमतियां दें और आगे बढ़ें',
    allPermissionsGranted: 'सभी अनिवार्य अनुमतियां सक्रिय हैं',

    // Screen 4: KYC & Registration
    kycTitle: 'पार्टनर KYC सत्यापन',
    kycSubtitle: 'पहचान जांच और सेवा आवंटन के लिए अपने आधिकारिक दस्तावेज जमा करें।',
    fullNameLabel: 'पूरा कानूनी नाम (आधार के अनुसार)',
    selfieLabel: 'लाइव सेल्फी फोटो',
    selfieHint: 'बिना चश्मे या टोपी के एक साफ सामने की तस्वीर लें',
    aadhaarLabel: 'आधार कार्ड (आगे और पीछे)',
    panLabel: 'पैन कार्ड फोटो',
    tapToUpload: 'फोटो खींचने / अपलोड करने के लिए टैप करें',
    uploadedSuccess: 'दस्तावेज अपलोड हुआ ✓',
    submitKycBtn: 'सत्यापन हेतु KYC जमा करें',
    noSkillNoticeTitle: '⚠️ महत्वपूर्ण सेवा आवंटन नियम:',
    noSkillNoticeDesc: 'पार्टनर अपनी सेवाएं खुद नहीं चुनते हैं। DoNow व्यवस्थापक आपकी पृष्ठभूमि, शारीरिक क्षमता और दस्तावेजों की जांच के बाद योग्य सेवाएं आवंटित करते हैं।',
    underReviewTitle: 'KYC सत्यापन प्रक्रियाधीन है',
    underReviewDesc: 'आपके दस्तावेज DoNow टीम को प्रस्तुत कर दिए गए हैं। सत्यापन में 2–4 घंटे लगते हैं। सत्यापित होते ही योग्य सेवाएं सक्रिय हो जाएंगी।',
    proceedDemoBtn: 'स्वीकृत पार्टनर डैशबोर्ड देखें (डेमो)',

    // Screen 5: Home Dashboard
    online: 'ऑनलाइन — ऑर्डर प्राप्त हो रहे हैं',
    offline: 'ऑफलाइन — रुका हुआ',
    switchToGoOnline: 'आस-पास के सहायता कार्य प्राप्त करने के लिए ऑनलाइन जाएं',
    switchToGoOffline: 'आप ऑनलाइन हैं। नए टास्क के लिए सक्रिय रहें।',
    searchingRadar: '3–7 किमी में नए सहायता कार्यों की तलाश जारी है...',
    todayEarnings: 'आज की कमाई',
    pendingCommission: 'देय कमीशन',
    completedOrders: 'पूर्ण कार्य',
    assignedServicesHeader: 'प्रशासक द्वारा आवंटित सेवाएं',
    verifiedBadge: 'KYC सत्यापित ✓',

    // Screen 6: Incoming Order Alert
    incomingOrderAlert: 'नया इनकमिंग ऑर्डर अनुरोध',
    serviceType: 'सेवा श्रेणी',
    location: 'मिलने का स्थान',
    scheduledTime: 'निर्धारित समय',
    expectedDuration: 'अनुमानित अवधि',
    yourEarningLabel: 'आपकी निश्चित कमाई',
    customerTipLabel: 'ग्राहक टिप (100% आपकी)',
    totalEarningLabel: 'आपकी कुल कमाई',
    earningTransparencyNotice: 'पारदर्शिता नियम: आपको 100% टिप मिलती है। प्लेटफॉर्म कमीशन आपकी कमाई से पहले ही काट लिया गया है।',
    swipeToAccept: 'स्वीकार करने के लिए स्वाइप करें',
    tapToReject: 'ऑर्डर अस्वीकार करें',

    // Screen 7: Navigation to Customer
    navigatingTitle: 'ग्राहक के स्थान पर जा रहे हैं',
    customerLabel: 'ग्राहक',
    distanceToCustomer: 'दूरी',
    etaToCustomer: 'अनुमानित समय (ETA)',
    callMaskedBtn: 'कॉल करें (सुरक्षित मास्क)',
    messageBtn: 'चैट करें',
    privacyNoticePhone: '🔒 गोपनीयता सुरक्षित: DoNow वर्चुअल ब्रिज के माध्यम से व्यक्तिगत फोन नंबर सुरक्षित रखे जाते हैं।',
    slideToArrive: 'पहुंचने पर स्लाइड करें (50 मीटर के अंदर)',

    // Screen 8: Arrival Exceptions
    tooFarTitle: 'स्थान दूरी त्रुटि',
    tooFarMessage: 'आप वर्तमान में ग्राहक के स्थान से 350 मीटर दूर हैं। स्वचालित आगमन केवल 50 मीटर के दायरे में ही मान्य है।',
    enterArrivalCodeBtn: 'ग्राहक आगमन कोड दर्ज करें',
    arrivalCodeModalTitle: 'मैन्युअल आगमन सत्यापन',
    arrivalCodeModalSub: 'यदि GPS सिग्नल कमजोर है, तो ग्राहक से 4-अंकों का आगमन कोड मांगें।',
    arrivalCodePrompt: '4-अंकों का कोड दर्ज करें (डेमो: 4829)',
    verifyCodeBtn: 'कोड सत्यापित करें',
    invalidCodeMsg: 'गलत कोड। कृपया ग्राहक से दोबारा पूछें।',
    simLocationToggle: 'GPS को 50 मीटर से कम करें (सीमा के भीतर)',

    // Screen 9: Work in Progress (Timer)
    workInProgressTitle: 'सक्रिय कार्य प्रगति पर है',
    liveTimerLabel: 'कार्य टाइमर',
    scheduledStartNotice: '⏳ निर्धारित समय नियम: यदि आप जल्दी पहुंचे, तो भी बिलिंग निर्धारित समय (10:00 AM) पर ही शुरू होगी।',
    offlineModeActive: 'ऑफलाइन मोड सक्रिय — डिवाइस घड़ी के जरिए टाइमर जारी है।',
    offlineToggle: 'नेटवर्क हानि सिमुलेट करें (ऑफलाइन टाइमर)',
    onlineModeActive: 'नेटवर्क कनेक्टेड — लाइव क्लाउड सिंक',
    sosEmergencyBtn: 'आपातकालीन SOS',
    endWorkBtn: 'काम समाप्त करें और बिल बनाएं',

    // Screen 10: Work Completed (Cash Collection)
    taskCompletedTitle: 'कार्य सफलतापूर्वक पूरा हुआ!',
    actualDurationLabel: 'वास्तविक काम का समय',
    serviceFareCalc: 'मूल सेवा कमाई (150 मिनट @ ₹3/मिनट)',
    customerTipAdded: 'ग्राहक टिप जोड़ी गई',
    platformCommCut: 'DoNow प्लेटफॉर्म शुल्क',
    collectCashHeader: 'ग्राहक से नकद राशि प्राप्त करें',
    cashCollectNotice: 'ग्राहक को सटीक नकद तैयार रखने के निर्देश दिए गए हैं। बचा हुआ खुल्ला वापस लौटाएं।',
    slideCashCollected: 'स्लाइड करें: नकद प्राप्त ₹490',

    // Screen 11: Commission Wallet (Warning)
    commissionWalletTitle: 'DoNow कमीशन वॉलेट',
    pendingCommissionAmount: 'देय कमीशन राशि',
    ordersCompletedCount: 'पूर्ण किए गए ऑर्डर',
    walletWarningRule: '⚠️ महत्वपूर्ण नियम: यदि देय कमीशन ₹100 या 3 पूर्ण ऑर्डर तक पहुंच जाता है, तो भुगतान होने तक नए ऑर्डर रुक जाएंगे।',
    thresholdNotice: 'वर्तमान स्थिति: सीमा के निकट (₹85 / 2 ऑर्डर)',
    payCommissionBtn: 'UPI द्वारा अभी कमीशन भरें',

    // Screen 12: Commission Locked (Account Paused)
    accountLockedTitle: 'खाता रुका हुआ — कमीशन बकाया',
    accountLockedBanner: 'नए ऑर्डर अस्थायी रूप से रुके हैं',
    lockedReason: 'कमीशन सीमा पार: 3 नकद ऑर्डर पर ₹115 बकाया है। नए ऑर्डर फिर से शुरू करने के लिए कमीशन जमा करें।',
    payToUnlockBtn: 'ऑर्डर शुरू करने के लिए ₹115 UPI से भुगतान करें',
    upiSuccessNotice: 'भुगतान सत्यापित! आपका खाता अब सक्रिय और अनलॉक हो गया है।',

    // Screen 13: Performance & Cooldown
    performanceTitle: 'प्रदर्शन और रेटिंग स्तर',
    lastTenTitle: 'कार्य समापन दर (पिछले 10 ऑर्डर)',
    bestTierBadge: 'हरा / सर्वश्रेष्ठ स्तर (8/10 पूर्ण)',
    cooldownWarningTitle: 'रद्दीकरण कूलडाउन नियम',
    cooldownRuleDesc: 'यदि कोई पार्टनर 24 घंटे में 3 बार स्वीकार किया गया ऑर्डर रद्द करता है, तो 12 घंटे का कूलडाउन लागू होता है।',
    simulateCooldownBtn: '12-घंटे का कूलडाउन सिमुलेट करें',
    cooldownActiveAlert: '⚠️ 12-घंटे का कूलडाउन सक्रिय: 24 घंटे में 3 रद्दीकरण दर्ज। 11 घंटे 42 मिनट में समाप्त होगा।',

    // Screen 14: No-Show / Cancellation
    noShowTitle: 'ग्राहक अनुपस्थिति (No-Show)',
    noShowInstructions: 'आप स्थान पर पहुंच चुके हैं। यदि ग्राहक से संपर्क नहीं हो पा रहा है, तो 10 मिनट का प्रतीक्षा समय अनिवार्य है।',
    timerWaitLabel: 'अनिवार्य प्रतीक्षा समय',
    timerRunningHint: 'No-Show मार्क करने से पहले ग्राहक को कम से कम दो बार सुरक्षित कॉल करें।',
    markNoShowBtn: 'ग्राहक No-Show मार्क करें और मुआवजा पाएं',
    waitingPeriodActive: 'प्रतीक्षा समय सक्रिय (10 मिनट बाद बटन सक्षम होगा)',
    skipTimerDemo: '10 मिनट आगे बढ़ाएं (डेमो)',

    // Screen 15: Help & Support Ticket
    supportTitle: 'पार्टनर सहायता केंद्र',
    supportSubtitle: 'भुगतान, सुरक्षा या ग्राहक विवाद के लिए तुरंत टिकट दर्ज करें।',
    issueCategoryLabel: 'समस्या की श्रेणी चुनें',
    catCash: 'नकद भुगतान विवाद / ग्राहक ने नकद देने से मना किया',
    catBehaviour: 'ग्राहक का अनुचित व्यवहार',
    catApp: 'ऐप / टाइमर / स्थान तकनीकी खराबी',
    describeIssueLabel: 'विस्तृत विवरण',
    describePlaceholder: 'स्थान, ग्राहक का नाम और क्या हुआ विस्तार से बताएं...',
    attachPhotoLabel: 'फोटो / स्क्रीनशॉट प्रमाण जोड़ें',
    submitTicketBtn: 'सपोर्ट टिकट सबमिट करें',
    ticketSuccessMsg: 'टिकट #DN-PT-8832 दर्ज हो गया। सहायता टीम 10 मिनट में संपर्क करेगी।',

    // Screen 16: Profile & Settings
    profileTitle: 'पार्टनर प्रोफ़ाइल और सेटिंग्स',
    partnerName: 'राहुल शर्मा',
    partnerPhone: '+91 98765 43210 (सत्यापित)',
    kycStatusVerified: 'पूर्ण KYC सत्यापित (आधार एवं पैन)',
    assignedServicesLabel: 'व्यवस्थापक द्वारा आवंटित सेवाएं (केवल पढ़ने के लिए)',
    appLanguageLabel: 'ऐप भाषा',
    deleteAccountBtn: 'पार्टनर खाता हटाएं',
    deleteAccountWarning: 'पार्टनर खाता हटाने से आपका KYC डेटा, रेटिंग स्तर और सभी लंबित भुगतान स्थायी रूप से मिट जाएंगे।',
  },
};

export type PartnerTranslationKey = keyof typeof partnerTranslations.en;
