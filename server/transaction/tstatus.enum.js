class TStatus {
  static ADMINFAILED= -3;
  static USERFAILED= -4;
  static TIMEOUT= -2;
  static FAILED= -1;
  static CREATE= 0;
  static PENDING= 1;
  static SUCCESS= 2;
  static COMPLETE= 3;
  static WALLET = 4;
}
module.exports = TStatus;
