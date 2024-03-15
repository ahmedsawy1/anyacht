export const advantageData = (width, personsNum, cabinets, baths) => {
  const arr = [
    {
      icon: require(`../../assets/icons/two-users-gray.png`),
      advantage: `تستوعب ${personsNum} شخص`,
    },
    {
      icon: require(`../../assets/icons/bed.png`),
      advantage: `تحتوى على ${cabinets} كابينة`,
    },
    {
      icon: require(`../../assets/icons/shower.png`),
      advantage: `تحتوى على ${baths} حمام`,
    },
    {
      icon: require(`../../assets/icons/Band-aid.png`),
      advantage: `الإسعافات الأولية`,
    },
    {
      icon: require(`../../assets/icons/lifeboat.png`),
      advantage: `معدات النجاة`,
    },
    {
      icon: require(`../../assets/icons/fuel.png`),
      advantage: `وقود غاز - سولار`,
    },
    {
      icon: require(`../../assets/icons/cold.png`),
      advantage: `مكيف`,
    },
  ];

  if (width) {
    arr.unshift({
      icon: require(`../../assets/icons/two-arrow.png`),
      advantage: `عرض ${width} قدم`,
    });
  }

  return arr;
};

export const servicesData = [
  {
    icon: require(`../../assets/icons/driver-gray.png`),
    advantage: `ربان القيادة`,
  },
  {
    icon: require(`../../assets/icons/food-bowl.png`),
    advantage: `مضيفين`,
  },
  {
    icon: require(`../../assets/icons/fork-spoon.png`),
    advantage: `إقامة كاملة`,
  },
];
