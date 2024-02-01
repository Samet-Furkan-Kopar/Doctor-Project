const convertDateToLocale = (dt:any) => {
    const originalDate = new Date(dt);
    const options:any = { year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = originalDate.toLocaleString('tr-TR', options);
    return formattedDate;
}

export default convertDateToLocale;