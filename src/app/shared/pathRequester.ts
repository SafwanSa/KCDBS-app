enum FileRequest {
  getUser = 'getUser.php',
  getAllClubs = 'getAllClubs.php',
  getClub = 'getClub.php',
  getAllDepartments = 'getAllDepartments.php',
  addClub = 'addClub.php',
  registerUser = 'registerUser.php',
  getClubProjects = 'getClubProjects.php',
  changeProjectStatus = 'changeProjectStatus.php',
  getAllProjectTypes = 'getAllProjectTypes.php'
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

  get addClub(): string {
    return this.basePath + FileRequest.addClub;
  }

  get registerUser(): string {
    return this.basePath + FileRequest.registerUser;
  }

  get getClubProjects(): string {
    return this.basePath + FileRequest.getClubProjects;
  }

  get getChangeProjectStatus(): string {
    return this.basePath + FileRequest.changeProjectStatus;
  }

  get getAllProjectTypes(): string {
    return this.basePath + FileRequest.getAllProjectTypes;
  }
}
