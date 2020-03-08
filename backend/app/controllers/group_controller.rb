class GroupController < ApplicationController
    def show
        if !params[:cluster_name].present?
            render_response(400, 'Cluster name not present')
        else
            cluster = KAFKA_CLUSTERS[params[:cluster_name]]
            groups = cluster.groups
            groups_details = {}
            topic_offsets = {}
            groups.each do |g|
                begin
                    group = cluster.fetch_group_offsets(g)
                    group.keys.each do |topic|
                        if !topic_offsets[topic].present?
                            topic_offsets[topic] = cluster.last_offsets_for(topic)[topic]
                        end
                        topic_offsets[topic].keys.each do |p|
                            group[topic][p] = {
                                offset: group[topic][p].offset,
                                metadata: group[topic][p].metadata,
                                topic_offset: topic_offsets[topic][p]
                            }
                        end
                    end
                rescue => exception
                    puts exception
                end
                groups_details[g] = group
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
