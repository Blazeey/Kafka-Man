class AddUniqueToName < ActiveRecord::Migration[5.2]
    def change
        add_index :kafka_clusters, :name, :unique => true
    end
  end
  