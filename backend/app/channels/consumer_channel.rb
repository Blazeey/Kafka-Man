class ConsumerChannel < ApplicationCable::Channel
    def subscribed
        stream_from "consumer_#{params[:cluster_name]}_#{params[:topic]}_#{params[:message_type]}_#{params[:key_type]}_#{params[:start_filter]}_#{params[:start_filter_value]}"
    end

    def unsubscribed
        puts "unsubscribed"
        consumerKey = "consumer_#{params[:cluster_name]}_#{params[:topic]}_#{params[:message_type]}_#{params[:key_type]}_#{params[:start_filter]}_#{params[:start_filter_value]}"
        RUNNING_CONSUMERS[consumerKey].stop
    end
end