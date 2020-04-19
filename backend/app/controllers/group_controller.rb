class GroupController < ApplicationController
    def show
        if !params[:cluster_name].present?
            render_response(400, 'Cluster name not present')
        else
            cluster = KAFKA_CLUSTERS[params[:cluster_name]]
            groups = cluster.groups
            page_size = 50
            search  = params[:search]
            page = params[:page].to_i
            groups_details = []
            topic_offsets = {}
            groups = groups.select{ |group| group.start_with?(search) }
            response['next'] = (groups.count > page * page_size)
            start = (page - 1) * page_size
            groups = groups[start, start + page_size - 1]
            groups.each do |g|
                begin
                    group = cluster.group_statistics(group_id: g)
                rescue => exception
                    group = { name: g, error: exception }
                end
                groups_details.push(group)
            end
            render_response(200, groups_details)
        end
    end

    def consumer_lag
        if !params[:cluster_name].present?
            render_response(400, 'Cluster name not present')
        elsif !params[:name].present?
            render_response(400, 'Group name not present')
        else
            GroupJob.perform_later(params)
            render_response(200, 'Consumer lag started')
        end
    end

    def list_groups
        if !params[:cluster_name].present?
            render_response(400, 'Cluster name not present')
        else
            cluster = KAFKA_CLUSTERS[params[:cluster_name]]
            groups = cluster.groups
            render_response(200, groups)
        end
    end

end
