import { IMetricsDao } from "../../common/dao/IMetricsDao"
import { MetricsDaoFactory } from "../../common/dao/MetricsDaoFactory"
import { IMetric } from "../../common/models/metrics/IMetric";

export class MetricsService {
    metricsDao: IMetricsDao;

    constructor(metricsDaoFactory: MetricsDaoFactory) {
        this.metricsDao = metricsDaoFactory.getMetricsDao();
    }

    list = async(): Promise<IMetric[]> => {
        return this.metricsDao.list();
    }

    get = async(name: string): Promise<IMetric | undefined> => {
        return this.metricsDao.get(name);
    }

    post = async(metric: IMetric) : Promise<boolean> => {
        return this.metricsDao.put(metric);
    }

    delete = async(name: string): Promise<boolean> => {
        return this.metricsDao.delete(name);
    }
}