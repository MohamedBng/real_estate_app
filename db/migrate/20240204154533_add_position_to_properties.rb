class AddPositionToProperties < ActiveRecord::Migration[7.0]
  def change
    add_column :properties, :position, :integer, null: true

    Property.order(:id).each.with_index(1) do |property, index|
      property.update_column(:position, index)
    end

    change_column_null :properties, :position, false
  end
end
