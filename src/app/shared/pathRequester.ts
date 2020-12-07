enum FileRequest {
  getUser = 'getUser.php',
  getAllClubs = 'getAllClubs.php',
  getClub = 'getClub.php',
  getAllDepartments = 'getAllDepartments.php',
  addClub = 'addClub.php',
  registerUser = 'registerUser.php',
  getClubProjects = 'getClubProjects.php',
  changeProjectStatus = 'changeProjectStatus.php',
  getAllProjectTypes = 'getAllProjectTypes.php',
  addProject = 'addProject.php',
  getAllUsers = 'getAllUsers.php',
  getClubMembers = 'getClubMembers.php',
  getClubAdmins = 'getClubAdmins.php',
  addMemberToClub = 'addMemberToClub.php',
  requestEnrollment = 'requestEnrollment.php',
  approveMember = 'approveMember.php',
  changeRole = 'changeRole.php'
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

  get addProject(): string {
    return this.basePath + FileRequest.addProject;
  }

  get getAllUsers(): string {
    return this.basePath + FileRequest.getAllUsers;
  }

  get getClubMembers(): string {
    return this.basePath + FileRequest.getClubMembers;
  }

  get getClubAdmins(): string {
    return this.basePath + FileRequest.getClubAdmins;
  }

  get addMemberToClub(): string {
    return this.basePath + FileRequest.addMemberToClub;
  }

  get requestEnrollment(): string {
    return this.basePath + FileRequest.requestEnrollment;
  }

  get approveMember(): string {
    return this.basePath + FileRequest.approveMember;
  }

  get changeRole(): string {
    return this.basePath + FileRequest.changeRole;
  }

  // get requestEnrollment(): string {
  //   return this.basePath + FileRequest.requestEnrollment;
  // }

  // get requestEnrollment(): string {
  //   return this.basePath + FileRequest.requestEnrollment;
  // }


}
