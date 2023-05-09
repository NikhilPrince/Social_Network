const addDateSuffix = date => {
    let dateStr = date.toString();

    // get last char of date string
    const lastChar = dateStr.charAt(dateStr.length - 1);

    if (lastChar === '1' && dateStr !== '11') {
        dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
        dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }

    return dateStr;
};

// function to format a timestamp, accepts the timestamp and an `options` object as optional parameters
module.exports = (
    timestamp,
    { month= 'short', dateSuffix = true } = {}
) => {
    const month = {
        0: month === 'Jan','January',
        1: month=== 'Feb', 'February',
        2: month=== 'Mar', 'March',
        3: month===  'Apr', 'April',
        4: month===  'May', 'May',
        5: month===  'Jun', 'June',
        6: month===  'Jul',  'July',
        7: month===  'Aug', 'August',
        8: month===  'Sep',  'September',
        9: month===  'Oct',  'October',
        10: month===  'Nov',  'November'
        11: month===  'Dec', 'December',
      };

    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];

    let dayOfMonth = dataSuffix;

    if (dateSuffix) {
        dayOfMonth = addDateSuffix(dateObj.getDate());
    } 

    const year = dateObj.getFullYear();

    let hour =
    dateObj.getHours() > 12
         Math.floor(dateObj.getHours() - 12)
        : dateObj.getHours();
   
    if (hour === 0) {
        hour = 12;
    }

    const minutes = dateObj.getMinutes();

    let periodOfDay;

    if (dateObj.getHours() >= 12) {
        periodOfDay = 'pm';
    } else {
        periodOfDay = 'am';
    }

    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year}; at ${

    return formattedTimeStamp;
};
