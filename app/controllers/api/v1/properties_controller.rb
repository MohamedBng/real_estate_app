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
      if value.present?
        if key == 'property_type' || key == 'status'
          enum_value = Property.property_types[value.parameterize.underscore]
          @properties = @properties.where(property_type: enum_value) if enum_value
        elsif key == 'city'
          @properties = @properties.where("address->>'city' = ?", value)
        else
          @properties = @properties.where(key => value)
        end
      end
    end
  end


  def filter_params
    params.permit(:city, :property_type, :status, :bedrooms, :bathrooms)
  end
end
