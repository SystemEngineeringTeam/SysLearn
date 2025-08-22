export class FrontmatterError extends Error {
  public override name: string = "FrontmatterError";

  public constructor(
    message: string,
    public readonly hint: string | undefined = undefined,
  ) {
    super(message);
  }
}
