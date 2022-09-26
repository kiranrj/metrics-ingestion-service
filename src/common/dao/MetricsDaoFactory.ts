import { IMetricsDao } from "./IMetricsDao";
import { MetricsInmemoryDao } from "./MetricsInmemoryDao";
import { MetricsRedisDao } from "./MetricsRedisDao";
import { MetricStoreType } from "./MetricStoreType";

export class MetricsDaoFactory {
    getMetricsDao(): IMetricsDao {
        const storeType = process.env.STORE as MetricStoreType;
        let dao;
        switch(storeType) {
            case MetricStoreType.INMEMORY:
                dao = new MetricsInmemoryDao();
                break;
            case MetricStoreType.REDIS:
                dao = new MetricsRedisDao();
                break;
            default:
                throw new Error("Not implemented");
                break;
        }
        return dao;
    }
}