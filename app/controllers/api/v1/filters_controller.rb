class Api::V1::FiltersController < ApplicationController
  def index
    @property_statuses = Property.statuses.keys
    @property_types = Property.property_types.keys
    @cities = Address.pluck(:city).uniq
  end
end
