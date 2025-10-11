import { UserService } from "./users/users.services";

// Символы по которым будут связаны библиотеки
export const TYPES = {
	Application: Symbol.for("Application"),
	ILogger: Symbol.for("ILogger"),
	UserController: Symbol.for("UserController"),
	UserService: Symbol.for("UserService"),
	ExeptionFilter: Symbol.for("ExeptionFilter"),
};
