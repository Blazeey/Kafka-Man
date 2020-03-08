Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope format: false, constraints: { :cluster_name => /.+/, :topic => /.+/ } do
    mount ActionCable.server => '/consumer-cable'
    mount ActionCable.server => '/consumer-lag-cable'

    resources :producer
    resources :kafka, param: :cluster_name
    resources :topic, param: :cluster_name
    resources :group, param: :cluster_name
    resources :broker, param: :cluster_name

    post '/producer/:cluster_name', to: 'producer#produce', as: 'produce_message'
    get '/kafka/list_topics/:cluster_name', to: 'kafka#list_topics', as: 'list_topics'
    get '/consumer/:cluster_name', to: 'consumer#consume', as: 'consume'
    get '/topic/:cluster_name', to: 'topic#list_topics', as: 'list_topic_details'
    post '/topic/:cluster_name', to: 'topic#create_topic', as: 'create_topic'
    get '/topics/list_topic_configs', to: 'topic#list_topic_configs', as: 'list_topic_configs'
    get '/topics', to: 'topic#all_topics', as: 'list_all_topic'
    delete '/topic/:cluster_name/:name', to: 'topic#delete_topic', as: 'delete_topic'
    get '/group/:cluster_name/:name', to: 'group#consumer_lag', as: 'consumer_lag'
    get 'groups/:cluster_name', to: 'group#list_groups', as: 'cluster_groups'
    get '/broker/:cluster_name/:broker_id', to: 'broker#details', as: 'broker_configs'
    get '/topic-configs/:cluster_name/:topic', to: 'topic#get_topic_configs', as: 'topic_configs'
    get '/default', to: 'kafka#default', as: 'default_cluster'
    get '/clusters', to: 'kafka#list_clusters', as: 'cluster_names'
  end
end
