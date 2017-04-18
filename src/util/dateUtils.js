/**
 * Created by wiki on 16/5/27.
 */

import dateformat from './dateformat'
export default {
  dateInit: {
    initDay: function () {
      var date = new Date();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var year = date.getUTCFullYear(); //显示的年数
      return year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day);
    },
    initMonth: function () {
      var date = new Date();
      var month = date.getMonth() + 1;
      var year = date.getUTCFullYear(); //显示的年数
      return year + "-" + (month < 10 ? ("0" + month) : month);
    }
  },

  dateStringCut:{
    fullTimeToHourMin: function (fullTimeStr) {
      return fullTimeStr.substring(16, 11)
    },
    fullTimeToDate: function (fullTimeStr) {
      return fullTimeStr.substring(10, 5)
    },
    HHMMSStoHHMM: function (HHMMSS) {
      return HHMMSS.substring(5, 0)
    }
  },

  dateCaculate:{

    dateAdd: function (interval, number, date) {
      switch (interval) {
        case "y ":
        {
          date.setFullYear(date.getFullYear() + number);
          return date;
          break;
        }
        case "q ":
        {
          date.setMonth(date.getMonth() + number * 3);
          return date;
          break;
        }
        case "M ":
        {
          date.setMonth(date.getMonth() + number);
          return date;
          break;
        }
        case "w ":
        {
          date.setDate(date.getDate() + number * 7);
          return date;
          break;
        }
        case "d ":
        {
          date.setDate(date.getDate() + number);
          return date;
          break;
        }
        case "h ":
        {
          date.setHours(date.getHours() + number);
          return date;
          break;
        }
        case "m ":
        {
          date.setMinutes(date.getMinutes() + number);
          return date;
          break;
        }
        case "s ":
        {
          date.setSeconds(date.getSeconds() + number);
          return date;
          break;
        }
        default:
        {
          date.setDate(d.getDate() + number);
          return date;
          break;
        }
      }
    }

  },

  dateCompare:{
    dateCompare: function (aDate, bDate) {

      if ((typeof aDate == 'object') && aDate.constructor == Date) {
        aDate = dateformat(aDate, 'YYYY-MM-DD')
      }

      if ((typeof bDate == 'object') && bDate.constructor == Date) {
        bDate = dateformat(bDate, 'YYYY-MM-DD')
      }

      var arr = aDate.split("-");
      var starttime = new Date(arr[0], arr[1], arr[2]);
      var starttimes = starttime.getTime();

      var arrs = bDate.split("-");
      var lktime = new Date(arrs[0], arrs[1], arrs[2]);
      var lktimes = lktime.getTime();

      if (starttimes > lktimes)
        return -1;
      else if (starttimes == lktimes)
        return 0;
      else
        return 1;
    },


    monthCompare: function (aMonth, bMonth) {

      if ((typeof aMonth == 'object') && aMonth.constructor == Date) {
        aMonth = dateformat(aMonth, 'YYYY-MM')
      }

      if ((typeof bMonth == 'object') && bMonth.constructor == Date) {
        bMonth = dateformat(bMonth, 'YYYY-MM')
      }

      var arr = aMonth.split("-");
      var starttime = new Date(arr[0], arr[1]);
      var starttimes = starttime.getTime();

      var arrs = bMonth.split("-");
      var lktime = new Date(arrs[0], arrs[1]);
      var lktimes = lktime.getTime();

      if (starttimes > lktimes)
        return -1;
      else if (starttimes == lktimes)
        return 0;
      else
        return 1;
    },


    isFuture: function (date) {

      var timeStamp = 0;

      if ((typeof date == 'object') && date.constructor == Date) {
        timeStamp = date.getTime()
      }

      if ((typeof date == 'string') && date.constructor == String) {
        timeStamp = Date.parse(date);
      }

      var nowTimeStamp = (new Date()).getTime();

      if (timeStamp <= nowTimeStamp) {
        return false;
      } else {
        return true;
      }

    }
  }

}

