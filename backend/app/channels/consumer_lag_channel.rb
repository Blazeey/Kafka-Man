class ConsumerLagChannel < ApplicationCable::Channel
    def subscribed
        stream_from "consumer_lag_#{params[:cluster_name]}_#{params[:group]}"
    end

    def unsubscribed
        puts "unsubscribed"
        consumer_lag_key = "consumer_lag_#{params[:cluster_name]}_#{params[:group]}"
        RUNNING_CONSUMER_LAGS[consumer_lag_key].stop
    end
end