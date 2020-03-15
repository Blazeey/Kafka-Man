class TopicController < ApplicationController

    def index
        render_response(200, "Topic")
    end

    def show
        if !params[:cluster_name].present? || !KafkaCluster.exists?(:name => params[:cluster_name])
            render_response(400, 'Cluster name not present')
        else
            KAFKA_CLUSTERS[params[:cluster_name]].refresh_cluster
            topics = KAFKA_CLUSTERS[params[:cluster_name]].topics
            topics_list = []
            topics.each do |topic|
                topic_description = KAFKA_CLUSTERS[params[:cluster_name]].topic_statistics(topic: topic)
                topics_list.push(topic_description)
            end
            render_response(200, topics_list)
        end
    end

    def search_topic
        if !params[:cluster_name].present? || !KafkaCluster.exists?(:name => params[:cluster_name])
            render_response(400, 'Cluster name not present')
        else
            response = {}
            page_size = 50
            search  = params[:search]
            page = params[:page]
            KAFKA_CLUSTERS[params[:cluster_name]].refresh_cluster
            topics = KAFKA_CLUSTERS[params[:cluster_name]].topics
            topics = topics.select{ |topic| topic.start_with?(search) }
            response['next'] = (topics.count > page * page_size)
            start = (page - 1) * page_size
            topics = topics[start, start + page_size - 1]
            topics_list = []
            topics.each do |topic|
                topic_description = KAFKA_CLUSTERS[params[:cluster_name]].topic_statistics(topic: topic)
                topics_list.push(topic_description)
            end
            response['topics'] = topics_list
            render_response(200, response)
        end
    end

    def all_topics
        topics = {}
        KAFKA_CLUSTERS.keys.each do |cluster|
            begin
                KAFKA_CLUSTERS[cluster].refresh_cluster
                topics[cluster] = KAFKA_CLUSTERS[cluster].topics
            rescue => exception
                puts "Cannot connect to #{cluster} cluster."
            end
        end
        render_response(200, topics)
    end

    def create_topic
        if !params_valid
            render_response(400, 'Cluster name not present')
        else
            config = {}
            if params[:configs].present?
                params[:configs].keys.each do |k|
                    config[k] = params[:configs][k]
                end
            end
            KAFKA_CLUSTERS[params[:cluster_name]].create_topic(params[:topic_name], num_partitions: params[:partitions], replication_factor: params[:replication], config: config)
            KAFKA_CLUSTERS[params[:cluster_name]].refresh_cluster
            topic_statistics = KAFKA_CLUSTERS[params[:cluster_name]].topic_statistics(topic: params[:topic_name])
            render_response(200, topic_statistics)
        end
    end

    def delete_topic
        if !params_valid
            render_response(400, 'Cluster name not present')
        else
            KAFKA_CLUSTERS[params[:cluster_name]].refresh_cluster
            KAFKA_CLUSTERS[params[:cluster_name]].delete_topic(params[:name])
            render_response(200, 'Topic deleted')
        end
    end

    def list_topic_configs
        configs = {}
        TOPIC_DETAILS.keys.each { |t| configs[TOPIC_DETAILS[t]] = t }
        render_response(200, configs)
    end

    def get_topic_configs
        configs = {}
        if !params_valid
            render_response(400, 'Cluster name not present')
        else
            configs = KAFKA_CLUSTERS[params[:cluster_name]].describe_topic(params[:topic], TOPIC_DETAILS.keys)
            render_response(200, configs)
        end
    end

    def params_valid
        return params[:cluster_name].present? && KafkaCluster.exists?(:name => params[:cluster_name])
    end
    
end
