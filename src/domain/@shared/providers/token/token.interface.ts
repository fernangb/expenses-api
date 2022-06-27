import ValidateTokenInputDto from './dto/validate-token-input.dto';

export default interface TokenInterface {
  createToken(userId: string): string;
  validateToken(data: ValidateTokenInputDto): boolean;
}
