
export const getStoreName = (store) => {
    return {
      ORG: "Organic",
      INORG: "InOrganic",
      ACIDS: "Acids",
      NORM_GLASS: "Normal Glassware",
      Q_FIT_GLASS: "Quick Fit Glassware",
      ORG_USED: "Organic Used",
      INORG_USED: "InOrganic Used",
    }[store];
};

