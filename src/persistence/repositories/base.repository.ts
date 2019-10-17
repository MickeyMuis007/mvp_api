import { IRead } from "./interfaces/IRead";
import { IWrite } from "./interfaces/IWrite";

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public create(item: T): Promise<T> {
    throw new Error("Method not implemented.");
  }

  public update(id: string, item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public find(item: T): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  public findOne(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
