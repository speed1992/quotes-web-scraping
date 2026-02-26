const { PHILOSOPHERS_DATA } = require("../common/constants/constants");
const oldResults = require("../common/constants/philosophers-data");
const { writeToFile } = require("../common/utils/utils");
const { findOutPhilosopherName, hitTranslationAPI } = require("./utils/utils");

let obj = {
  value: "",
  fullName: "",
  fullNameInOtherLanguages: {
    hi: "",
  },
};

async function getConvertedObject(philosopherInfo) {
  let newObj = { ...obj };
  newObj.value = philosopherInfo.varName;
  newObj.fullName = await findOutPhilosopherName(philosopherInfo.goodreadsURL);
  // const translatedText = await hitTranslationAPI({ inputText: newObj.fullName })
  const translatedText = "";
  newObj.fullNameInOtherLanguages = { hi: translatedText };
  return { ...newObj };
}

async function convert() {
  let result = [];

  for (let i = 0; i < PHILOSOPHERS_DATA.length; i++) {
    let newObj = await getConvertedObject(PHILOSOPHERS_DATA[i]);
    result.push(newObj);
  }
  return result;
}

module.exports.start = async function () {
  let result = await convert();
  let newResults = [...oldResults, ...result]
  console.log("\nCombined Philosophers Data");
 
  writeToFile(
    newResults,
    { varName: "CONVERTED_CONSTANTS" },
    "convert-constants-json"
  );
};
