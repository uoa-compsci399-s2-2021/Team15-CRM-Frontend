const convertFirstCharacterToUppercase = (stringToConvert) => {
  let firstCharacter = stringToConvert.substring(0, 1);
  let restString = stringToConvert.substring(1);

  return firstCharacter.toUpperCase() + restString;
};

exports.convertFirstCharacterAllWordsToUppercase = (stringToConvert) => {
  const wordsArray = stringToConvert.split(' ');
  const convertedWordsArray = wordsArray.map((word) => convertFirstCharacterToUppercase(word));

  return convertedWordsArray.join(' ');
};
