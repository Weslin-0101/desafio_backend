export interface CheckFormEmailRepository {
  checkByEmail(email: string): Promise<CheckFormEmailRepository.Result>;
}

export namespace CheckFormEmailRepository {
  export type Result = boolean;
}
