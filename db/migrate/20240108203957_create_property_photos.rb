class CreatePropertyPhotos < ActiveRecord::Migration[7.0]
  def change
    create_table :property_photos do |t|
      t.bigint :property_id, null: false
      t.text :file_data
      t.integer :position

      t.timestamps
    end

    add_index :property_photos, [:property_id, :position], unique: true, name: 'index_property_photos_on_property_id_and_position'
    add_index :property_photos, :property_id, name: 'index_property_photos_on_property_id'
  end
end
