class ConsumerController < ApplicationController
    def consume
        if !params[:cluster_name].present? 
            render_response(400, 'Cluster name not present')
        elsif !params[:topic].present?
            render_response(400, 'Topic not present')
        end
        ConsumerJob.perform_later(params)
        render_response(200, 'Consumer started')
    end

end
