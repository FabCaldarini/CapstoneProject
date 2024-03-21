export interface IUserDto {
  username: string;
  password:string;
}

export interface UserRegister{
  name:string;
  surname:string;
  username:string;
  password:string;
  email:string;
  dateOfBirth:string;
}

export interface UserLogin{
  username:string;
  password:string;
}

