import { StrLib } from "./StrLib";
const DateLib = {
  isLeapYear: (sDate: string) => {
		let ret;

		if (StrLib.isNull(sDate)) return false;

		const nY = parseInt(sDate.substring(0,4), 10);
		if ((nY % 4) === 0) {
			if ((nY % 100) !== 0 || (nY % 400) === 0) ret = true;
			else ret = false;
		} else {
			ret = false;
		}
		return ret;
	},
  getLastDateCnt: (sDate: string) => {
   		return  new Date(Number(sDate.substring(0,4)),Number(sDate.substring(4,6)),0).getDate();
	},
  setAddDate: (sDate: string, nOffset: number) => {
		const nYear	= parseInt(sDate.substring(0, 4));
		const nMonth	= parseInt(sDate.substring(4, 6));
		const nDate	= parseInt(sDate.substring(6, 8)) + nOffset;

		const objDate = new Date(nYear, nMonth - 1, nDate);

		const sYear	= objDate.getFullYear().toString();
		const sMonth	= StrLib.getRight('0' + (objDate.getMonth() + 1), 2);
		const sDay	= StrLib.getRight('0' + objDate.getDate(), 2);

		return sYear + sMonth + sDay;
	},
  setAddMonth: (sDate: string, nOffset: number) => {
		// if (StrLib.isNull(sDate) || StrLib.isNull(nOffset)) return '';
		sDate = sDate.trim();

		const nYear 	= parseInt(sDate.substring(0, 4));
		const nMonth 	= parseInt(sDate.substring(4, 6)) + nOffset;
		const nDate 	= parseInt(sDate.substring(6, 8));

		let sRet;
		const objDate = new Date(nYear, nMonth, nDate);

		let sYear	= objDate.getFullYear().toString();
		let sMonth	= StrLib.setLPad(objDate.getMonth().toString(), 2, '0');
		const sDay	= StrLib.setLPad(objDate.getDate().toString(), 2, '0');
		if (sMonth === '00') {
			sYear = (parseInt(sYear) - 1).toString();
			sMonth = '12';
		}
		sRet = sYear + sMonth + sDay;

		const nsDate 	= parseInt(sRet.substring(6, 8));
		const nLastDate = DateLib.getLastDateCnt(sRet);
		sRet = sRet.substring(0,6);

		if (nsDate > nLastDate) sRet += nLastDate.toString();
		else sRet += (StrLib.getRight('0' + nsDate, 2)).toString();

		return sRet;
	},
  getToday: () => {
		const objDate = new Date();
		let sToday  = objDate.getFullYear().toString();
		sToday += StrLib.getRight('0' + (objDate.getMonth() + 1), 2);
		sToday += StrLib.getRight('0' + objDate.getDate(), 2);

		return sToday;
	},
  getTodayTime: () => {
		const objDate = new Date();
		let sToday  = objDate.getFullYear().toString();
		sToday += StrLib.getRight('0' + (objDate.getMonth() + 1), 2);
		sToday += StrLib.getRight('0' + objDate.getDate(), 2);
		sToday += StrLib.getRight('0' + objDate.getHours(), 2);
		sToday += StrLib.getRight('0' + objDate.getMinutes(), 2);
		sToday += StrLib.getRight('0' + objDate.getSeconds(), 2);

		return sToday;
	},
  getDiffDate: (sStartDate: string, sEndDate: string) => {
		sStartDate = sStartDate.trim();
		sEndDate	 = sEndDate.trim();
		if (StrLib.isNull(sStartDate) || StrLib.isNull(sEndDate)) return NaN;

		const vFromDate = new Date(parseInt(sEndDate.substring(0,4)  , 10), parseInt(sEndDate.substring(4,6)  , 10) -1, parseInt(sEndDate.substring(6,8)  , 10));
		const vToDate   = new Date(parseInt(sStartDate.substring(0,4), 10), parseInt(sStartDate.substring(4,6), 10) -1, parseInt(sStartDate.substring(6,8), 10));

		return (+vFromDate - +vToDate) / (1000 * 60 * 60 * 24);
	},
  getDiffDateFull: (sStartDate: string, sEndDate: string) => {
		sStartDate = sStartDate.trim();
		sEndDate	 = sEndDate.trim();
		if (StrLib.isNull(sStartDate) || StrLib.isNull(sEndDate)) return NaN;

		const yFromDate = Number(sStartDate.substring(0,4));
		const yToDate   = Number(sEndDate.substring(0,4));
    const diffYear = Math.abs(+yFromDate - +yToDate) - 1;

		const mFromDate = Number(sStartDate.substring(4,6));
		const mToDate   = Number(sEndDate.substring(4,6));

    let diffMonth = 0;

    diffMonth = mToDate - mFromDate;

    if (mFromDate > mToDate) {
      diffMonth = (12 - mFromDate) + mToDate;
    }

		return diffYear + "년 " + diffMonth + "개월";
	},
}



export {DateLib};