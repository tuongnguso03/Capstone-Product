// src/translations.js

export const translations = {
  en: {
    // App specific
    appTitle: 'Dictionary & Translation',
    tabTranslator: 'Ba to En',
    tabRevTranslator: 'En to Ba',
    tabDictionary: 'Dictionary',
    appIconAlt: 'App Icon',
    tabAboutUs: 'About Us', // <-- Add this
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

    aboutTitle: 'About Our Application',
    aboutDescription: 'This application is born from a project addressing the absence of a publicly available machine translation (MT) system for the endangered Bahnar-English language pair. We leveraged Neural Machine Translation (NMT) to create a tool that supports language preservation, cultural revitalization, and greater access to information for the Bahnar community',
    aboutTeamTitle: 'About the Developer',
    aboutTeamDescription: 'This application was created by a group of VinUniversity students.',
    aboutContactTitle: 'Contact Us',
    aboutContactEmail: 'Email: contact@example.com',
    aboutContactDate: 'Current Time in Hanoi: '
  },
  vi: {
    // App specific
    appTitle: 'Từ điển & Dịch máy',
    tabTranslator: 'Dịch Ba-En',
    tabRevTranslator: 'Dịch En-Ba',
    tabDictionary: 'Từ điển',
    appIconAlt: 'Biểu tượng ứng dụng',
    tabAboutUs: 'Về chúng tôi', // <-- Add this
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

    aboutTitle: 'Về ứng dụng của chúng tôi',
    aboutDescription: 'Ứng dụng này ra đời từ một dự án giải quyết sự thiếu hụt của một hệ thống dịch máy (MT) công khai cho cặp ngôn ngữ đang bị đe dọa là Bahnar-Tiếng Anh. Chúng tôi đã tận dụng công nghệ Dịch máy Thần kinh (NMT) để tạo ra một công cụ hỗ trợ bảo tồn ngôn ngữ, phục hồi văn hóa và tăng cường khả năng tiếp cận thông tin cho cộng đồng người Bahnar.',
    aboutTeamTitle: 'Về nhà phát triển',
    aboutTeamDescription: 'Ứng dụng này được tạo bởi nhóm sinh viên VinUniversity.',
    aboutContactTitle: 'Thông tin liên hệ',
    aboutContactEmail: 'Email: contact@example.com',
  }
  // Add other languages here following the same structure
};