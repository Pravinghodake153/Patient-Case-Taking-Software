export interface AyushQuestionNode {
  id: string;
  dimension: 'prakriti_body' | 'prakriti_mind' | 'agni' | 'koshtha' | 'nidra' | 'bala' | 'dhatu_mala';
  titleEn: string;
  titleHi: string;
  titleSanskrit: string;
  descriptionEn: string;
  descriptionHi: string;
  options: {
    id: string;
    dosha: 'vata' | 'pitta' | 'kapha' | 'neutral';
    labelEn: string;
    labelHi: string;
    labelSanskrit: string;
    doshaImpact: { vata: number; pitta: number; kapha: number };
  }[];
}

export const AYUSH_PARIKSHA_QUESTIONS: AyushQuestionNode[] = [
  {
    id: 'ayush_body_frame',
    dimension: 'prakriti_body',
    titleSanskrit: 'शारीरिक गठन (Sharira Prakriti)',
    titleEn: 'Physical Body Frame & Skin Texture',
    titleHi: 'शारीरिक बनावट और त्वचा का स्वभाव',
    descriptionEn: 'Select the description that best matches your natural body build and skin characteristics.',
    descriptionHi: 'अपनी प्राकृतिक शारीरिक बनावट और त्वचा के प्रकार का चयन करें।',
    options: [
      {
        id: 'opt_vata_frame',
        dosha: 'vata',
        labelSanskrit: 'वात प्रधान (कृश, रुक्ष)',
        labelEn: 'Thin / Lean frame, dry skin, cracks easily, prominent veins',
        labelHi: 'पतला शरीर, रूखी त्वचा, जल्दी ठंड लगना',
        doshaImpact: { vata: 3, pitta: 0, kapha: 0 },
      },
      {
        id: 'opt_pitta_frame',
        dosha: 'pitta',
        labelSanskrit: 'पित्त प्रधान (मध्यम, तप्त)',
        labelEn: 'Medium athletic frame, warm/flushed skin, moles/freckles, sweats easily',
        labelHi: 'मध्यम बनावट, गर्म त्वचा, पसीना व गर्मी सहन न होना',
        doshaImpact: { vata: 0, pitta: 3, kapha: 0 },
      },
      {
        id: 'opt_kapha_frame',
        dosha: 'kapha',
        labelSanskrit: 'कफ प्रधान (स्थूल, स्निग्ध)',
        labelEn: 'Broad heavy frame, thick lustrous skin, gains weight easily, well-lubricated',
        labelHi: 'मजबूत/भारी शरीर, तैलीय चमकदार त्वचा, वजन जल्दी बढ़ना',
        doshaImpact: { vata: 0, pitta: 0, kapha: 3 },
      },
    ],
  },
  {
    id: 'ayush_agni_digestion',
    dimension: 'agni',
    titleSanskrit: 'अग्नि परीक्षा (Jatharagni / Digestive Power)',
    titleEn: 'Appetite & Digestive Fire (Agni)',
    titleHi: 'भूख और पाचन शक्ति का स्वभाव',
    descriptionEn: 'How does your digestive system behave across days?',
    descriptionHi: 'आपकी पाचन शक्ति और भूख कैसी रहती है?',
    options: [
      {
        id: 'opt_vishama_agni',
        dosha: 'vata',
        labelSanskrit: 'विषमाग्नि (अनियमित पाचन)',
        labelEn: 'Irregular appetite (sometimes very hungry, sometimes no appetite at all), frequent gas/bloating',
        labelHi: 'अनियमित भूख — कभी बहुत तेज, कभी बिल्कुल नहीं, पेट में गैस',
        doshaImpact: { vata: 3, pitta: 0, kapha: 0 },
      },
      {
        id: 'opt_tikshna_agni',
        dosha: 'pitta',
        labelSanskrit: 'तीक्ष्णाग्नि (अत्यधिक तीव्र भूख)',
        labelEn: 'Intense burning hunger, cannot tolerate delayed meals, frequent acidity & burning urine',
        labelHi: 'तीव्र भूख — भोजन में देरी सहन न होना, सीने में जलन व खट्टी डकारें',
        doshaImpact: { vata: 0, pitta: 3, kapha: 0 },
      },
      {
        id: 'opt_manda_agni',
        dosha: 'kapha',
        labelSanskrit: 'मन्दाग्नि (धीमा पाचन)',
        labelEn: 'Low or sluggish appetite, food takes hours to digest, heaviness in stomach after light meals',
        labelHi: 'धीमा पाचन — कम भूख, खाना खाने के बाद पेट में भारीपन व आलस्य',
        doshaImpact: { vata: 0, pitta: 0, kapha: 3 },
      },
      {
        id: 'opt_sama_agni',
        dosha: 'neutral',
        labelSanskrit: 'समाग्नि (संतुलित पाचन)',
        labelEn: 'Balanced regular appetite at meal times, digests food comfortably without discomfort',
        labelHi: 'संतुलित भूख — समय पर भूख लगना और बिना किसी परेशानी के सुपाच्य रहना',
        doshaImpact: { vata: 1, pitta: 1, kapha: 1 },
      },
    ],
  },
  {
    id: 'ayush_koshtha_bowels',
    dimension: 'koshtha',
    titleSanskrit: 'कोष्ठ परीक्षा (Bowel Habit & Evacuation)',
    titleEn: 'Bowel Habit & Tendency (Koshtha)',
    titleHi: 'शौच प्रवृत्ति और पेट साफ होने का स्वभाव',
    descriptionEn: 'How easily do you evacuate stools in the morning?',
    descriptionHi: 'सुबह पेट साफ होने की प्रवृत्ति कैसी है?',
    options: [
      {
        id: 'opt_krura_koshtha',
        dosha: 'vata',
        labelSanskrit: 'क्रूर कोष्ठ (कड़ा/कब्जियत)',
        labelEn: 'Hard dry stools, tendency towards chronic constipation, requires laxatives or warm fluids',
        labelHi: 'कड़ा मल, कब्ज की शिकायत, पेट साफ होने में कठिनाई',
        doshaImpact: { vata: 3, pitta: 0, kapha: 0 },
      },
      {
        id: 'opt_mrudu_koshtha',
        dosha: 'pitta',
        labelSanskrit: 'मृदु कोष्ठ (नरम/ढीला मल)',
        labelEn: 'Soft/loose stools, multiple evacuations per day, sensitive to milk or mild herbs',
        labelHi: 'नरम या ढीला मल, दिन में कई बार जाना, दूध पीने से भी पेट ढीला होना',
        doshaImpact: { vata: 0, pitta: 3, kapha: 0 },
      },
      {
        id: 'opt_madhyama_koshtha',
        dosha: 'kapha',
        labelSanskrit: 'मध्यम कोष्ठ (नियमित/संतुलित)',
        labelEn: 'Normal formed stools once or twice daily with effortless smooth evacuation',
        labelHi: 'प्रतिदिन एक या दो बार बिना परेशानी के नियमित रूप से पेट साफ होना',
        doshaImpact: { vata: 0, pitta: 0, kapha: 3 },
      },
    ],
  },
  {
    id: 'ayush_nidra_sleep',
    dimension: 'nidra',
    titleSanskrit: 'निद्रा परीक्षा (Sleep Architecture & Rest)',
    titleEn: 'Sleep Quality & Dreams (Nidra)',
    titleHi: 'नींद की गुणवत्ता और स्वप्न',
    descriptionEn: 'How is your nocturnal sleep pattern?',
    descriptionHi: 'आपकी रात की नींद कैसी रहती है?',
    options: [
      {
        id: 'opt_alpa_nidra',
        dosha: 'vata',
        labelSanskrit: 'अल्पनिद्रा / खण्डित (विचलित)',
        labelEn: 'Light, interrupted sleep (4–5 hours), waking up frequently with active wandering thoughts',
        labelHi: 'कच्ची या टूटी-फूटी नींद, मन में निरंतर विचार चलना',
        doshaImpact: { vata: 3, pitta: 0, kapha: 0 },
      },
      {
        id: 'opt_pitta_nidra',
        dosha: 'pitta',
        labelSanskrit: 'मध्यम / ज्वलंत स्वप्न',
        labelEn: 'Moderate sleep (6 hours), easily awakened if room is warm, vivid/intense colorful dreams',
        labelHi: 'मध्यम नींद (६ घंटे), गर्मी में आंख खुलना, रंगीन या रोमांचक स्वप्न',
        doshaImpact: { vata: 0, pitta: 3, kapha: 0 },
      },
      {
        id: 'opt_ati_nidra',
        dosha: 'kapha',
        labelSanskrit: 'अतिनिद्रा / प्रगाढ़ (गहरी नींद)',
        labelEn: 'Deep, sound heavy sleep (>8 hours), difficult to wake up in morning, feeling groggy',
        labelHi: 'गहरी व लंबी नींद (८+ घंटे), सुबह उठने में भारीपन व सुस्ती',
        doshaImpact: { vata: 0, pitta: 0, kapha: 3 },
      },
    ],
  },
  {
    id: 'ayush_bala_strength',
    dimension: 'bala',
    titleSanskrit: 'बल व सत्व परीक्षा (Physical Endurance & Mental Tone)',
    titleEn: 'Physical Stamina & Emotional Temperament',
    titleHi: 'शारीरिक सहनशक्ति और मानसिक स्वभाव',
    descriptionEn: 'Select your energy endurance and response to stress.',
    descriptionHi: 'थकान और तनाव के प्रति आपका व्यवहार कैसा रहता है?',
    options: [
      {
        id: 'opt_vata_bala',
        dosha: 'vata',
        labelSanskrit: 'अवर बल / चंचल सत्व',
        labelEn: 'Quick bursts of energy but tires very fast; anxious, prone to worry and fast speech',
        labelHi: 'जल्दी थक जाना, चिंता या घबराहट की प्रवृत्ति, तेजी से बोलना',
        doshaImpact: { vata: 3, pitta: 0, kapha: 0 },
      },
      {
        id: 'opt_pitta_bala',
        dosha: 'pitta',
        labelSanskrit: 'मध्यम बल / तीक्ष्ण सत्व',
        labelEn: 'Good determined drive; impatient or irritated quickly under stress, goal-oriented',
        labelHi: 'मध्यम शक्ति, तनाव में जल्दी गुस्सा या चिड़चिड़ापन आना, महत्वाकांक्षी',
        doshaImpact: { vata: 0, pitta: 3, kapha: 0 },
      },
      {
        id: 'opt_kapha_bala',
        dosha: 'kapha',
        labelSanskrit: 'प्रवर बल / स्थिर सत्व',
        labelEn: 'High steady endurance, slow to fatigue; calm, patient, forgiving, stable mind',
        labelHi: 'उत्तम शारीरिक शक्ति, कम थकान, शांत, धैर्यवान व स्थिर स्वभाव',
        doshaImpact: { vata: 0, pitta: 0, kapha: 3 },
      },
    ],
  },
];
