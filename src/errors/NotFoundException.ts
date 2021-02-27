class NotFoundException {
  public status = 404;

  constructor(public message: string) {}
}

export default NotFoundException;
