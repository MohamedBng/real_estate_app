class ChangePositionColumnInPropertyPhotos < ActiveRecord::Migration[7.0]
  def up
    remove_index :property_photos, name: "index_property_photos_on_property_id_and_position"
    change_column :property_photos, :position, :integer, null: false
  end

  def down
    change_column :property_photos, :position, :integer, null: true
    add_index :property_photos, ["property_id", "position"], name: "index_property_photos_on_property_id_and_position", unique: true
  end
end
