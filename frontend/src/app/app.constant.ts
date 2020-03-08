export class Constants {
    public static MENUS = [
        { name: 'Clusters', route: '/clusters' },
        { name: 'Produce', route: '/producer' },
        { name: 'Consume', route: '/consumer' },
        { name: 'Topics', route: '/topic' }
        // { name: 'Brokers', route: '/brokers' },
        // { name: 'Metrics', route: '/metrics' }
    ];

    public static PARTITIONING = [
        { name: 'None', value: '' },
        { name: 'Partition', value: 'partition' },
        { name: 'Partition Key', value: 'partition_key' }
    ]

    public static OFFSETS = [
        { name: 'Earliest', value: 'earliest' },
        { name: 'Latest', value: 'latest' }
    ]

    public static MESSAGE_TYPES = [
        { name: 'text', value: 'text/plain' },
        { name: 'json', value: 'application/ld+json' },
        { name: 'xml', value: 'application/xml' },
        { name: 'yaml', value: 'text/x-yaml' },
    ];

    public static COMPRESSION_CODEC = [
        { name: 'none', value: 'nil' },
        { name: 'snappy', value: 'snappy' },
        { name: 'gzip', value: 'gzip' },
        { name: 'lz4', value: 'lz4' },
        { name: 'zstd', value: 'zstd' },
    ];

    public static KEY_DESERIALIZATION_TYPE = [
        { name: 'text', value: 'text/plain' },
        { name: 'json', value: 'application/ld+json' },
        { name: 'xml', value: 'application/xml' },
        { name: 'yaml', value: 'text/x-yaml' },
        { name: 'number', value: 'text/plain' },
        { name: 'bytes', value: 'text/plain' }
    ]

    public static MESSAGE_DESERIALIZATION_TYPE = [
        { name: 'text', value: 'text/plain' },
        { name: 'json', value: 'application/ld+json' },
        { name: 'xml', value: 'application/xml' },
        { name: 'yaml', value: 'text/x-yaml' },
        { name: 'number', value: 'text/plain' },
        { name: 'bytes', value: 'text/plain' }
    ]

    public static START_FILTER = [
        { name: 'None', value: 'none' },
        { name: 'Consumer group', value: 'consumer-group' },
        { name: 'Beginning', value: 'beginning' },
        { name: 'Latest', value: 'latest' },
        { name: 'Offset', value: 'offset' },
        { name: 'Previous X offset', value: 'previous-x' },
        { name: 'Today', value: 'today' },
        { name: 'Last hour', value: 'last-hour' },
        { name: 'Specific date', value: 'specific-date' }
    ]

    public static CONSUMER_CHANNEL = 'ConsumerChannel';
    public static CONSUMER_LAG_CHANNEL = 'ConsumerLagChannel';

    public static URL = 'http://localhost:3000';
    public static ACTIONCABLE_URL = 'ws://localhost:3000';
    public static LIST_CLUSTERS = Constants.URL + '/kafka';
    public static DESCRIBE_CLUSTER = Constants.URL + '/kafka/:name';
    public static CLUSTER_NAMES = Constants.URL + '/clusters';
    public static DEFAULT_CLUSTER = Constants.URL + '/default';
    public static LIST_TOPICS = Constants.URL + '/kafka/list_topics/:name';
    public static GET_TOPICS_LIST = Constants.URL + '/topics/';
    public static PRODUCE_MESSAGE = Constants.URL + '/producer/:name';
    public static CONSUME_MESSAGE_ACTION_CABLE = Constants.ACTIONCABLE_URL + '/consumer-cable';
    public static CONSUMER_LAG_ACTION_CABLE = Constants.ACTIONCABLE_URL + '/consumer-lag-cable';
    public static CONSUMER_MESSAGE = Constants.URL + '/consumer/:name';
    public static TOPICS_DETAIL = Constants.URL + '/topic/:name';
    public static CREATE_TOPIC = Constants.URL + '/topic/:name';
    public static LIST_TOPIC_CONFIGS = Constants.URL + '/topics/list_topic_configs';
    public static TOPIC_LEVEL_CONFIGS = Constants.URL + '/topic-configs/:name/:topic';
    public static ADD_CLUSTER = Constants.URL + '/kafka';
    public static DELETE_CLUSTER = Constants.URL + '/kafka/:name';
    public static DELETE_TOPIC = Constants.URL + '/topic/:name/:topic';
    public static LIST_GROUPS = Constants.URL + '/group/:name';
    public static CONSUMER_LAG_MESSAGE = Constants.URL + '/group/:name/:group';
    public static BROKER_DETAILS = Constants.URL + '/broker/:name';

    public static TOPIC_CONFIGS = [
        {
            name: "Cleanup Policy",
            config: "cleanup.policy",
            type: "text",
            default: "delete",
            valid: ["compact", "delete"],
            serverDefault: "log.cleanup.policy",
            importance: "medium"
        }, {
            name: "Compression Type",
            config: "compression.type",
            type: "text",
            default: "producer",
            valid: ["uncompressed", "zstd", "lz4", "snappy", "gzip", "producer"],
            serverDefault: "compression.type",
            importance: "medium"
        }, {
            name: "Delete Retention",
            config: "delete.retention.ms",
            type: "number",
            default: 86400000,
            valid: "[0,...]",
            serverDefault: "log.cleaner.delete.retention.ms",
            importance: "medium"
        }, {
            name: "File delete delay ms",
            config: "file.delete.delay.ms",
            type: "number",
            default: 60000,
            valid: "[0,...]",
            serverDefault: "log.segment.delete.delay.ms",
            importance: "medium"
        }, {
            name: "Flush Messages",
            config: "flush.messages",
            type: "number",
            default: 9223372036854775807,
            valid: "[0,...]",
            serverDefault: "log.flush.interval.messages",
            importance: "medium"
        }, {
            name: "Flush ms",
            config: "flush.ms",
            type: "number",
            default: 9223372036854775807,
            valid: "[0,...]",
            serverDefault: "log.flush.interval.ms",
            importance: "medium"
        }, {
            name: "Follower Replication Throttled replicas",
            config: "follower.replication.throttled.replicas",
            type: "text",
            default: "",
            valid: "[partitionId]:[brokerId],[partitionId]:[brokerId]",
            serverDefault: "follower.replication.throttled.replicas",
            importance: "medium"
        }, {
            name: "Index Interval bytes",
            config: "index.interval.bytes",
            type: "number",
            default: 4096,
            valid: "[0,...]",
            serverDefault: "log.index.interval.bytes",
            importance: "medium"
        }, {
            name: "Leader Replication Throttled replicas",
            config: "leader.replication.throttled.replicas",
            type: "text",
            default: "",
            valid: "[partitionId]:[brokerId],[partitionId]:[brokerId]",
            serverDefault: "leader.replication.throttled.replicas",
            importance: "medium"
        }, {
            name: "Max compaction lag",
            config: "max.compaction.lag.ms",
            type: "number",
            default: 9223372036854775807,
            valid: "[1,...]",
            serverDefault: "log.cleaner.max.compaction.lag.ms",
            importance: "medium"
        }, {
            name: "Max message bytes",
            config: "max.message.bytes",
            type: "number",
            default: 1000012,
            valid: "[0,...]",
            serverDefault: "message.max.bytes",
            importance: "medium"
        }, {
            name: "Message format version",
            config: "message.format.version",
            type: "text",
            default: "2.4-IV1",
            valid: ["0.8.0", " 0.8.1", "0.8.2", "0.9.0", "0.10.0-IV0", "0.10.0-IV1", "0.10.1-IV0", "0.10.1-IV1", "0.10.1-IV2", "0.10.2-IV0", "0.11.0-IV0", "0.11.0-IV1", "0.11.0-IV2", "1.0-IV0", "1.1-IV0", "2.0-IV0", "2.0-IV1", "2.1-IV0", "2.1-IV1", "2.1-IV2", "2.2-IV0", "2.2-IV1", "2.3-IV0", "2.3-IV1", "2.4-IV0", "2.4-IV1"],
            serverDefault: "log.message.format.version",
            importance: "medium"
        }, {
            name: "Message timestamp difference",
            config: "message.timestamp.difference.max.ms",
            type: "number",
            default: 9223372036854775807,
            valid: "[0,...]",
            serverDefault: "log.message.timestamp.difference.max.ms",
            importance: "medium"
        }, {
            name: "Message timestamp type",
            config: "message.timestamp.type",
            type: "text",
            default: "CreateTimeValid",
            valid: ['CreateTime', 'LogAppendTime'],
            serverDefault: "log.message.timestamp.type",
            importance: "medium"
        }, {
            name: "Min cleanable dirty ratio",
            config: "min.cleanable.dirty.ratio",
            type: "number",
            default: 0.5,
            valid: "[0,...,1]",
            serverDefault: "log.cleaner.min.cleanable.ratio",
            importance: "medium"
        }, {
            name: "Min compaction lag",
            config: "min.compaction.lag.ms",
            type: "number",
            default: 0,
            valid: "[0,...]",
            serverDefault: "log.cleaner.min.compaction.lag.ms",
            importance: "medium"
        }, {
            name: "Min insync replicas",
            config: "min.insync.replicas",
            type: "number",
            default: 1,
            valid: "[1,...]",
            serverDefault: "min.insync.replicas",
            importance: "medium"
        }, {
            name: "Preallocate",
            config: "preallocate",
            type: "text",
            default: false,
            valid: [true, false],
            serverDefault: "log.preallocate",
            importance: "medium"
        }, {
            name: "Retention bytes",
            config: "retention.bytes",
            type: "number",
            default: -1,
            valid: "[-1,...]",
            serverDefault: "log.retention.bytes",
            importance: "medium"
        }, {
            name: "Retention ms",
            config: "retention.ms",
            type: "number",
            default: 604800000,
            valid: "[-1,...]",
            serverDefault: "log.retention.ms",
            importance: "medium"
        }, {
            name: "Segment bytes",
            config: "segment.bytes",
            type: "number",
            default: 1073741824,
            valid: "[14,...]",
            serverDefault: "log.segment.bytes",
            importance: "medium"
        }, {
            name: "Segment index bytes",
            config: "segment.index.bytes",
            type: "number",
            default: 10485760,
            valid: "[0,...]",
            serverDefault: "log.index.size.max.bytes",
            importance: "medium"
        }, {
            name: "Segment jitterms",
            config: "segment.jitter.ms",
            type: "number",
            default: 0,
            valid: "[0,...]",
            serverDefault: "log.roll.jitter.ms",
            importance: "medium"
        }, {
            name: "Segment ms",
            config: "segment.ms",
            type: "number",
            default: 604800000,
            valid: "[1,...]",
            serverDefault: "log.roll.ms",
            importance: "medium"
        }, {
            name: "Unclean leader election enable",
            config: "unclean.leader.election.enable",
            type: "text",
            default: false,
            valid: "[true, false]",
            serverDefault: "unclean.leader.election.enable",
            importance: "medium"
        }, {
            name: "Message down conversion enable",
            config: "message.downconversion.enable",
            type: "text",
            default: true,
            valid: "[true, false]",
            serverDefault: "log.message.downconversion.enable",
            importance: "low"
        }
    ]
};


