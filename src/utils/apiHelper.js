export const apiHelper = (url, filters) => {
  let filterParams = {};
  Object.keys(filters).forEach((key) => {
    filterParams = {
      ...filterParams,
      ...(filters[key] ? { [key]: filters[key] } : {}),
    };
  });
  const joinFilters = Object.entries(filterParams).join('&');
  const finalFilters = joinFilters.replaceAll(',', '=');

  return finalFilters !== '' ? `${url}?${finalFilters}` : url;
};
