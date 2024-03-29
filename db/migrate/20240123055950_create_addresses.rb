class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.string :street
      t.string :city
      t.jsonb :latlon
      t.references :property, null: false, foreign_key: true

      t.timestamps
    end
  end
end
