class ProducerController < ApplicationController
    def index
        render_response(200, "Heyyy")
    end

    def produce
        kafka = KAFKA_CLUSTERS[params[:cluster_name]]
        type = params[:type]
        if type == 'json'
            message = params[:message].to_json
        else
            message = params[:message]
        end
        args = {}
        if params[:key].present?
            args[:key] = params[:key]
        elsif params[:partition_key].present?
            args[:partition_key] = params[:partition_key]
        elsif params[:partition].present?
            args[:partition] = params[:partition]
        end
        compression_codec = params[:compression] == 'nil'? nil: params[:compression].to_sym
        topic = params[:topic]
        headers = params[:headers]
        count = params[:count]
        
        producer = kafka.async_producer(compression_codec: compression_codec, compression_threshold: 1000)
        count.times do |n|
            producer.produce(message, topic: topic, **args)
        end
        producer.deliver_messages
        producer.shutdown
        render_response(200, "Produced Message")
    end
end
