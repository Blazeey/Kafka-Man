class MetricsController < ApplicationController
    def topic_metrics
        if !params[:cluster_name].present?
            render_response(400, 'Cluster name not present')
        else
            cluster = KAFKA_CLUSTERS[params[:cluster_name]]
            topics = cluster.topics

            topics.each do |topic|
                
            end
        end
    end

    def broker_metrics
    end
end
