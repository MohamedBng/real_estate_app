class Api::V1::CitiesController < Api::V1::BaseController
  def index
    @cities = Address.pluck(:city).uniq
  end
end
