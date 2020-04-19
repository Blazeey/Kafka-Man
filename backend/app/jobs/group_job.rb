class GroupJob < ApplicationJob
    
    def perform(params)
        puts 'Performing Job - GroupJob'

        k = KafkaCluster.find_by(name: params[:cluster_name])
        cluster = Kafka.new(k.broker_uri.split(","), client_id: "KafkaMan", logger: Rails.logger)
        topic = params[:topic]
        group = params[:name]
        consumer_lag_key = "consumer_lag_#{params[:cluster_name]}_#{group}"
        consumer_lag = cluster.consumer_lag(group_id: group, poll_duration: 10)
        RUNNING_CONSUMER_LAGS[consumer_lag_key] = consumer_lag
        consumer_lag.fetch_lags do |group_lag|
            puts group_lag
            ActionCable.server.broadcast consumer_lag_key, group_lag
        end

        puts "Consumer Lag stopped : #{consumer_lag_key}"
    end
end