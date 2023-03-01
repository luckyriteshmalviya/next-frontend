import { date } from "yup";

export const getAlphabet = (number) => {
  switch (number) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    default:
      return "E";
  }
};

export const sameHeightDiv = (tag) => {
  const allParagraph = document.querySelectorAll(tag);
  let maxHeight = 0;
  allParagraph.forEach((element) => {
    if (element.clientHeight > maxHeight) {
      maxHeight = element.clientHeight;
    }
  });

  allParagraph.forEach((element) => {
    element.style.height = maxHeight + "px";
  });
};

export const heightOnDestroy = (tag) => {
  const allParagraph = document.querySelectorAll(tag);

  allParagraph.forEach((element) => {
    element.style.height = "auto";
  });
};

export const getSeconds = (date1, date2) => {
  return Math.abs((date1.getTime() - date2.getTime()) / 1000).toFixed(2);
};

export const transformExperienceDate = (date) => {
  return date.reverse().split("-").join("/");
};

export const transformDate = (experience) => {
  experience.forEach((element) => {
    element.startingDate = transformExperienceDate(element.startingDate);
    element.endingDate = transformExperienceDate(element.endingDate);

    return element;
  });

  return experience;
};

export const clearLocalData = (data) => {
  data.forEach((element) => {
    localStorage.removeItem(element);
  });
};

export const getLocalStorageData = (args) => {
  const formData = {};
  args.map((argument, index) => {
    let data = localStorage.getItem(argument) || null;

    if (data?.[0] === "{") {
      let parsedObject = JSON.parse(data);

      for (let key in parsedObject) {
        formData[key] = parsedObject[key];
      }
    } else {
      formData[argument] = data;
    }
  });

  for (let key in formData) {
    if (formData[key] === "NULL") formData[key] = null;
  }

  console.log("formData", formData);

  return formData;
};
