import { Document, FilterQuery, Model, UpdateQuery, UpdateWriteOpResult } from 'mongoose';

export abstract class AbstractRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) {}

    async findOne(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T | null> {
        return this.entityModel.findOne(entityFilterQuery, {
            ...projection,
        });
    }

    async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
        return this.entityModel.find(entityFilterQuery);
    }

    async create(createEntityData: unknown): Promise<T> {
        const entity = new this.entityModel(createEntityData);
        return entity.save();
    }

    async update(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<unknown>): Promise<T | UpdateWriteOpResult | null> {
        return this.entityModel.updateOne(entityFilterQuery, updateEntityData);
    }

    async findOneAndUpdate(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<unknown>): Promise<T | null> {
        return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {
            new: true,
        });
    }

    async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
        return deleteResult.deletedCount >= 1;
    }
}
