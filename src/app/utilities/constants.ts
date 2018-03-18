import { StatusRecord } from './search/statusRecord';
export class Constants{
  public static ServerURL = 'https://lldweb.azurewebsites.net';

   public static deepCopy(oldObj: any) {
    let newObj = oldObj;
    if (oldObj && typeof oldObj === "object") {
      newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
      for (var i in oldObj) {
        newObj[i] = this.deepCopy(oldObj[i]);
      }
    }
    return newObj;
  }
}
