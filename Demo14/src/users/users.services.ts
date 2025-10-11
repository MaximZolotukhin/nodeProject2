import { injectable } from "inversify";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./users.services.interface";

@injectable()
export class UserService implements IUserService {
	createUser({ email, name, password }: UserRegisterDto): User | null {
		return null;
	}

	validateUser(dto: UserLoginDto): boolean {
		return true;
	}
}
