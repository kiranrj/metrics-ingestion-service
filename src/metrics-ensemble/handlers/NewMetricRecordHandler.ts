import { IMetricsDao } from "../../common/dao/IMetricsDao"
import { MetricsDaoFactory } from "../../common/dao/MetricsDaoFactory"
import { MetricRecord } from "../../common/models/MetricRecord";
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

        const metricRecord = JSON.parse(message);

        let metricKey = key ?? Utils.getRecordKey(metricRecord);
        let metric = this.metricsDao.get(metricKey);

        if(!metric) {
            metric = this.metricFactory.createMetric(metricRecord);
        }
        metric.process(metricRecord);

        this.metricsDao.put(metric);

        // What better way to debug !!
        console.log(this.metricsDao.list())
    }
}