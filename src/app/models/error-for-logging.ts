export class ErrorForLogging {
  uuid: string;
  message: string;
  httpErrorCode: number;
  internalErrorCode: number;
  username: string;
  showUser: boolean = false;
  timestamp: number;
  orginalError: Error;
  uri: string;
}
