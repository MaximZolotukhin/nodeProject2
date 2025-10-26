import { UsersRepository } from "./users/user.repository";

// Символы по которым будут связаны библиотеки
export const TYPES = {
	Application: Symbol.for("Application"),
	ILogger: Symbol.for("ILogger"),
	UserController: Symbol.for("UserController"),
	UserService: Symbol.for("UserService"),
	ExeptionFilter: Symbol.for("ExeptionFilter"),
	ConfigService: Symbol.for("ConfigService"),
	PrismaService: Symbol.for("PrismaService"),
	UsersRepository: Symbol.for("UsersRepository"),
};
