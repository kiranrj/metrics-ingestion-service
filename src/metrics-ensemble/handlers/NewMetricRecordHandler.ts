import { IMetricsDao } from "../../common/dao/IMetricsDao"
import { MetricsDaoFactory } from "../../common/dao/MetricsDaoFactory"
import { MetricRecord } from "../../common/models/MetricRecord";
import { IMetric } from "../../common/models/metrics/IMetric";
import { MetricFactory } from "../../common/models/metrics/MetricFactory";
import { Utils } from "../../common/utils/Utils";

export class NewMetricRecordHandler {
    readonly metricsDaoFactory: MetricsDaoFactory
    readonly metricFactory: MetricFactory;
    metricsDao: IMetricsDao;
    
    constructor(metricsDaoFactory: MetricsDaoFactory, metricFactory: MetricFactory) {
        this.metricsDaoFactory = metricsDaoFactory;
        this.metricFactory = metricFactory;

        this.metricsDao = metricsDaoFactory.getMetricsDao();
    }

    handleNewMessage = async(key: string | undefined, message: string | undefined): Promise<void> => {
        if (!message) {
            console.log("Empty metricRecord skipping");
            return;
        }

        const metricRecord: MetricRecord = JSON.parse(message);

        let metricKey = key ?? Utils.getRecordKey(metricRecord);
        let metric = await this.metricsDao.get(metricKey) as IMetric;
        
        if(!metric) {
            metric = this.metricFactory.createMetric(metricRecord);
        }
        metric.process(metricRecord);

        await this.metricsDao.put(metric);

        // What better way to debug !!
        console.log(await this.metricsDao.list())
    }
}