class KafkaController < ApplicationController

    def index
        cluster_list = []

        KAFKA_CLUSTERS.keys.each do |cluster_name|
            cluster = {}
            cluster[:cluster_name] = cluster_name
            begin
                cluster_client = KAFKA_CLUSTERS[cluster_name]
                broker_details = cluster_client.broker_details
                cluster.reverse_merge!(broker_details)
                cluster['is_connected'] = true
            rescue => exception
                cluster['is_connected'] = false
                puts exception
            end
            cluster_list.push(cluster)
        end
    
        render_response(200, cluster_list)
    end

    def default
        cluster_name = ''
        begin
            cluster_name = KafkaCluster.all.first.name
            render_response(200, cluster_name)
        rescue => exception
            render_response(400, 'No clusters found')
        end
    end

    def create
        if !params[:cluster].present?
            render_response(500, "Cluster details not present")
        end
        cluster_details = params[:cluster]
        if KafkaCluster.exists?(:name => cluster_details[:cluster_name])
            render_response(400, error: "Cluster name already exist")
        else
            begin
                k = Kafka.new(cluster_details[:broker_uri].split(","), client_id: "Kafka Manager", logger: Rails.logger)
                k.brokers
                kafka = KafkaCluster.create(name: cluster_details[:cluster_name], broker_uri: cluster_details[:broker_uri])
                KAFKA_CLUSTERS[cluster_details[:cluster_name]] = k
                cluster = {}
                cluster[:cluster_name] = cluster_details[:cluster_name]
                cluster['is_connected'] = true
                broker_details = k.broker_details
                cluster.reverse_merge!(broker_details)
                render_response(200, cluster)
            rescue => exception
                render_response(400, 'Cannot connect to brokers')
            end
        end
    end

    def destroy
        if !params[:cluster_name].present?
            render_response(400, 'Cluster name should be specified')
        else
            if !KafkaCluster.exists?(:name => params[:cluster_name])
                render_response(400, error: "Cluster does not exist")
            else
                KafkaCluster.where(:name => params[:cluster_name]).delete_all
                KAFKA_CLUSTERS.delete(params[:cluster_name])
                render_response(200, 'Cluster Deleted')
            end
        end
    end

    def show
        if !params[:cluster_name].present? || !KafkaCluster.exists?(:cluster_name => params[:cluster_name])
            render_response(400, 'Cluster name not present')
        else
            cluster = KafkaCluster.where(:cluster_name => params[:cluster_name]).first
            render_response(200, message: cluster)
        end
    end

    def list_topics
        if !params[:cluster_name].present? || !KafkaCluster.exists?(:cluster_name => params[:cluster_name])
            render_response(400, 'Cluster name not present')
        else
            topics = KAFKA_CLUSTERS[params[:cluster_name]].topics
            render_response(200, topics)
        end
    end

    def list_clusters
        clusters = KafkaCluster.all.map(&:name)
        render_response(200, clusters)
    end
end