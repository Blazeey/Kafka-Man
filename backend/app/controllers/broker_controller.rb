class BrokerController < ApplicationController
    def details
        if !params[:cluster_name].present?
            render_response(400, 'Cluster name not present')
        elsif !params[:broker_id].present?
            render_response(400, 'Broker Id not present')
        else
            cluster = KAFKA_CLUSTERS[params[:cluster_name]]
            broker_id = params[:broker_id].to_i
            configs = cluster.describe_configs(broker_id, BROKER_CONFIGS)
            render_response(200, configs)
        end
    end

    def show
        if !params[:cluster_name].present?
            render_response(400, 'Cluster name not present')
        else
            cluster = KAFKA_CLUSTERS[params[:cluster_name]]
            brokers = {}
            cluster.brokers.each do |broker|
                configs = cluster.describe_configs(broker.node_id, BROKER_CONFIGS)
                topics = cluster.broker_topics(node_id: broker.node_id)
                brokers[broker.host + ':' + broker.port.to_s] = {
                    configs: configs,
                    topics: topics
                }
            end

            render_response(200, brokers)
        end
    end

    def topic_details
    end
end
