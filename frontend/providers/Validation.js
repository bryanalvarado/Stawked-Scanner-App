export const validateNickname = (nickname) => {
    let reg = /^[a-zA-Z0-9]{5,}[a-zA-Z]+[0-9]*$/;
    if(reg.test(nickname) === false){
      return false;
    }
    return true;
  }

export const validateEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      return false;
    }
    return true;
  };