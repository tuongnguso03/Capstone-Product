// src/translations.js

export const translations = {
  en: {
    // App specific
    appTitle: 'Dictionary & Translation',
    tabTranslator: 'Ba to En',
    tabRevTranslator: 'En to Ba',
    tabDictionary: 'Dictionary',
    appIconAlt: 'App Icon',
    langButtonEN: 'English',
    langButtonVI: 'Tiếng Việt',

    // Translator (Ba-En) specific
    translatorHeadingBaEn: 'Translate Bahnar to English',
    translatorPlaceholder: 'Enter Bahnar text to translate...',
    translatorButton: 'Translate',
    translatorErrorPrefix: 'Translation failed: ',
    translationResultLabel: 'English translation:',
    rateThisTranslation: "Rate:",
    submitReviewButton: "Submit",
    reviewSubmittedMessage: "Thank you for your review (っ.❛ ᴗ ❛.)っ",

    // Reverse Translator (En-Ba) specific
    revTranslatorHeadingEnBa: 'Translate English to Bahnar',
    revTranslatorPlaceholder: 'Enter English text to translate...',
    // translatorButton can be reused for its button text
    // translatorErrorPrefix can be reused
    revTranslationResultLabel: 'Bahnar translation:',

    // Dictionary specific
    dictionaryLookupTitle: 'Dictionary Lookup',
    dictionarySearchPlaceholder: "Search (e.g., 'bok', 'hla', 'error')",
    dictionarySearchButton: 'Search',
    dictionaryMainTitle: 'Dictionary',
    dictionaryFetchError: 'Failed to fetch dictionary entries.',
    dictionaryHeaderBahnar: 'Bahnar Word',
    dictionaryHeaderEnglish: 'English Meaning',
    dictionaryNoResults: 'No entries found, or no more entries.',
    dictionaryPageLabel: 'Page',
    dictionaryPrevButton: 'Previous',
    dictionaryNextButton: 'Next',
  },
  vi: {
    // App specific
    appTitle: 'Từ điển & Dịch máy',
    tabTranslator: 'Dịch Ba-En',
    tabRevTranslator: 'Dịch En-Ba',
    tabDictionary: 'Từ điển',
    appIconAlt: 'Biểu tượng ứng dụng',
    langButtonEN: 'English',
    langButtonVI: 'Tiếng Việt',

    // Translator (Ba-En) specific
    translatorHeadingBaEn: 'Dịch tiếng Bahnar sang tiếng Anh',
    translatorPlaceholder: 'Nhập nội dung tiếng Bahnar cần dịch...',
    translatorButton: 'Dịch',
    translatorErrorPrefix: 'Dịch thất bại: ',
    translationResultLabel: 'Bản dịch tiếng Anh:',
    rateThisTranslation: "Đánh giá:",
    submitReviewButton: "Gửi đánh giá",
    reviewSubmittedMessage: "Cảm ơn đánh giá của bạn (っ.❛ ᴗ ❛.)っ",

    // Reverse Translator (En-Ba) specific
    revTranslatorHeadingEnBa: 'Dịch tiếng Anh sang tiếng Bahnar',
    revTranslatorPlaceholder: 'Nhập nội dung tiếng Anh cần dịch...',
    revTranslationResultLabel: 'Bản dịch tiếng Bahnar:',

    // Dictionary specific
    dictionaryLookupTitle: 'Tra cứu Từ điển',
    dictionarySearchPlaceholder: "Tìm kiếm (ví dụ: 'bok', 'hla', 'lỗi')",
    dictionarySearchButton: 'Tìm kiếm',
    dictionaryMainTitle: 'Từ điển',
    dictionaryFetchError: 'Không thể tải các mục từ điển.',
    dictionaryHeaderBahnar: 'Từ gốc Bahnar',
    dictionaryHeaderEnglish: 'Nghĩa tiếng Anh',
    dictionaryNoResults: 'Không tìm thấy mục nào, hoặc đã hết kết quả.',
    dictionaryPageLabel: 'Trang',
    dictionaryPrevButton: 'Trước',
    dictionaryNextButton: 'Tiếp',
  }
  // Add other languages here following the same structure
};