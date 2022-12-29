class Util {
    convertSQLDateToNormalDate(sqlDate) {
        let [year, month, day] = sqlDate.split("-")
        return day + " - " + month + " - " + year;
    }
}

export default new Util();