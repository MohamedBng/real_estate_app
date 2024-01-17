class Api::V1::PropertiesController < Api::V1::BaseController
  def index
    @properties = Property.all

    apply_filters
  end

  def show
    @property = Property.find(params[:id])
  end

  private

  def apply_filters
    filter_params.each do |key, value|
      next unless value.present?

      case key
      when 'property_type', 'status'
        enum_value = Property.property_types[value.parameterize.underscore] if key == 'property_type'
        enum_value = Property.statuses[value.parameterize.underscore] if key == 'status'
        @properties = @properties.where(key => enum_value) if enum_value
      when 'city'
        enum_value = value.split(' ').map(&:capitalize).join('_')
        @properties = @properties.where("address->>'city' = ?", enum_value)
      when 'page'
        @properties = @properties.page(value).per(8)
      else
        @properties = @properties.where(key => value)
      end
    end
  end

  def filter_params
    params.permit(:city, :property_type, :status, :bedrooms, :bathrooms, :page)
  end
end
