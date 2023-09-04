const modifyResponse = ({ drink }) => {
  const ingredients = Object.entries(drink)
    .filter(
      (entry) => entry[0].startsWith('strIngredient') && entry[1] !== null
    )
    .map((ing) => ing[1]);

  const quantity = Object.entries(drink)
    .filter((entry) => entry[0].startsWith('strMeasure') && entry[1] !== null)
    .map((q) => q[1]);

  return quantity.reduce((acc, key, index) => {
    return { ...acc, [key]: ingredients[index] };
  }, {});
};

export default modifyResponse;
