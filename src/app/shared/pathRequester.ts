enum FileRequest {
  getUser = 'getUser.php',
  getAllClubs = 'getAllClubs.php',
  getClub = 'getClub.php',
  getAllDepartments = 'getAllDepartments.php',
  AddClub = 'AddClub.php'
}

export class PathRequester {
  basePath = 'http://freejapp.com/kcdbsAppRequest/';

  get getUser(): string {
    return this.basePath + FileRequest.getUser;
  }

  get getAllClubs(): string {
    return this.basePath + FileRequest.getAllClubs;
  }

  get getClub(): string {
    return this.basePath + FileRequest.getClub;
  }

  get getAllDepartments(): string {
    return this.basePath + FileRequest.getAllDepartments;
  }

  get AddClub(): string {
    return this.basePath + FileRequest.AddClub;
  }
}
