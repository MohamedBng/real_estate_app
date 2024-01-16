class Api::V1::CitiesController < Api::V1::BaseController
  def index
    @cities = Property.cities.keys
  end
end
