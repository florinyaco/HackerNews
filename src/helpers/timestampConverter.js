function timestampConverter(UNIX_timestamp) {
    const timestamp = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = timestamp.getFullYear();
    const month = months[timestamp.getMonth()];
    const date = timestamp.getDate();
    const time = date + ' ' + month + ' ' + year;
    return time;
}

export default timestampConverter