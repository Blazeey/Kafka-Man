class AddBrokerUriToKafkaCluster < ActiveRecord::Migration[5.2]
  def change
    add_column :kafka_clusters, :broker_uri, :string
  end
end
