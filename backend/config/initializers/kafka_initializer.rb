KAFKA_CLUSTERS = {}
begin
    if KafkaCluster.first.present?
        kafka_clusters = KafkaCluster.all
        kafka_clusters.each do |cluster|
            KAFKA_CLUSTERS[cluster.name] = Kafka.new(cluster.broker_uri.split(","), client_id: "KafkaMan", logger: Rails.logger)
        end
    end
    AVAILABLE_CLUSTERS = KAFKA_CLUSTERS
    puts "Loaded DB"
rescue => exception
    # puts exception
end


