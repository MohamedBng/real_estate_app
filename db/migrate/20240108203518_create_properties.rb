class CreateProperties < ActiveRecord::Migration[7.0]
  def change
    create_table :properties do |t|
      t.jsonb :title, null: false
      t.jsonb :description, null: false
      t.decimal :price, null: false
      t.jsonb :address, null: false
      t.integer :bedrooms, null: false
      t.integer :bathrooms, null: false
      t.decimal :area, null: false
      t.integer :property_type, null: false
      t.integer :status, null: false

      t.timestamps
    end
  end
end
