export const validateNickname = (nickname) => {
    let reg = /^[a-zA-Z0-9]{2,}[a-zA-Z]+[0-9]*$/;
    if(nickname.length > 16){
      return false;
    }
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