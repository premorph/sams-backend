import { RegisterStoreDTO, StoreDTO, UpdateStoreDTO } from "../model/storage.model";

export abstract class StorageRepository {
    abstract GetAll(): Promise<StoreDTO[]>;
  abstract GetOne(param:UpdateStoreDTO,id:number): Promise<StoreDTO>;
  abstract UpdateOne(param: UpdateStoreDTO, id: string): Promise<StoreDTO>;
  abstract DeleteOne(id: string);
  abstract Create(param: RegisterStoreDTO): Promise<StoreDTO>;
}