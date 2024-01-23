class Address < ApplicationRecord
  geocoded_by :address
  after_validation :geocode

  belongs_to :property

  validate :geocode_success

  def address
    [street, city].compact.join(', ')
  end

  def latitude
    latlon && latlon['lat']
  end

  def latitude=(value)
    self.latlon = (latlon || {}).merge('lat' => value)
  end

  def longitude
    latlon && latlon['lon']
  end

  def longitude=(value)
    self.latlon = (latlon || {}).merge('lon' => value)
  end

  private

  def geocode_success
    if latlon.nil? || latlon['lat'].nil? || latlon['lon'].nil?
      errors.add(:address, 'could not be geocoded')
    end
  end
end
