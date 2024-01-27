class Address < ApplicationRecord
  geocoded_by :to_s
  before_validation :geocode
  validate :geocode_check

  attr_accessor :temp_latitude, :temp_longitude

  belongs_to :property

  validates :street, :city, :latlon, presence: true

  def to_s
    [street, city].compact.join(', ')
  end

  def geocode
    if self.street.present? && self.city.present?
      results = Geocoder.search(to_s)
      if results.any?
        self.temp_latitude = results.first.latitude
        self.temp_longitude = results.first.longitude
      end
    end
  end

  private

  def geocode_check
    if temp_latitude.present? && temp_longitude.present?
      self.latlon = { 'lat' => temp_latitude, 'lon' => temp_longitude }
    else
      self.latlon = nil
      errors.add(:address, "L'adresse n'a pas pu être géocodée.")
    end
  end
end
