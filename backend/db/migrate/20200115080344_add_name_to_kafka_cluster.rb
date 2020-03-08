class AddNameToKafkaCluster < ActiveRecord::Migration[5.2]
  def change
    add_column :kafka_clusters, :name, :string
  end
end
