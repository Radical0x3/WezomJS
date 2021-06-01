function getUsersOperatorCode(elem) {
  let code = elem.trim().split(/[-[\s]/);
  
  if (code.length === 1) {
    code = code[0].slice(0, 3);
  } else {
    code = code[0].replace(/[()]/g, "");
  }
  
  return code;
}

export default getUsersOperatorCode;