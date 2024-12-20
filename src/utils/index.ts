wx.$util = {
  delay(t = 0) {
    return new Promise(resolve => {
      setTimeout(resolve, t);
    });
  },
  uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("");

  },
  getColorString(color: number) {
    let str = color.toString(16)
    let n = 6 - str.length
    while(n > 0) {
      str = "0" + str
      n--
    }
    return "#"+str
  }
};