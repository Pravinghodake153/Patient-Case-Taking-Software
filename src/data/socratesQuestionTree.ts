export interface QuestionOption {
  id: string;
  label: string;
  labelHi: string;
  icon?: string;
  isRedFlagTrigger?: boolean;
  triggersFollowUp?: string; // Next question id override
  categoryValue?: string;
}

export interface ClinicalQuestion {
  id: string;
  category: 'chief_complaint' | 'site' | 'onset' | 'character' | 'radiation' | 'associations' | 'time_course' | 'exacerbating' | 'severity' | 'past_history';
  titleEn: string;
  titleHi: string;
  audioPromptEn: string;
  audioPromptHi: string;
  options: QuestionOption[];
  allowMultiple?: boolean;
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    minLabel: string;
    maxLabel: string;
  };
  nextDefaultQuestionId?: string;
}

export const CHIEF_COMPLAINT_QUESTION: ClinicalQuestion = {
  id: 'q_chief_complaint',
  category: 'chief_complaint',
  titleEn: 'What is the primary health problem bringing you to the hospital today?',
  titleHi: 'आज आपको अस्पताल किस मुख्य समस्या या तकलीफ़ के कारण आना पड़ा है?',
  audioPromptEn: 'Please tell or tap your main health concern today.',
  audioPromptHi: 'कृपया आज की अपनी मुख्य स्वास्थ्य समस्या बताएं या नीचे चुनें।',
  options: [
    {
      id: 'cc_chest_pain',
      label: 'Chest Pain / Discomfort',
      labelHi: 'सीने में दर्द या भारीपन',
      icon: 'HeartPulse',
      triggersFollowUp: 'q_chest_site',
      categoryValue: 'Chest Pain',
    },
    {
      id: 'cc_fever_cough',
      label: 'Fever, Chills & Cough',
      labelHi: 'बुखार, ठंड लगना और खांसी',
      icon: 'Thermometer',
      triggersFollowUp: 'q_fever_duration',
      categoryValue: 'Fever and Cough',
    },
    {
      id: 'cc_joint_pain',
      label: 'Joint Pain & Stiffness (संधिशूल)',
      labelHi: 'जोड़ों में दर्द व जकड़न (गठिया)',
      icon: 'Activity',
      triggersFollowUp: 'q_joint_location',
      categoryValue: 'Joint Pain',
    },
    {
      id: 'cc_abdomen_pain',
      label: 'Stomach Ache & Digestion issues (अम्लपित्त)',
      labelHi: 'पेट दर्द, गैस व अपच',
      icon: 'Flame',
      triggersFollowUp: 'q_abdomen_location',
      categoryValue: 'Abdominal Pain & Dyspepsia',
    },
    {
      id: 'cc_diabetes_followup',
      label: 'Diabetes / Blood Pressure Checkup',
      labelHi: 'शुगर (डायबिटीज़) या बीपी जांच',
      icon: 'Droplet',
      triggersFollowUp: 'q_chronic_duration',
      categoryValue: 'Chronic Disease Routine Intake',
    },
    {
      id: 'cc_skin_allergy',
      label: 'Skin Rash / Itching (त्वचा रोग)',
      labelHi: 'त्वचा में खुजली, चकत्ते या दाने',
      icon: 'Sparkles',
      triggersFollowUp: 'q_skin_onset',
      categoryValue: 'Dermatological Rash',
    },
  ],
};

