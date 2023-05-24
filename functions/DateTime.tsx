export default function transformDateTime(dateTimeString: any) {
    const date = new Date(dateTimeString);

    const hour = date.getHours();
    const minute = date.getMinutes();
    const amOrPm = hour >= 12 ? 'p. m.' : 'a. m.';
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const formattedMinute = minute.toString().padStart(2, '0');

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${year.toString().slice(2)}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;

    return `${formattedHour}:${formattedMinute} ${amOrPm} | ${formattedDate}`;
}
