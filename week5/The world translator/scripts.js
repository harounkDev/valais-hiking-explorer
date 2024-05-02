const languages = {
  en: "Hello World",
  de: "Hello Welt",
};

function wordTranslate(pre) {
  return languages[pre];
}

console.log(wordTranslate("en"));
