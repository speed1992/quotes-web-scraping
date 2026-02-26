const { PHILOSOPHERS_DATA } = require("../common/constants/constants");
const { writeToFile } = require("../common/utils/utils");
const { findOutPhilosopherName, hitTranslationAPI } = require("./utils/utils");

let obj = {
  value: "",
  fullName: "",
  fullNameInOtherLanguages: {
    hi: "",
  },
};

const url = "https://cdn.jsdelivr.net/gh/speed1992/quotes/src/common/static/philosophers-data.json";

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

async function fetchOldResults() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const oldResults = await response.json(); // JSON data stored
    console.log("\nFetched old philosophers data successfully");
    return oldResults;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

module.exports.start = async function () {
  let result = await convert();
  let oldResults = await fetchOldResults();
  let newResults = [...oldResults, ...result]
  console.log("\nCombined Philosophers Data");
 
  writeToFile(
    newResults,
    { varName: "CONVERTED_CONSTANTS" },
    "convert-constants-json"
  );
};
