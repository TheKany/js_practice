export const fetchModule = async () => {
  try {
    const response = await fetch('public/mock/sectionListData.json');
    const data = await response.json();
    return data?.sectionInfoList || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
