enum FileRequest {
  getUser = 'getUser.php',
  getAllClubs = 'getAllClubs.php'
}

export class PathRequester {
  basePath = 'http://freejapp.com/kcdbsAppRequest/';

  get getUser(): string {
    return this.basePath + FileRequest.getUser;
  }

  get getAllClubs(): string {
    return this.basePath + FileRequest.getAllClubs;
  }
}
