
const StrLib = {
	fmtPhone: (sNum: string, masking: boolean) => {
    switch (sNum.length) {
      case 8:
        return masking
        ? sNum.replace(/(\d{4})(\d{4})/, '****-$2')
        : sNum.replace(/(\d{4})(\d{4})/,  '$1-$2');

      case 9:
        return masking
          ? sNum.replace(/(\d{2})(\d{3})(\d{4})/, '$1-***-$3')
          : sNum.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');

      case 10:
        return sNum.indexOf('02') === 0
          ? masking
            ? sNum.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3')
            : sNum.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3')
          : masking
            ? sNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3')
            : sNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

      case 11:
        return masking
          ? sNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3')
          : sNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      default:
        return sNum;
    }
  },
  fmtSeconds: (sec: number) => {
    let hours   : string | number = Math.floor(sec / 3600);
    let minutes : string | number = Math.floor((sec - (hours * 3600)) / 60);
    let seconds : string | number = sec - (hours * 3600) - (minutes * 60);

    if (hours && hours < 10) hours   = `0${hours}`;
    if (minutes < 10)        minutes = `0${minutes}`
    if (seconds < 10)        seconds = `0${seconds}`;

    return hours
            ? `${hours}:${minutes}:${seconds}`
            : `${minutes}:${seconds}`;
  },
  fmtDate: (sDate: string, sDateDiv?: '-' | '.') => {
		let rtnVal = sDate;

    if (sDateDiv === undefined) {
      sDateDiv = '-';
    }

    if (sDate.length === 4) {
      rtnVal = sDate.substring(0,2) + sDateDiv + sDate.substring(2,4);
    } else if (sDate.length >= 6) {
      rtnVal = sDate.substring(0,4) + sDateDiv + sDate.substring(4,6);

      if (sDate.length >= 8) {
        rtnVal = rtnVal + sDateDiv + sDate.substring(6,8);
      }
      if (sDate.length >= 12) {
        rtnVal = rtnVal + ' ' + sDate.substring(8,10) + ':' + sDate.substring(10,12);
      }
      if (sDate.length === 14) {
        rtnVal = rtnVal + ':' + sDate.substring(12,14);
      }
		}

		return rtnVal;
	},
  setLPad: (sOrg: string, nTotLen: number, sPad: string) => {
    if (sOrg.length >= nTotLen) {
        return sOrg;
    }

    const nPadLen = nTotLen - sOrg.length;
    const padString = sPad.repeat(Math.ceil(nPadLen / sPad.length));

    return padString.substring(0, nPadLen) + sOrg;
  },
  setRPad: (sOrg: string, nTotLen: number, sPad: string) => {

		let sRet = sOrg;
		let nPadLen = nTotLen - sOrg.length;

		if (nPadLen <= 0) {
			return sOrg;
		} else {
			while (1) {
				if (nPadLen >= sPad.length) {
					sRet += sPad;
					nPadLen -= sPad.length;
				} else {
					if (nPadLen > 0) sRet += sPad.substr(0, nPadLen);
					break;
				}
			}
		}

		return sOrg + sRet;
	},
  isNull: (sValue: string) => {
		sValue = sValue.trim();
		if (sValue === 'undefined') return true;
		if (sValue === 'null') return true;
		if (sValue === '') return true;
		if (sValue === null) return true;
		return false;
	},
  isNum: (sNum: string) => {
		if (StrLib.isNull(sNum)) return false;

		for (let i = 0; i < sNum.length; i++) {
			const c = sNum.charAt(i);
			if (i !== 0 && (c === '+' || c === '-')) {
				return false;

			} else if (c >= '0' && c <= '9') {
				if (c.search('[^0-9]') >= 0) return false;
			}
		}
	},
  isAlpha: (sVal: string) => {
		if (StrLib.isNull(sVal)) return false;
		if (sVal.search('[^A-Za-z]') >= 0) return false;
		else return true;
	},
	isAlphaNum: (sVal: string) => {
		if (StrLib.isNull(sVal)) return false;
		if (sVal.search('[^A-Za-z0-9]') >= 0) return false;
		else return true;
	},
  isRegexExist: (sVal: string, regex: RegExp) => {
		if (StrLib.isNull(sVal)) return false;
    return regex.test(sVal);
	},
  isCodeStr: (sVal: string) => {
		if (StrLib.isNull(sVal)) return false;
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(sVal);
	},
  getRight: (sOrg: string, nSize: number) => {
		if (sOrg.length < nSize) return sOrg;
		else return sOrg.substring(sOrg.length - nSize, sOrg.length);
	},
}
export {StrLib};