import { Language } from '../types';

export const translations = {
  en: {
    // Brand & General
    appName: 'DoNow',
    tagline: 'Kaam hai? DoNow.',
    continue: 'CONTINUE',
    submit: 'SUBMIT',
    verify: 'VERIFY',
    cancel: 'Cancel',
    back: 'Back',
    save: 'Save',
    done: 'Done',
    close: 'Close',
    min: 'min',
    mins: 'mins',
    hr: 'hr',
    hrs: 'hrs',
    rupee: '₹',

    // Screen 1: Splash
    splashSubtitle: 'Real-world human assistance at your doorstep',

    // Screen 2: Permissions
    permissionTitle: 'Permissions Setup',
    permissionDesc: 'DoNow needs only necessary permissions to help you book verified partners seamlessly.',
    permLocationTitle: 'Location Access',
    permLocationDesc: 'Required for selecting accurate service location and live partner arrival tracking.',
    permNotifTitle: 'Notifications',
    permNotifDesc: 'Required for instant updates on partner matching, arrival, and order progress.',
    permCameraTitle: 'Camera (Optional)',
    permCameraDesc: 'Only required when sharing photos or work evidence during a task.',
    permMicTitle: 'Microphone (Optional)',
    permMicDesc: 'Only required for future voice note and task dictation features.',
    permAllow: 'Allow',
    permAllowed: 'Allowed ✓',
    permGrantAll: 'CONTINUE TO LOGIN',

    // Screen 3: Login
    welcomeTitle: 'Welcome to DoNow',
    welcomeSub: 'Enter your 10-digit Indian mobile number to get started.',
    mobileNumberLabel: 'Mobile Number',
    mobilePlaceholder: 'Enter 10-digit mobile number',
    loginDisclaimer: 'By continuing, you agree to receive SMS & OTP for verification.',

    // Screen 4: OTP
    otpTitle: 'Verify your mobile number',
    otpSub: 'Enter the 6-digit verification code sent to +91',
    resendOtp: 'RESEND OTP',
    resendIn: 'Resend OTP in',
    otpHint: 'Demo OTP: 123456 (or any 6 digits)',

    // Screen 5: Create Profile
    profileTitle: 'Create Profile',
    profileSub: 'Please enter your details to set up your DoNow account.',
    nameLabel: 'Full Name',
    namePlaceholder: 'e.g. Amit Verma',
    verifiedBadge: 'Verified',
    termsCheckbox: "I agree to DoNow's Terms of Service, Privacy Policy and Service Rules.",
    createAccountBtn: 'CREATE ACCOUNT',
    termsAcceptedNote: 'Terms are agreed during registration. No repeated checkboxes later.',

    // Screen 6: Home
    greeting: 'Good Morning',
    selectLocation: 'Select your location',
    homeHeading: 'Aapko kya kaam karwana hai?',
    writeTaskBtn: 'Apna kaam likhein',
    writeTaskSub: 'Describe in words or voice notes',
    selectServicesBtn: 'Select from Services',
    selectServicesSub: '10 on-demand assistance categories',
    activePartnersNearby: '🟢 12 Partners Active Nearby',
    activePartnersPrivacyNotice: 'Before booking, you can only see the number of active partners nearby. Partner identities remain private until booking.',
    upcomingOrderHeader: 'Active / Upcoming Order',
    viewDetails: 'View Details',
    homeTab: 'HOME',
    ordersTab: 'ORDERS',
    notificationsTab: 'NOTIFICATIONS',
    profileTab: 'PROFILE',

    // Screen 7: Write Task
    writeTaskTitle: 'Aapko kya kaam karwana hai?',
    writeTaskPlaceholder: 'Apna kaam yahan likhein...\n\nExample: Birthday party mein guests manage karne ke liye help chahiye.',
    voiceInputHint: 'Tap to dictate task (Demo)',
    taskLocationLabel: 'Location',
    taskDateLabel: 'Date',
    taskStartTimeLabel: 'Start Time',
    taskDurationLabel: 'Expected Duration',

    // Screen 8: Service Selection
    servicesTitle: 'Choose a Service',
    servicesSub: 'All services have a 30-minute minimum billable duration with actual-time billing.',
    minChargeLabel: 'Min. charge',
    startingAt: 'Starting at',

    // Screen 9: Task Details
    rateLabel: 'Rate',
    minDurationRule: 'Minimum billable duration: 30 minutes',
    selectTaskOptions: 'What assistance do you need?',
    additionalDetailsLabel: 'Additional Details / Specific Instructions',
    additionalDetailsPlaceholder: 'Provide any specific instructions or requirements for your partner...',

    // Screen 10: Location
    locationTitle: 'Service Location',
    useCurrentLocation: 'Use Current Location',
    searchLocationPlaceholder: 'Search building, area, landmark...',
    adjustPinHint: 'Drag pin on map to adjust exact meeting point',
    locationNameLabel: 'Location / Venue Name',
    fullAddressLabel: 'Full Address',
    landmarkLabel: 'Landmark',
    instructionsLabel: 'Meeting Instructions for Partner',
    confirmLocationBtn: 'CONFIRM LOCATION',

    // Screen 11: Booking Summary
    bookingSummaryTitle: 'Booking Summary',
    serviceSummary: 'Service',
    dateTimeSummary: 'Date & Time',
    durationSummary: 'Expected Duration',
    rateSummary: 'Rate per minute',
    estimatedAmountLabel: 'Estimated Amount',
    actualBillingNote: 'Note: Actual billing is calculated by exact work minutes. Minimum 30 mins applicable.',
    bookNowBtn: 'BOOK NOW',

    // Screen 12: Finding Partner
    findingPartnerTitle: 'Finding a Partner...',
    findingPartnerSub: 'Matching you with the nearest eligible active partner',
    searchRadius3km: 'Searching within 3 km radius...',
    searchRadius5km: 'Expanding search to 5 km radius...',
    searchRadius7km: 'Expanding search to 7 km radius...',
    autoMatchingNote: 'Partners receive instant notifications based on proximity and skills.',

    // Screen 13: Tip
    noPartnerAcceptedYet: 'No partner has accepted yet.',
    addTipPrompt: 'Add a tip to make your order more attractive to nearby partners.',
    tipNote: 'Tip is 100% passed to the partner. Tip is separate from service fare and NOT subject to DoNow’s 15% platform commission.',
    noTip: 'No Tip',
    updateOrderBtn: 'UPDATE ORDER',

    // Screen 14: Partner Accepted
    partnerFoundTitle: 'Partner Found ✓',
    partnerFoundSub: 'Your DoNow partner has accepted and is heading to your location.',
    ratingBadge: 'Rating',
    performanceBadge: 'Performance',
    distanceBadge: 'Distance',
    etaBadge: 'ETA',
    callPartner: 'CALL',
    messagePartner: 'MESSAGE',
    privacyMaskNotice: 'Numbers are securely masked. Personal phone numbers are never shared.',

    // Screen 15: Partner Arrived
    partnerArrivedTitle: 'Partner Arrived ✓',
    partnerArrivedSub: 'has arrived at your location.',
    arrivalDistanceNotice: 'Arrival verified within 50 metres radius.',
    scheduledTimeLabel: 'Scheduled Time',
    timerNoticeEarly: 'Partner arrived early. Timer will NOT start before the scheduled start time (10:00 AM).',
    timerNoticeNormal: 'Ready to begin. Customer receives full booked duration.',
    sosButton: 'SOS / EMERGENCY',

    // Screen 16: Work in Progress
    workInProgressTitle: 'Work in Progress',
    liveTimerLabel: 'Active Work Timer',
    serviceOngoing: 'Service ongoing smoothly',

    // Screen 17: Work Completed
    workCompletedTitle: 'Work Completed ✓',
    actualServiceTimeLabel: 'Actual Service Time',
    serviceAmountLabel: 'Service Amount',
    customerTipLabel: 'Customer Tip',
    finalAmountLabel: 'Final Amount',
    paymentMethodLabel: 'Payment Method',
    cashPayment: 'Cash to Partner',
    upiPayment: 'UPI / QR Scan',
    paymentConfirmedBtn: 'PAYMENT CONFIRMED',

    // Screen 18: Rate Partner
    rateTitle: 'Rate Your Partner',
    rateSub: 'How was your experience with',
    optionalReviewLabel: 'Write an optional review (punctuality, politeness, task quality)',
    reviewPlaceholder: 'Help other DoNow customers know how helpful the partner was...',

    // Screen 19: Orders
    ordersTitle: 'My Orders',
    tabUpcoming: 'Upcoming',
    tabActive: 'Active',
    tabCompleted: 'Completed',
    tabCancelled: 'Cancelled',
    noOrdersInTab: 'No orders found in this category.',

    // Screen 20: Order Details
    orderDetailsTitle: 'Order Details',
    orderIdLabel: 'Order ID',
    partnerLabel: 'Assigned Partner',
    bookingTimeLabel: 'Booking Placed',
    arrivalTimeLabel: 'Partner Arrived',
    workStartTimeLabel: 'Work Commenced',
    completionTimeLabel: 'Completed At',
    paymentStatusLabel: 'Payment Status',
    statusTimelineTitle: 'Status History',
    reportIssueBtn: 'Report an Issue',
    helpBtn: 'Help',

    // Screen 21: Notifications
    notificationsTitle: 'Notifications',
    markAllRead: 'Mark all as read',
    noNotifications: 'No notifications at this time.',

    // Screen 22: Profile
    profileScreenTitle: 'My Profile',
    menuOrders: 'My Orders',
    menuNotifications: 'Notifications',
    menuHelp: 'Help & Support',
    menuLanguage: 'App Language (हिन्दी / English)',
    menuPrivacy: 'Privacy Policy',
    menuTerms: 'Terms of Service',
    menuRules: 'Service Rules & Code of Conduct',
    menuVersion: 'App Version',
    menuDeleteAccount: 'Delete My Account',
    menuLogout: 'Logout',
    deleteAccountConfirm: 'Are you sure you want to delete your DoNow account? All past orders and profile data will be permanently purged.',

    // Screen 23: Help & Support
    helpTitle: 'Help & Support',
    helpSub: 'We are here to help resolve any task, payment, or partner issue quickly.',
    selectIssueCategory: 'Select Issue Category',
    issueDetailsLabel: 'Describe your issue in detail',
    issueDetailsPlaceholder: 'Explain what went wrong or how our support team can assist you...',
    attachPhoto: 'Attach Photo / Evidence (Optional)',
    submitTicketBtn: 'SUBMIT SUPPORT TICKET',
    ticketCreatedTitle: 'Support Ticket Raised',
    ticketNumberLabel: 'Ticket ID',
    ticketSubtext: 'Our dedicated Indian support desk will contact you within 15 minutes.',

    // Screen 24: SOS
    sosTitle: 'Emergency Assistance',
    sosDisclaimer: 'Emergency services in India operate through 112. Use this only during genuine safety emergencies.',
    call112Btn: 'CALL 112 (POLICE & EMERGENCY)',
    call112Sub: 'Connect directly to National Emergency Response System',
    sendSosBtn: 'SEND SOS TO DONOW SAFETY DESK',
    sendSosSub: 'Broadcasts instant distress ping with live GPS to our 24/7 safety command centre',
    sosAlertActive: 'SOS Alert Active! Safety team and nearby authorities alerted.',

    // Additional helper keys
    bookingIdLabel: 'Booking ID',
    assignedPartnerLabel: 'Assigned Partner',
    supportBtn: 'Customer Support',
    profileNav: 'Profile',
    languageLabel: 'Language / भाषा',
    termsItem: 'Terms of Service',
    privacyItem: 'Privacy Policy',
    supportItem: 'Customer Support & FAQ',
    logoutItem: 'Log Out',
    sosSub: 'Emergency assistance available 24x7 during active work or anytime',
    triggerSosAlert: 'TRIGGER EMERGENCY SOS ALERT',
    policeHelpline: '112 National Emergency Helpline',
    safetyHelpline: 'DoNow 24x7 Safety Response Desk',
    supportTitle: 'Help & Support',
  },
  hi: {
    // Brand & General
    appName: 'DoNow',
    tagline: 'काम है? DoNow.',
    continue: 'आगे बढ़ें',
    submit: 'जमा करें',
    verify: 'सत्यापित करें',
    cancel: 'रद्द करें',
    back: 'पीछे जाएं',
    save: 'सहेजें',
    done: 'पूर्ण',
    close: 'बंद करें',
    min: 'मिनट',
    mins: 'मिनट',
    hr: 'घंटा',
    hrs: 'घंटे',
    rupee: '₹',

    // Screen 1: Splash
    splashSubtitle: 'घर और बाहर के कामों के लिए ऑन-डिमांड सहायक',

    // Screen 2: Permissions
    permissionTitle: 'अनुमति सेटअप (Permissions)',
    permissionDesc: 'DoNow को सुरक्षित और सटीक सेवा देने के लिए केवल आवश्यक अनुमतियों की आवश्यकता है।',
    permLocationTitle: 'स्थान की अनुमति (Location)',
    permLocationDesc: 'सही सेवा स्थल चुनने और पार्टनर के आगमन को ट्रैक करने के लिए आवश्यक है।',
    permNotifTitle: 'सूचनाएं (Notifications)',
    permNotifDesc: 'ऑर्डर अपडेट, पार्टनर स्वीकृति और समय की सूचना तुरंत पाने के लिए।',
    permCameraTitle: 'कैमरा (वैकल्पिक)',
    permCameraDesc: 'केवल काम की फोटो या दस्तावेज साझा करने के समय आवश्यक।',
    permMicTitle: 'माइक्रोफ़ोन (वैकल्पिक)',
    permMicDesc: 'भविष्य में बोलकर काम बताने (Voice notes) के लिए।',
    permAllow: 'अनुमति दें',
    permAllowed: 'स्वीकृत ✓',
    permGrantAll: 'लॉगिन के लिए आगे बढ़ें',

    // Screen 3: Login
    welcomeTitle: 'DoNow में आपका स्वागत है',
    welcomeSub: 'शुरू करने के लिए अपना 10 अंकों का मोबाइल नंबर दर्ज करें।',
    mobileNumberLabel: 'मोबाइल नंबर',
    mobilePlaceholder: '10 अंकों का मोबाइल नंबर दर्ज करें',
    loginDisclaimer: 'जारी रखकर, आप सत्यापन के लिए SMS और OTP प्राप्त करने के लिए सहमत हैं।',

    // Screen 4: OTP
    otpTitle: 'अपना मोबाइल नंबर सत्यापित करें',
    otpSub: '+91 पर भेजे गए 6 अंकों के सत्यापन कोड को दर्ज करें',
    resendOtp: 'OTP दोबारा भेजें',
    resendIn: 'OTP दोबारा भेजने का समय',
    otpHint: 'डेमो OTP: 123456 (या कोई भी 6 अंक)',

    // Screen 5: Create Profile
    profileTitle: 'प्रोफ़ाइल बनाएं',
    profileSub: 'अपना DoNow खाता सेटअप करने के लिए अपनी जानकारी दर्ज करें।',
    nameLabel: 'पूरा नाम',
    namePlaceholder: 'उदा. अमित वर्मा',
    verifiedBadge: 'सत्यापित',
    termsCheckbox: 'मैं DoNow के नियम व शर्तें, गोपनीयता नीति और सेवा नियमों से सहमत हूँ।',
    createAccountBtn: 'खाता बनाएं',
    termsAcceptedNote: 'शर्तें खाता बनाते समय स्वीकार की जाती हैं। बाद में बार-बार चेकबॉक्स नहीं आएगा।',

    // Screen 6: Home
    greeting: 'शुभ प्रभात',
    selectLocation: 'अपना स्थान चुनें',
    homeHeading: 'आपको क्या काम करवाना है?',
    writeTaskBtn: 'अपना काम लिखें',
    writeTaskSub: 'शब्दों में या बोलकर बताएं',
    selectServicesBtn: 'सेवाओं में से चुनें',
    selectServicesSub: '10 ऑन-डिमांड सहायता श्रेणियां',
    activePartnersNearby: '🟢 12 पार्टनर पास में सक्रिय हैं',
    activePartnersPrivacyNotice: 'बुकिंग से पहले केवल सक्रिय पार्टनर की संख्या दिखाई जाती है। गोपनीयता के लिए पार्टनर का नाम और पहचान सुरक्षित रखी जाती है।',
    upcomingOrderHeader: 'सक्रिय / आगामी ऑर्डर',
    viewDetails: 'विवरण देखें',
    homeTab: 'होम',
    ordersTab: 'ऑर्डर',
    notificationsTab: 'सूचनाएं',
    profileTab: 'प्रोफ़ाइल',

    // Screen 7: Write Task
    writeTaskTitle: 'आपको क्या काम करवाना है?',
    writeTaskPlaceholder: 'अपना काम यहाँ लिखें...\n\nउदाहरण: बर्थडे पार्टी में मेहमानों की व्यवस्था और देखरेख में मदद चाहिए।',
    voiceInputHint: 'बोलकर काम बताने के लिए टैप करें (डेमो)',
    taskLocationLabel: 'स्थान',
    taskDateLabel: 'तारीख',
    taskStartTimeLabel: 'शुरुआत का समय',
    taskDurationLabel: 'अनुमानित अवधि',

    // Screen 8: Service Selection
    servicesTitle: 'एक सेवा चुनें',
    servicesSub: 'प्रत्येक सेवा की न्यूनतम बिलिंग अवधि 30 मिनट है और वास्तविक समय का हिसाब होता है।',
    minChargeLabel: 'न्यूनतम शुल्क',
    startingAt: 'शुरुआत',

    // Screen 9: Task Details
    rateLabel: 'दर',
    minDurationRule: 'न्यूनतम बिलिंग अवधि: 30 मिनट',
    selectTaskOptions: 'आपको किस प्रकार की सहायता चाहिए?',
    additionalDetailsLabel: 'अतिरिक्त विवरण / विशेष निर्देश',
    additionalDetailsPlaceholder: 'पार्टनर के लिए कोई विशेष निर्देश या आवश्यकता यहाँ लिखें...',

    // Screen 10: Location
    locationTitle: 'सेवा का स्थान',
    useCurrentLocation: 'वर्तमान स्थान का उपयोग करें',
    searchLocationPlaceholder: 'भवन, क्षेत्र, लैंडमार्क खोजें...',
    adjustPinHint: 'सटीक मीटिंग स्थल के लिए मैप पर पिन को खिसकाएं',
    locationNameLabel: 'स्थान / स्थल का नाम',
    fullAddressLabel: 'पूरा पता',
    landmarkLabel: 'लैंडमार्क',
    instructionsLabel: 'पार्टनर के लिए निर्देश',
    confirmLocationBtn: 'स्थान की पुष्टि करें',

    // Screen 11: Booking Summary
    bookingSummaryTitle: 'बुकिंग सारांश',
    serviceSummary: 'सेवा',
    dateTimeSummary: 'तारीख और समय',
    durationSummary: 'अनुमानित अवधि',
    rateSummary: 'प्रति मिनट दर',
    estimatedAmountLabel: 'अनुमानित राशि',
    actualBillingNote: 'नोट: अंतिम बिलिंग काम के वास्तविक मिनटों पर होगी। न्यूनतम 30 मिनट लागू।',
    bookNowBtn: 'अभी बुक करें (BOOK NOW)',

    // Screen 12: Finding Partner
    findingPartnerTitle: 'पार्टनर ढूंढा जा रहा है...',
    findingPartnerSub: 'आपके सबसे नजदीकी योग्य और सक्रिय पार्टनर से संपर्क किया जा रहा है',
    searchRadius3km: '3 किमी के दायरे में खोज जारी है...',
    searchRadius5km: 'खोज का दायरा 5 किमी तक बढ़ाया जा रहा है...',
    searchRadius7km: 'खोज का दायरा 7 किमी तक बढ़ाया जा रहा है...',
    autoMatchingNote: 'नजदीक और कुशल पार्टनर्स को तुरंत सूचना भेजी जा रही है।',

    // Screen 13: Tip
    noPartnerAcceptedYet: 'अभी तक किसी पार्टनर ने स्वीकार नहीं किया है।',
    addTipPrompt: 'अपने ऑर्डर को अधिक आकर्षक बनाने के लिए टिप जोड़ें।',
    tipNote: 'टिप 100% पार्टनर को मिलती है। टिप पर DoNow का 15% कमीशन नहीं कटता।',
    noTip: 'कोई टिप नहीं',
    updateOrderBtn: 'ऑर्डर अपडेट करें',

    // Screen 14: Partner Accepted
    partnerFoundTitle: 'पार्टनर मिल गया ✓',
    partnerFoundSub: 'आपके DoNow पार्टनर ने ऑर्डर स्वीकार कर लिया है और वे आपके स्थान की ओर आ रहे हैं।',
    ratingBadge: 'रेटिंग',
    performanceBadge: 'प्रदर्शन',
    distanceBadge: 'दूरी',
    etaBadge: 'पहुंचने का समय',
    callPartner: 'कॉल करें',
    messagePartner: 'मैसेज करें',
    privacyMaskNotice: 'नंबर सुरक्षित रूप से मास्क किए गए हैं। व्यक्तिगत फोन नंबर कभी उजागर नहीं होते।',

    // Screen 15: Partner Arrived
    partnerArrivedTitle: 'पार्टनर पहुंच गए ✓',
    partnerArrivedSub: 'आपके बताए स्थान पर पहुंच चुके हैं।',
    arrivalDistanceNotice: '50 मीटर के दायरे में आगमन सत्यापित किया गया।',
    scheduledTimeLabel: 'निर्धारित समय',
    timerNoticeEarly: 'पार्टनर समय से पहले पहुंचे हैं। टाइमर निर्धारित समय (10:00 AM) से पहले शुरू नहीं होगा।',
    timerNoticeNormal: 'शुरू करने के लिए तैयार। ग्राहक को पूरी बुक की गई अवधि मिलती है।',
    sosButton: 'SOS / आपातकाल',

    // Screen 16: Work in Progress
    workInProgressTitle: 'काम जारी है (Work in Progress)',
    liveTimerLabel: 'सक्रिय काम का टाइमर',
    serviceOngoing: 'सेवा सुचारू रूप से चल रही है',

    // Screen 17: Work Completed
    workCompletedTitle: 'काम पूरा हुआ ✓',
    actualServiceTimeLabel: 'वास्तविक सेवा समय',
    serviceAmountLabel: 'सेवा राशि',
    customerTipLabel: 'ग्राहक टिप',
    finalAmountLabel: 'कुल अंतिम राशि',
    paymentMethodLabel: 'भुगतान का तरीका',
    cashPayment: 'पार्टनर को नकद (Cash)',
    upiPayment: 'UPI / QR स्कैन',
    paymentConfirmedBtn: 'भुगतान की पुष्टि करें',

    // Screen 18: Rate Partner
    rateTitle: 'अपने पार्टनर को रेटिंग दें',
    rateSub: 'के साथ आपका अनुभव कैसा रहा?',
    optionalReviewLabel: 'वैकल्पिक समीक्षा लिखें (समयबद्धता, शिष्टाचार, काम की गुणवत्ता)',
    reviewPlaceholder: 'अन्य DoNow ग्राहकों के लिए अपना अनुभव लिखें...',

    // Screen 19: Orders
    ordersTitle: 'मेरे ऑर्डर',
    tabUpcoming: 'आगामी',
    tabActive: 'सक्रिय',
    tabCompleted: 'पूर्ण',
    tabCancelled: 'रद्द किए गए',
    noOrdersInTab: 'इस श्रेणी में कोई ऑर्डर नहीं मिला।',

    // Screen 20: Order Details
    orderDetailsTitle: 'ऑर्डर का विवरण',
    orderIdLabel: 'ऑर्डर आईडी',
    partnerLabel: 'नियुक्त पार्टनर',
    bookingTimeLabel: 'बुकिंग का समय',
    arrivalTimeLabel: 'पार्टनर आगमन',
    workStartTimeLabel: 'काम शुरू होने का समय',
    completionTimeLabel: 'काम पूरा होने का समय',
    paymentStatusLabel: 'भुगतान स्थिति',
    statusTimelineTitle: 'ऑर्डर इतिहास',
    reportIssueBtn: 'समस्या की रिपोर्ट करें',
    helpBtn: 'सहायता',

    // Screen 21: Notifications
    notificationsTitle: 'सूचनाएं',
    markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
    noNotifications: 'इस समय कोई सूचना नहीं है।',

    // Screen 22: Profile
    profileScreenTitle: 'मेरी प्रोफ़ाइल',
    menuOrders: 'मेरे ऑर्डर',
    menuNotifications: 'सूचनाएं',
    menuHelp: 'सहायता और समर्थन',
    menuLanguage: 'ऐप की भाषा (हिन्दी / English)',
    menuPrivacy: 'गोपनीयता नीति',
    menuTerms: 'नियम व शर्तें',
    menuRules: 'सेवा नियम व आचार संहिता',
    menuVersion: 'ऐप संस्करण',
    menuDeleteAccount: 'मेरा खाता हटाएं',
    menuLogout: 'लॉगआउट',
    deleteAccountConfirm: 'क्या आप वाकई अपना DoNow खाता हटाना चाहते हैं? आपके सभी पुराने ऑर्डर और डेटा हमेशा के लिए हटा दिए जाएंगे।',

    // Screen 23: Help & Support
    helpTitle: 'सहायता और समर्थन',
    helpSub: 'हम किसी भी काम, भुगतान या पार्टनर समस्या को तुरंत हल करने के लिए यहाँ हैं।',
    selectIssueCategory: 'समस्या की श्रेणी चुनें',
    issueDetailsLabel: 'अपनी समस्या का विस्तार से वर्णन करें',
    issueDetailsPlaceholder: 'विस्तार से बताएं कि क्या समस्या हुई या हमारी टीम आपकी कैसे मदद कर सकती है...',
    attachPhoto: 'फोटो / प्रमाण संलग्न करें (वैकल्पिक)',
    submitTicketBtn: 'सपोर्ट टिकट सबमिट करें',
    ticketCreatedTitle: 'सपोर्ट टिकट दर्ज हो गया',
    ticketNumberLabel: 'टिकट आईडी',
    ticketSubtext: 'हमारी भारतीय सहायता टीम 15 मिनट के भीतर आपसे संपर्क करेगी।',

    // Screen 24: SOS
    sosTitle: 'आपातकालीन सहायता (Emergency SOS)',
    sosDisclaimer: 'भारत में आपातकालीन सेवाएं 112 पर संचालित होती हैं। इसका उपयोग केवल वास्तविक सुरक्षा आपातकाल में करें।',
    call112Btn: '112 पर कॉल करें (पुलिस एवं आपातकाल)',
    call112Sub: 'राष्ट्रीय आपातकालीन प्रतिक्रिया प्रणाली (NERS) से सीधे जुड़ें',
    sendSosBtn: 'DONOW सुरक्षा डेस्क को SOS भेजें',
    sendSosSub: 'हमारे 24/7 सुरक्षा कमांड केंद्र को लाइव GPS के साथ तत्काल संकट अलर्ट भेजता है',
    sosAlertActive: 'SOS अलर्ट सक्रिय! सुरक्षा टीम और निकटतम अधिकारियों को सूचित कर दिया गया है।',

    // Additional helper keys
    bookingIdLabel: 'बुकिंग आईडी',
    assignedPartnerLabel: 'आवंटित पार्टनर',
    supportBtn: 'ग्राहक सहायता',
    profileNav: 'प्रोफ़ाइल',
    languageLabel: 'भाषा / Language',
    termsItem: 'सेवा की शर्तें',
    privacyItem: 'गोपनीयता नीति',
    supportItem: 'ग्राहक सहायता एवं प्रश्नोत्तर',
    logoutItem: 'लॉग आउट',
    sosSub: 'सक्रिय कार्य या किसी भी समय 24x7 आपातकालीन सहायता उपलब्ध',
    triggerSosAlert: 'आपातकालीन SOS अलर्ट भेजें',
    policeHelpline: '112 राष्ट्रीय आपातकालीन हेल्पलाइन',
    safetyHelpline: 'DoNow 24x7 सुरक्षा प्रतिक्रिया डेस्क',
    supportTitle: 'सहायता और प्रश्नोत्तर',
  },
};

export type TranslationKey = keyof typeof translations.en;
