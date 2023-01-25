export abstract class GenericContract<T,S> {
  abstract GetAll(param: T): Promise<S[]>;
  abstract GetOne(param: T,id:string): Promise<S>;
  abstract UpdateOne(param: T, id: string): Promise<S>;
  abstract DeleteOne(id: string );
  abstract Create(param:T):Promise<S>;
}
