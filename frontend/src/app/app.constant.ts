export class Constants {
    public static MENUS = [
        { name: 'Clusters', route: '/clusters' },
        { name: 'Producer', route: '/producer' },
        { name: 'Consumer', route: '/consumer' },
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
        // { name: 'yaml', value: 'text/x-yaml' },
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
        // { name: 'yaml', value: 'text/x-yaml' },
        { name: 'number', value: 'text/plain' },
        { name: 'bytes', value: 'text/plain' }
    ]

    public static MESSAGE_DESERIALIZATION_TYPE = [
        { name: 'text', value: 'text/plain' },
        { name: 'json', value: 'application/ld+json' },
        { name: 'xml', value: 'application/xml' },
        // { name: 'yaml', value: 'text/x-yaml' },
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
    public static TOPICS_CHANNEL = 'TopicsChannel';

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
    public static SEARCH_TOPICS = Constants.URL + '/search-topics/:name';
    public static CONSUMER_LAG_ACTION_CABLE = Constants.ACTIONCABLE_URL + '/consumer-lag-cable';
    public static CONSUMER_MESSAGE = Constants.URL + '/consumer/:name';
    public static TOPICS_DETAIL = Constants.URL + '/topic/:name';
    public static CREATE_TOPIC = Constants.URL + '/topic/:name';
    public static LIST_TOPIC_CONFIGS = Constants.URL + '/topics/list_topic_configs';
    public static TOPIC_LEVEL_CONFIGS = Constants.URL + '/topic-configs/:name/:topic';
    public static ADD_CLUSTER = Constants.URL + '/kafka';
    public static DELETE_CLUSTER = Constants.URL + '/kafka/:name';
    public static DELETE_TOPIC = Constants.URL + '/delete-topic/:name/:topic';
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

    // MOCK DATA

    public static LIST_CLUSTERS_MOCK = {
        "statusCode": 200,
        "message": [
            {
                "brokers": [
                    {
                        "node_id": 2,
                        "host": "0.0.0.0",
                        "port": 9093
                    },
                    {
                        "node_id": 1,
                        "host": "0.0.0.0",
                        "port": 9092
                    }
                ],
                "controller_broker": {
                    "node_id": 2,
                    "host": "0.0.0.0",
                    "port": 9093
                },
                "partitions_per_broker": {
                    "1": 10,
                    "2": 10
                },
                "count": 20,
                "average": 10,
                "max": 10,
                "min": 10,
                "cluster_name": "local",
                "is_connected": true
            }
        ]
    }

    public static GET_TOPICS_LIST_MOCK = {
        "statusCode": 200,
        "message": {
            "local": [
                "first",
                "second",
                "three",
                "four"
            ],
            "New-cluster": [
                "one",
                "two",
                "three",
                "four"
            ]
        }
    }

    public static CONSUME_MESSAGES_MOCK = [
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
        {"value": "{\"a\": \"b\",\"c\": \"d\"}", "partition": 3, "key": null, "headers": {}, "offset": 98, "creation_timestamp": "2020-03-14T23:25:50.600+05:30"},
    ]

    public static CLUSTER_NAMES_MOCK = {
        "statusCode": 200,
        "message": [
            "local",
            "dummy2",
            "dummy3"
        ]
    }

    public static LIST_TOPIC_CONFIGS_MOCK = {
        "statusCode": 200,
        "message": {
            "Cleanup Policy": "cleanup.policy",
            "Compression Type": "compression.type",
            "Delete Retention": "delete.retention.ms",
            "File delete delay ms": "file.delete.delay.ms",
            "Flush Messages": "flush.messages",
            "Flush ms": "flush.ms",
            "Follower Replication Throttled replicas": "follower.replication.throttled.replicas",
            "Index Interval bytes": "index.interval.bytes",
            "Leader Replication Throttled replicas": "leader.replication.throttled.replicas",
            "Max compaction lag": "max.compaction.lag.ms",
            "Max message bytes": "max.message.bytes",
            "Message format version": "message.format.version",
            "Message timestamp difference": "message.timestamp.difference.max.ms",
            "Message timestamp type": "message.timestamp.type",
            "Min cleanable dirty ratio": "min.cleanable.dirty.ratio",
            "Min compaction lag": "min.compaction.lag.ms",
            "Min insync replicas": "min.insync.replicas",
            "Preallocate": "preallocate",
            "Retention bytes": "retention.bytes",
            "Retention ms": "retention.ms",
            "Segment bytes": "segment.bytes",
            "Segment index bytes": "segment.index.bytes",
            "Segment jitterms": "segment.jitter.ms",
            "Segment ms": "segment.ms",
            "Unclean leader election enable": "unclean.leader.election.enable",
            "Message down conversion enable": "message.downconversion.enable"
        }
    }

    public static TOPIC_DETAILS_MOCK = {
        "statusCode": 200,
        "message": {
            "topics": [
                {
                    "name": "first",
                    "partitions": [
                        {
                            "partition_error_code": 0,
                            "partition_id": 0,
                            "leader": 1,
                            "replicas": [
                                1,
                                2
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 1,
                            "leader": 2,
                            "replicas": [
                                2,
                                1
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 2,
                            "leader": 1,
                            "replicas": [
                                1,
                                2
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 3,
                            "leader": 2,
                            "replicas": [
                                2,
                                1
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 4,
                            "leader": 1,
                            "replicas": [
                                1,
                                2
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 5,
                            "leader": 2,
                            "replicas": [
                                2,
                                1
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 6,
                            "leader": 1,
                            "replicas": [
                                1,
                                2
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 7,
                            "leader": 2,
                            "replicas": [
                                2,
                                1
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 8,
                            "leader": 1,
                            "replicas": [
                                1,
                                2
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 9,
                            "leader": 2,
                            "replicas": [
                                2,
                                1
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        }
                    ],
                    "offsets": {
                        "0": 113,
                        "8": 96,
                        "2": 90,
                        "4": 97,
                        "6": 98,
                        "5": 102,
                        "9": 95,
                        "1": 101,
                        "7": 108,
                        "3": 100
                    },
                    "count": 1000,
                    "average": 100,
                    "max": 113,
                    "min": 90,
                    "percentile": 110.75,
                    "below_min_isr": 0,
                    "avg_isr": 2
                },
                {
                    "name": "second",
                    "partitions": [
                        {
                            "partition_error_code": 0,
                            "partition_id": 0,
                            "leader": 2,
                            "replicas": [
                                2,
                                1
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 1,
                            "leader": 1,
                            "replicas": [
                                1,
                                2
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 2,
                            "leader": 2,
                            "replicas": [
                                2,
                                1
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 3,
                            "leader": 1,
                            "replicas": [
                                1,
                                2
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 4,
                            "leader": 2,
                            "replicas": [
                                2,
                                1
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 5,
                            "leader": 1,
                            "replicas": [
                                1,
                                2
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 6,
                            "leader": 2,
                            "replicas": [
                                2,
                                1
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 7,
                            "leader": 1,
                            "replicas": [
                                1,
                                2
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 8,
                            "leader": 2,
                            "replicas": [
                                2,
                                1
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        },
                        {
                            "partition_error_code": 0,
                            "partition_id": 9,
                            "leader": 1,
                            "replicas": [
                                1,
                                2
                            ],
                            "isr": [
                                1,
                                2
                            ]
                        }
                    ],
                    "offsets": {
                        "0": 0,
                        "8": 0,
                        "2": 0,
                        "4": 0,
                        "6": 0,
                        "5": 0,
                        "9": 0,
                        "1": 0,
                        "7": 0,
                        "3": 0
                    },
                    "count": 0,
                    "average": 0,
                    "max": 0,
                    "min": 0,
                    "percentile": 0.0,
                    "below_min_isr": 0,
                    "avg_isr": 2
                }
            ],
            "next": false
        }
    }

    public static TOPIC_LEVEL_CONFIGS_MOCK = {
        "statusCode": 200,
        "message": {
            "compression.type": "producer",
            "leader.replication.throttled.replicas": "",
            "message.downconversion.enable": "true",
            "min.insync.replicas": "1",
            "segment.jitter.ms": "0",
            "cleanup.policy": "delete",
            "flush.ms": "9223372036854775807",
            "follower.replication.throttled.replicas": "",
            "segment.bytes": "1073741824",
            "retention.ms": "604800000",
            "flush.messages": "9223372036854775807",
            "message.format.version": "2.3-IV1",
            "file.delete.delay.ms": "60000",
            "max.compaction.lag.ms": "9223372036854775807",
            "max.message.bytes": "1000012",
            "min.compaction.lag.ms": "0",
            "message.timestamp.type": "CreateTime",
            "preallocate": "false",
            "min.cleanable.dirty.ratio": "0.5",
            "index.interval.bytes": "4096",
            "unclean.leader.election.enable": "false",
            "retention.bytes": "-1",
            "delete.retention.ms": "86400000",
            "segment.ms": "604800000",
            "message.timestamp.difference.max.ms": "9223372036854775807",
            "segment.index.bytes": "10485760"
        }
    }
};


