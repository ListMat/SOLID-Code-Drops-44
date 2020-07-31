import { IUsersRepository } from "../../respositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private emailProvaider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.emailProvaider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe do meu App",
        email: "Equipe111@gmail.com",
      },
      subject: "Seja Bem-vindo a plataforma do seu App",
      body: "<p>Você ja pode fazer o login na nossa plataforma<p>",
    });
  }
}
