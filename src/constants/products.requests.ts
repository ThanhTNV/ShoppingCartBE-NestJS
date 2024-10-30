export class MongoId_String extends String {
  constructor(value: string) {
    if (!/^[0-9a-fA-F]{24}$/.test(value)) {
      throw new Error('Invalid MongoId');
    }
    super(value);
  }
}
