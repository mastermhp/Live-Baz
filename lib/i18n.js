// Multi-language support utilities
export const LANGUAGES = {
  en: { code: "en", name: "English", dir: "ltr" },
  fa: { code: "fa", name: "فارسی", dir: "rtl" },
  ar: { code: "ar", name: "العربية", dir: "rtl" },
}

export const TRANSLATIONS = {
  en: {
    blog: "Analysis & News",
    blogDescription: "Expert insights, match previews, and in-depth analysis from our team of football analysts.",
    categories: "Categories",
    all: "All",
    featured: "Featured",
    readMore: "Read More",
    backToArticles: "Back to Articles",
    author: "Author",
    published: "Published",
    readingTime: "Reading Time",
    views: "Views",
    share: "Share",
    save: "Save",
    comments: "Comments",
    aboutAuthor: "About the Author",
    expertAnalyst:
      "Expert sports analyst with deep knowledge in football tactics, match analysis, and predictions. Contributing to LiveBaz since",
    relatedArticles: "Related",
    noArticles: "No articles found. Check back soon!",
    tagsSaved: "Added to bookmarks",
    tagsRemoved: "Removed from bookmarks",
    linkCopied: "Link copied to clipboard!",
    min: "min",
    read: "read",
  },
  fa: {
    blog: "تحلیل و اخبار",
    blogDescription: "بینش های تخصصی، پیش بینی های بازی و تجزیه و تحلیل عمیق از تیم تحلیلگران فوتبال ما.",
    categories: "دسته بندی ها",
    all: "همه",
    featured: "برجسته",
    readMore: "بیشتر بخوانید",
    backToArticles: "بازگشت به مقالات",
    author: "نویسنده",
    published: "منتشر شده",
    readingTime: "زمان خواندن",
    views: "بازدید",
    share: "اشتراک گذاری",
    save: "ذخیره",
    comments: "نظرات",
    aboutAuthor: "درباره نویسنده",
    expertAnalyst:
      "تحلیلگر ورزشی متخصص با دانش عمیق در تاکتیک های فوتبال، تجزیه و تحلیل بازی و پیش بینی. مشارکت در LiveBaz از",
    relatedArticles: "مقالات مرتبط",
    noArticles: "هیچ مقاله ای یافت نشد. بزودی بازگردید!",
    tagsSaved: "به نشانک ها افزوده شد",
    tagsRemoved: "از نشانک ها حذف شد",
    linkCopied: "لینک کپی شد!",
    min: "دقیقه",
    read: "خواندن",
  },
  ar: {
    blog: "التحليلات والأخبار",
    blogDescription: "رؤى الخبراء وملخصات المباريات والتحليلات المتعمقة من فريق محللي كرة القدم لدينا.",
    categories: "الفئات",
    all: "الكل",
    featured: "مميز",
    readMore: "اقرأ أكثر",
    backToArticles: "العودة إلى المقالات",
    author: "المؤلف",
    published: "منشور",
    readingTime: "وقت القراءة",
    views: "المشاهدات",
    share: "مشاركة",
    save: "حفظ",
    comments: "تعليقات",
    aboutAuthor: "عن المؤلف",
    expertAnalyst:
      "محلل رياضي متخصص بمعرفة عميقة في تكتيكات كرة القدم وتحليل المباريات والتنبؤات. المساهمة في LiveBaz منذ",
    relatedArticles: "مقالات ذات صلة",
    noArticles: "لم يتم العثور على مقالات. عد قريبا!",
    tagsSaved: "تم الإضافة إلى الإشارات المرجعية",
    tagsRemoved: "تمت الإزالة من الإشارات المرجعية",
    linkCopied: "تم نسخ الرابط!",
    min: "دقيقة",
    read: "قراءة",
  },
}

export function getTranslation(lang, key) {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key
}

export function getLangConfig(lang) {
  return LANGUAGES[lang] || LANGUAGES.en
}
