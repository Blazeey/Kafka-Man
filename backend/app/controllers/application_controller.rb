class ApplicationController < ActionController::API
    SUCCESS_RESPONSE_CODES = [200, 204].freeze

    def render_response(status_code, message)
        if message.is_a?(Hash)
          render json: { statusCode: status_code, message: message }, status: status_code
        elsif SUCCESS_RESPONSE_CODES.include?(status_code)
          render json: { statusCode: status_code, message: message }, status: status_code
        else
          render json: { statusCode: status_code, error: message }, status: status_code
        end
    end

    def get_kafka_client(cluster_name: )
      k = KafkaCluster.find_by(name: cluster_name)
      kafka = Kafka.new(k.broker_uri.split(","), client_id: "KafkaMan", logger: Rails.logger)
    end
end
