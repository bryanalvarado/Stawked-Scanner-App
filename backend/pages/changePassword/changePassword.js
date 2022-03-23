const APP_ID = "scannerapp-wlugv";
const app = new Realm.App({ id: APP_ID });
//Grab Tokens
const params = new URLSearchParams(window.location.search);
const token = params.get("token");
const tokenId = params.get("tokenId");

function resetPassword() {
  if (checkPasswordWithConfirmPassword()) {
    var newPassword = document.getElementById("passwordInput").value;
    app.emailPasswordAuth
      .resetPassword(token, tokenId, newPassword)
      .then(() => displayResult("success"))
      .catch((err) => displayResult("error", err));
    console.log("reset password function is called");
  }
}

function checkPasswordWithConfirmPassword() {
  var newPassword = document.getElementById("passwordInput").value;
  var confirmPassword = document.getElementById("confirmPasswordInput").value;
  if (newPassword !== confirmPassword) {
    displayResult("error", "Passwords do not match. Please try again!");
    return false;
  } else {
    return true;
  }
}

function displayResult(result, err) {
  const message = document.getElementById("message");
  if (result === "success") {
    message.innerText =
      "Your Password has been changed.\n\n You may close this page and click sign in on the app. Thank you.";
  } else if (result === "error") {
    message.innerText = "Unable to change password for user. " + err;
  }
}
