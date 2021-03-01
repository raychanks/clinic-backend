class UniquenessException {
  public status = 400;

  constructor(public message: string) {}
}

export default UniquenessException;