export const CLINICAL_QUESTION_DATABASE: Record<string, ClinicalQuestion> = {
  // === CHEST PAIN TREE (SOCRATES) ===
  q_chest_site: {
    id: 'q_chest_site',
    category: 'site',
    titleEn: 'Where exactly in your chest do you feel the pain or pressure?',
    titleHi: 'सीने में दर्द या दबाव ठीक किस हिस्से में महसूस हो रहा है?',
    audioPromptEn: 'Point out or select the exact location of chest discomfort.',
    audioPromptHi: 'सीने के दर्द का स्थान चुनें।',
    options: [
      { id: 'site_center', label: 'Center of Chest (Substernal)', labelHi: 'सीने के बिल्कुल बीच में', categoryValue: 'Substernal' },
      { id: 'site_left', label: 'Left side of Chest', labelHi: 'सीने के बाईं तरफ', categoryValue: 'Left precordial' },
      { id: 'site_right', label: 'Right side of Chest', labelHi: 'सीने के दाईं तरफ', categoryValue: 'Right chest wall' },
      { id: 'site_upper_epigastric', label: 'Upper Stomach / Below Ribs', labelHi: 'पेट के ऊपरी भाग में', categoryValue: 'Epigastric' },
    ],
    nextDefaultQuestionId: 'q_chest_onset',
  },
  q_chest_onset: {
    id: 'q_chest_onset',
    category: 'onset',
    titleEn: 'How did the pain start and how long have you had it?',
    titleHi: 'यह दर्द कैसे शुरू हुआ और कितने समय से है?',
    audioPromptEn: 'How sudden was the onset of this pain?',
    audioPromptHi: 'यह दर्द अचानक शुरू हुआ या धीरे-धीरे?',
    options: [
      { id: 'onset_sudden_rest', label: 'Suddenly while resting (Past 1–2 hours)', labelHi: 'आराम करते हुए अचानक (1–2 घंटे पहले)', isRedFlagTrigger: true, categoryValue: 'Sudden at rest (<2h)' },
      { id: 'onset_exertion', label: 'During physical exertion / walking upstairs', labelHi: 'चलने या सीढ़ियां चढ़ते समय', categoryValue: 'Exertional' },
      { id: 'onset_gradual_days', label: 'Gradually over several days', labelHi: 'कई दिनों से धीरे-धीरे बढ़ रहा है', categoryValue: 'Gradual onset' },
      { id: 'onset_after_meals', label: 'After eating heavy / spicy food', labelHi: 'मसालेदार खाना खाने के बाद', categoryValue: 'Postprandial' },
    ],
    nextDefaultQuestionId: 'q_chest_character',
  },
  q_chest_character: {
    id: 'q_chest_character',
    category: 'character',
    titleEn: 'What does the pain feel like?',
    titleHi: 'दर्द का प्रकार कैसा है? भारीपन, जलन या चुभन?',
    audioPromptEn: 'Describe the sensation of the pain.',
    audioPromptHi: 'दर्द किस तरह का महसूस होता है?',
    options: [
      { id: 'char_crushing', label: 'Heavy pressure / Crushing weight on chest', labelHi: 'भारी दबाव जैसे कोई भारी वजन रखा हो', isRedFlagTrigger: true, categoryValue: 'Crushing heaviness' },
      { id: 'char_burning', label: 'Burning sensation (Heartburn / acidity)', labelHi: 'सीने में जलन या खट्टी डकारें', categoryValue: 'Burning retrosternal' },
      { id: 'char_sharp_breath', label: 'Sharp stabbing pain when taking deep breaths', labelHi: 'गहरी सांस लेने पर तेज चुभन', categoryValue: 'Pleuritic stabbing' },
      { id: 'char_aching', label: 'Dull continuous ache', labelHi: 'धीमा-धीमा लगातार दर्द', categoryValue: 'Dull ache' },
    ],
    nextDefaultQuestionId: 'q_chest_radiation',
  },
  q_chest_radiation: {
    id: 'q_chest_radiation',
    category: 'radiation',
    titleEn: 'Does the pain spread (radiate) anywhere else in your body?',
    titleHi: 'क्या यह दर्द शरीर के किसी अन्य हिस्से की तरफ फैलता है?',
    audioPromptEn: 'Does the pain travel to your arm, jaw, neck, or back?',
    audioPromptHi: 'क्या दर्द बाएं हाथ, जबड़े या पीठ में जा रहा है?',
    options: [
      { id: 'rad_left_arm_jaw', label: 'Yes, spreads to Left Arm, Shoulder or Jaw', labelHi: 'हां, बाएं हाथ, कंधे या जबड़े में फैलता है', isRedFlagTrigger: true, categoryValue: 'Radiates to left arm and jaw' },
      { id: 'rad_back', label: 'Spreads straight through to Mid-Back', labelHi: 'सीधे पीठ के बीच में जाता है', categoryValue: 'Radiates to interscapular back' },
      { id: 'rad_throat', label: 'Spreads upwards to Throat / Neck', labelHi: 'गले की तरफ ऊपर चढ़ता है', categoryValue: 'Throat tightness' },
      { id: 'rad_none', label: 'No, stays strictly localized in one spot', labelHi: 'नहीं, केवल एक ही जगह रहता है', categoryValue: 'Localized, non-radiating' },
    ],
    nextDefaultQuestionId: 'q_chest_associations',
  },
  q_chest_associations: {
    id: 'q_chest_associations',
    category: 'associations',
    titleEn: 'Are you experiencing any other associated symptoms?',
    titleHi: 'क्या आपको इसके साथ इनमें से कोई अन्य लक्षण भी हैं?',
    audioPromptEn: 'Select any accompanying symptoms like sweating or shortness of breath.',
    audioPromptHi: 'पसीना, सांस फूलना या चक्कर आने जैसे लक्षण चुनें।',
    allowMultiple: true,
    options: [
      { id: 'assoc_diaphoresis', label: 'Profuse cold sweating (ठंडा पसीना)', labelHi: 'ठंडा पसीना छूटना व घबराहट', isRedFlagTrigger: true, categoryValue: 'Diaphoresis' },
      { id: 'assoc_dyspnea', label: 'Shortness of breath / Gasping for air', labelHi: 'सांस फूलना या सांस लेने में परेशानी', isRedFlagTrigger: true, categoryValue: 'Dyspnea on rest' },
      { id: 'assoc_nausea', label: 'Nausea or vomiting sensation', labelHi: 'जी मिचलाना या उल्टी की इच्छा', categoryValue: 'Nausea' },
      { id: 'assoc_palpitations', label: 'Rapid racing heartbeats (Palpitations)', labelHi: 'दिल की धड़कन बहुत तेज चलना', categoryValue: 'Palpitations' },
      { id: 'assoc_none', label: 'None of the above', labelHi: 'इनमें से कोई नहीं', categoryValue: 'No associated autonomic symptoms' },
    ],
    nextDefaultQuestionId: 'q_severity_slider',
  },

  // === FEVER & COUGH TREE ===
  q_fever_duration: {
    id: 'q_fever_duration',
    category: 'onset',
    titleEn: 'How many days have you had the fever?',
    titleHi: 'आपको कितने दिनों से बुखार आ रहा है?',
    audioPromptEn: 'How long has the fever been present?',
    audioPromptHi: 'बुखार कितने दिनों से है?',
    options: [
      { id: 'fever_1_3_days', label: '1 to 3 days (Acute)', labelHi: '1 से 3 दिन (अचानक आया)', categoryValue: '1-3 days duration' },
      { id: 'fever_4_7_days', label: '4 to 7 days', labelHi: '4 से 7 दिन', categoryValue: '4-7 days duration' },
      { id: 'fever_over_1_week', label: 'More than 2 weeks (Prolonged / Pyrexia)', labelHi: '2 सप्ताह से अधिक समय से', categoryValue: '>2 weeks prolonged' },
    ],
    nextDefaultQuestionId: 'q_fever_pattern',
  },
  q_fever_pattern: {
    id: 'q_fever_pattern',
    category: 'character',
    titleEn: 'What is the pattern of the fever and chills?',
    titleHi: 'बुखार किस समय और किस प्रकार आता है?',
    audioPromptEn: 'Does the fever come with shivering chills or evening spikes?',
    audioPromptHi: 'क्या बुखार ठंड लगकर या शाम को तेज आता है?',
    options: [
      { id: 'pat_rigors_chills', label: 'High fever with severe shivering/chills (ठंड लगकर)', labelHi: 'कंपकंपी और ठंड लगकर तेज बुखार', categoryValue: 'High grade with rigors' },
      { id: 'pat_evening_rise', label: 'Low grade in morning, rises every evening', labelHi: 'शाम के समय बुखार तेज होना', categoryValue: 'Evening rise of temperature' },
      { id: 'pat_continuous', label: 'Continuous continuous fever throughout day and night', labelHi: 'दिन-रात लगातार बना रहता है', categoryValue: 'Continuous continuous' },
    ],
    nextDefaultQuestionId: 'q_fever_cough_type',
  },
  q_fever_cough_type: {
    id: 'q_fever_cough_type',
    category: 'associations',
    titleEn: 'Do you have a cough or phlegm production?',
    titleHi: 'क्या आपको खांसी या कफ/बलगम आ रहा है?',
    audioPromptEn: 'Tell us if your cough is dry or bringing up sputum.',
    audioPromptHi: 'क्या सूखी खांसी है या बलगम वाली?',
    options: [
      { id: 'cough_dry', label: 'Dry irritating cough (सूखी खांसी)', labelHi: 'सूखी खांसी बिना बलगम के', categoryValue: 'Dry non-productive cough' },
      { id: 'cough_yellow_phlegm', label: 'Productive cough with yellow/green sputum', labelHi: 'पीला या गाढ़ा बलगम आना', categoryValue: 'Productive purulent sputum' },
      { id: 'cough_blood_hemoptysis', label: 'Blood streaks in sputum (रक्त मिश्रित)', labelHi: 'बलगम में खून के अंश आना', isRedFlagTrigger: true, categoryValue: 'Hemoptysis' },
      { id: 'cough_none', label: 'No cough, only body ache & headache', labelHi: 'खांसी नहीं है, केवल बदन दर्द व सिरदर्द', categoryValue: 'No cough, myalgia predominant' },
    ],
    nextDefaultQuestionId: 'q_severity_slider',
  },

  // === JOINT PAIN TREE ===
  q_joint_location: {
    id: 'q_joint_location',
    category: 'site',
    titleEn: 'Which joints are primarily painful or swollen?',
    titleHi: 'मुख्य रूप से कौन से जोड़ों में दर्द या सूजन है?',
    audioPromptEn: 'Select the joints affected.',
    audioPromptHi: 'प्रभावित जोड़ों का चयन करें।',
    allowMultiple: true,
    options: [
      { id: 'joint_knees', label: 'Both Knees (जानु संधि / Osteoarthritis)', labelHi: 'दोनों घुटनों में', categoryValue: 'Bilateral knee joints' },
      { id: 'joint_small_hands', label: 'Small joints of Fingers & Wrists (Amavata)', labelHi: 'हाथों की उंगलियों और कलाई के छोटे जोड़', categoryValue: 'Bilateral MCP and PIP joints' },
      { id: 'joint_lower_back', label: 'Lower Back & Hips (कटीशूल)', labelHi: 'कमर का निचला हिस्सा व कूल्हे', categoryValue: 'Lumbar spine & sacroiliac' },
      { id: 'joint_big_toe', label: 'Sudden severe big toe pain (Vatarakta / Gout)', labelHi: 'पैर के अंगूठे में अचानक तेज दर्द', categoryValue: 'First MTP joint (Gouty)' },
    ],
    nextDefaultQuestionId: 'q_joint_stiffness',
  },
  q_joint_stiffness: {
    id: 'q_joint_stiffness',
    category: 'character',
    titleEn: 'Do you experience morning stiffness in your joints?',
    titleHi: 'क्या सुबह उठने पर जोड़ों में जकड़न महसूस होती है?',
    audioPromptEn: 'How long does morning stiffness last?',
    audioPromptHi: 'सुबह की जकड़न कितनी देर रहती है?',
    options: [
      { id: 'stiff_over_1_hr', label: 'Yes, severe stiffness lasting > 45–60 minutes', labelHi: 'हां, 45-60 मिनट से अधिक समय तक जकड़न रहती है', categoryValue: 'Prolonged morning stiffness >1h (Inflammatory)' },
      { id: 'stiff_short', label: 'Mild stiffness (< 15 mins) that improves quickly', labelHi: 'हल्की जकड़न जो 10-15 मिनट में ठीक हो जाती है', categoryValue: 'Brief stiffness <15min (Mechanical)' },
      { id: 'stiff_worse_evening', label: 'Pain gets worse towards evening after work', labelHi: 'शाम को काम करने के बाद दर्द बढ़ता है', categoryValue: 'Exertional evening worsening' },
    ],
    nextDefaultQuestionId: 'q_severity_slider',
  },

  // === ABDOMINAL & GI TREE ===
  q_abdomen_location: {
    id: 'q_abdomen_location',
    category: 'site',
    titleEn: 'Where is the stomach pain located and when is it worst?',
    titleHi: 'पेट दर्द किस स्थान पर है और कब अधिक होता है?',
    audioPromptEn: 'Select abdominal pain location and relationship to food.',
    audioPromptHi: 'पेट दर्द का स्थान चुनें।',
    options: [
      { id: 'ab_upper_burn', label: 'Upper center burning relieved or triggered by food', labelHi: 'ऊपरी पेट में जलन / खाली पेट दर्द (अम्लपित्त)', categoryValue: 'Epigastric burning / dyspepsia' },
      { id: 'ab_right_upper', label: 'Upper right side pain under ribs after oily meals', labelHi: 'दाहिनी पसली के नीचे तेज दर्द (पित्ताशय)', categoryValue: 'Right hypochondriac biliary colic' },
      { id: 'ab_lower_right', label: 'Severe sharp pain in lower right abdomen', labelHi: 'पेट के निचले दाहिने हिस्से में अचानक तेज दर्द', isRedFlagTrigger: true, categoryValue: 'Right iliac fossa tenderness' },
      { id: 'ab_cramps_bloat', label: 'Lower abdomen cramping relieved after passing stools', labelHi: 'पेट में मरोड़ और गैस जो शौच के बाद ठीक हो', categoryValue: 'Lower abdominal cramping / IBS' },
    ],
    nextDefaultQuestionId: 'q_severity_slider',
  },

  // === CHRONIC FOLLOWUP ===
  q_chronic_duration: {
    id: 'q_chronic_duration',
    category: 'onset',
    titleEn: 'What chronic conditions are you monitoring today?',
    titleHi: 'आज आप किन पुरानी बीमारियों की नियमित जांच करा रहे हैं?',
    audioPromptEn: 'Select your existing conditions.',
    audioPromptHi: 'अपनी मौजूदा बीमारियां चुनें।',
    allowMultiple: true,
    options: [
      { id: 'chr_diabetes', label: 'Type 2 Diabetes Mellitus (मधुमेह)', labelHi: 'डायबिटीज़ (मधुमेह)', categoryValue: 'T2DM' },
      { id: 'chr_hypertension', label: 'High Blood Pressure (उच्च रक्तचाप)', labelHi: 'हाई ब्लड प्रेशर (उच्च रक्तचाप)', categoryValue: 'Hypertension' },
      { id: 'chr_thyroid', label: 'Hypothyroidism (थायरॉइड)', labelHi: 'थायरॉइड की समस्या', categoryValue: 'Hypothyroidism' },
      { id: 'chr_cholesterol', label: 'High Cholesterol / Dyslipidemia', labelHi: 'कोलेस्ट्रॉल का बढ़ना', categoryValue: 'Dyslipidemia' },
    ],
    nextDefaultQuestionId: 'q_severity_slider',
  },

  // === SKIN ONSET ===
  q_skin_onset: {
    id: 'q_skin_onset',
    category: 'onset',
    titleEn: 'Where is the skin rash and does it itch intensely at night?',
    titleHi: 'त्वचा पर दाने कहां हैं और क्या रात में खुजली अधिक होती है?',
    audioPromptEn: 'Select skin symptoms.',
    audioPromptHi: 'त्वचा के लक्षण चुनें।',
    options: [
      { id: 'skin_itch_night', label: 'Intense itching in finger webs, worse at night', labelHi: 'उंगलियों के बीच और रात में तेज खुजली', categoryValue: 'Nocturnal pruritus / Scabies suspect' },
      { id: 'skin_dry_scaling', label: 'Red dry patches with silvery scaling (Psoriasis)', labelHi: 'लाल सूखे चकत्ते जिन पर सफेद पपड़ी जमे', categoryValue: 'Plaque scaling / Psoriasis suspect' },
      { id: 'skin_ring_fungal', label: 'Circular itchy rings with clear centers (दाद/Dadru)', labelHi: 'गोल छल्लेदार दाद', categoryValue: 'Tinea corporis / Dadru' },
    ],
    nextDefaultQuestionId: 'q_severity_slider',
  },

  // === SEVERITY SLIDER (Universal) ===
  q_severity_slider: {
    id: 'q_severity_slider',
    category: 'severity',
    titleEn: 'On a scale of 1 to 10, how severe is your pain or discomfort right now?',
    titleHi: '1 से 10 के पैमाने पर, अभी आपकी तकलीफ़ या दर्द कितना गंभीर है?',
    audioPromptEn: 'Rate your symptom severity from 1 mild to 10 severe.',
    audioPromptHi: '1 से 10 के पैमाने पर अपना दर्द स्तर चुनें।',
    options: [
      { id: 'sev_mild_1_3', label: '1 - 3: Mild (Completely bearable)', labelHi: '1 - 3: हल्का (सहन करने योग्य)', categoryValue: 'Mild (1-3/10)' },
      { id: 'sev_mod_4_6', label: '4 - 6: Moderate (Interferes with daily tasks)', labelHi: '4 - 6: मध्यम (कामकाज में बाधा)', categoryValue: 'Moderate (4-6/10)' },
      { id: 'sev_sev_7_8', label: '7 - 8: Severe (Hard to concentrate/sleep)', labelHi: '7 - 8: तीव्र दर्द (सोना या बैठना मुश्किल)', categoryValue: 'Severe (7-8/10)' },
      { id: 'sev_extreme_9_10', label: '9 - 10: Unbearable / Agonizing Pain', labelHi: '9 - 10: असहनीय एवं अत्यधिक तीव्र दर्द', isRedFlagTrigger: true, categoryValue: 'Extreme agonizing (9-10/10)' },
    ],
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      minLabel: '1 (Mild / हल्का)',
      maxLabel: '10 (Worst Possible / असहनीय)',
    },
  },
};
