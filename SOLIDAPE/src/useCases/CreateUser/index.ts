import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUsersRepository } from "../../respositories/implementations/PostgresUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const mailtrapMailProvider = new MailtrapMailProvider();
const postgresUsersRepository = new PostgresUsersRepository();

const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailtrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { CreateUserController, createUserController };
