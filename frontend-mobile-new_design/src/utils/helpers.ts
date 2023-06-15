interface IObjectMapper {
  [key: string]: string | number;
}

const detectDayLight = () => {
  const today = new Date();
  let currentHour = today.getHours();
  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const checkAllValues = (objectEntries: any) => {
  return Object.values(objectEntries).every((value) => value);
};

const omitAnObjectKey = (obj: any, ...props: any[]) => {
  const result = { ...obj };
  props.forEach((prop) => {
    delete result[prop];
  });
  return result;
};

const findObjectByValueInArray = (
  arr: IObjectMapper[] | any,
  value: string,
  objectKey: string
) => {
  return arr && arr.find((obj: IObjectMapper) => value === obj[objectKey]);
};

const calculatePerc = (amount: string) => {
  let perc = 2.5 / 100;
  let num = Number(amount);
  return (perc * num).toFixed(2) + "";
};

const formatToDays = (date: string) => {
  let date_1 = new Date(date);
  let date_2 = new Date();

  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
};

const formatDateAndTime = (date: string) => {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(date);
  const year = d.getFullYear();
  const day = d.getDate();
  const month = months[d.getMonth()];

  let hours = d.getHours();
  let minutes: any = d.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  return `${month} ${day}, ${year} ${strTime}`;
};

export const Helper = {
  detectDayLight,
  checkAllValues,
  omitAnObjectKey,
  findObjectByValueInArray,
  calculatePerc,
  formatToDays,
  formatDateAndTime,
};
