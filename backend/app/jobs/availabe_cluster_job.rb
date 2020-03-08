class AvailableJob < ApplicationJob

    def perform
        availabe_clusters = []
        KAFKA_CLUSTERS.keys.each do |cluster|
            begin
                brokers = KAFKA_CLUSTERS[cluster].brokers
                availabe_clusters.push(cluster)
            rescue => exception
                puts "Cannot connect to cluster #{cluster}"
            end
        end
        AVAILABLE_CLUSTERS = availabe_clusters
    end
end