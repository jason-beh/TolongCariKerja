export const getNestedValueInObject = (nestedKey, data) => {
  if (nestedKey.includes(".")) {
    let temp = data;
    let nestedKeyArray = nestedKey.split(".");
    nestedKeyArray.forEach((key) => {
      temp = temp[key] || "";
    });
    return temp;
  }

  return data[nestedKey];
};
