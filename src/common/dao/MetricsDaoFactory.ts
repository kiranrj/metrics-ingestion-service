import { IMetricsDao } from "./IMetricsDao";
import { MetricsInmemoryDao } from "./MetricsInmemoryDao";
import { MetricStoreType } from "./MetricStoreType";

export class MetricsDaoFactory {
    getMetricsDao(): IMetricsDao {
        const storeType = process.env.STORE as MetricStoreType;
        let dao;
        switch(storeType) {
            case MetricStoreType.INMEMORY:
                dao = new MetricsInmemoryDao();
                break;
            case MetricStoreType.KAKFA:
                throw new Error("Not implemented");
                break;
        }
        return dao;
    }
}