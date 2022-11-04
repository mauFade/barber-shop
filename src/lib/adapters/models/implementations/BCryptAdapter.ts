import { hash, compare } from "bcryptjs";

import { IEncryptAdapter } from "../IEncryptAdapter";

export class BCryptAdapter implements IEncryptAdapter {
  public async create(payload: string): Promise<string> {
    const hashed = await hash(payload, 8);

    return hashed;
  }

  public async compare(payload: string, hashCompare: string): Promise<boolean> {
    const isEqual = await compare(payload, hashCompare);

    return isEqual;
  }
}
