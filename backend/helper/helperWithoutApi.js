function base64DataURLToArrayBuffer(dataURL) {
  const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
  if (!base64Regex.test(dataURL)) {
    return false;
  }
  const stringBase64 = dataURL.replace(base64Regex, "");
  let binaryString;
  if (typeof window !== "undefined") {
    binaryString = window.atob(stringBase64);
  } else {
    binaryString = new Buffer(stringBase64, "base64").toString("binary");
  }
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes.buffer;
}
const opts = {
  centered : false,
  fileType : "docx",
  getImage : (tagValue, tagName) => {
      return base64DataURLToArrayBuffer(tagValue);
  },
  getSize : (img, tagValue, tagName) => {
      return [150, 100];
  }
}

module.exports = {
  opts: opts,
  base64DataURLToArrayBuffer : base64DataURLToArrayBuffer,
  nestedAssign : (target, source) => {
    Object.keys(source).forEach(key => {
        const s_val = source[key]
        const t_val = target[key]
        target[key] = t_val && s_val && typeof t_val === 'object' && typeof s_val === 'object' ? nestedAssign(t_val, s_val) : s_val
    })
    return target
  },
  IsEmpty : (val) => {
    return val == undefined || val == null || val.toString() == ''
  },
  IsValidFileName : (val) => {
    return !(val.includes('.') || val.includes('\\') || val.includes('/'))
  },
  updateObjForPG : (val,field,obj) => {
    if (val !== undefined) {
      obj[field] = val
    }
    return obj
  }
}