class CreateKafkaClusters < ActiveRecord::Migration[5.2]
  def change
    create_table :kafka_clusters do |t|

      t.timestamps
    end
  end
end
