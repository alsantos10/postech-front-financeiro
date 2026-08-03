import { AuthRepository } from "../ports/AuthRepository";

export class ForgotPasswordUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(email: string): Promise<void> {
        return this.authRepository.forgotPassword(email);
    }
}