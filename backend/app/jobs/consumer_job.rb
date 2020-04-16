require 'date'

class ConsumerJob < ApplicationJob
    
    def perform(params)
        puts "performing job"
        kafka = KAFKA_CLUSTERS[params[:cluster_name]]
        # k = KafkaCluster.find_by(name: params[:cluster_name])
        # kafka = Kafka.new(k.broker_uri.split(","), client_id: "KafkaMan", logger: Rails.logger)
        cluster_name = params[:cluster_name]
        topic = params[:topic]
        message_type = params[:message_type]
        key_type = params[:key_type]
        start_filter = params[:start_filter]
        start_filter_value = params[:start_filter_value]

        options = {}
        if start_filter == 'consumer-group'
            consumer = kafka.consumer(group_id: start_filter_value)
            consumer.subscribe(topic, start_from_beginning: false)
        else
            consumer = kafka
            options[:topic] = topic
            options[:start_from_beginning] = true
        end

        if start_filter == 'latest'
            options[:start_from_beginning] = false
        end

        checks = {}
        checks[:message_type] = message_type
        checks[:key_type] = key_type

        if start_filter == 'offset'
            checks[:offset] = start_filter_value
        elsif start_filter == 'previous-x'
            previous_offset = kafka.last_offsets_for(topic)[topic]
            previous_offset.keys.each do |partition|
                previous_offset[partition] = previous_offset[partition].to_i - start_filter_value.to_i
            end
            checks[:previous_offset] = previous_offset
        end

        if start_filter == 'today'
            checks[:today] = DateTime.now.midnight
        elsif start_filter == 'last-hour'
            checks[:last_hour] = DateTime.now - (1/24.0)
        elsif start_filter == 'specific-date'
            checks[:date] = start_filter_value
        end

        consumer_key = "consumer_#{cluster_name}_#{topic}_#{message_type}_#{key_type}_#{start_filter}_#{start_filter_value}"

        RUNNING_CONSUMERS[consumer_key] = consumer
        consumer.each_message(**options) do |message|
            
            if start_filter(checks: checks, message: message) && message_filter('key', value: checks[:key_type], message: message.key) && message_filter('value', value: checks[:message_type], message: message.value)
                ActionCable.server.broadcast consumer_key, {
                    value: message.value,
                    partition: message.partition,
                    key: message.key,
                    headers: message.headers,
                    offset: message.offset,
                    creation_timestamp: message.create_time
                }
            end
        end
        puts "Consumer stopped : #{consumer_key}"
    end

    def start_filter(checks: , message: )
        if checks[:offset].present?
            return message.offset >= checks[:offset].to_i
        elsif checks[:previous_offset].present?
            return message.offset > checks[:previous_offset][message.partition]
        elsif checks[:today].present?
            return DateTime.parse(message.create_time.to_s) >= checks[:today]
        elsif checks[:last_hour].present?
            return DateTime.parse(message.create_time.to_s) >= checks[:last_hour]
        elsif checks[:date].present?
            return DateTime.parse(message.create_time.to_s) >= DateTime.parse(checks[:date])
        else
            return true
        end
    end

    def message_filter(type , value: , message: )
        if value == 'json'
            return valid_json?(message)
        elsif value == 'xml'
            return valid_xml?(message)
        elsif value == 'number'
            return valid_number?(message)
        elsif value == 'bytes'
            # TODO: Do byte conversion
            return true
        else
            return true
        end
    end

    def valid_json?(json)
        JSON.parse(json)
        return true
      rescue JSON::ParserError => e
        return false
    end

    def valid_xml?(xml)
        begin
            Hash.from_xml(xml)
            return true
        rescue => exception
            return false
        end
    end

    def valid_number?(number)
        begin
            Float(number)
            return true
        rescue
            return false
        end
    end
end