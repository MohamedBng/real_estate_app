class Api::V1::PropertiesController < Api::V1::BaseController
  def index
    @properties = Property.all

    apply_filters

    # @status_enum = Property.statuses.keys
    # @property_type_enum = Property.property_types.keys
    # @cities = Property.cities.keys
  end

  def show
    @property = Property.find(params[:id])
  end

  private

  def apply_filters
    filter_params.each do |key, value|
      @properties = @properties.where(key => value) if value.present?
    end
  end

  def filter_params
    params.permit(:city, :property_type, :status, :bedrooms, :bathrooms)
  end
end
