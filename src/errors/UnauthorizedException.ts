class UnauthorizedException {
  public status = 401;

  constructor(public message: string) {}
}

export default UnauthorizedException;
