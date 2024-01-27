class Address < ApplicationRecord
  geocoded_by :to_s
  after_validation :geocode
  after_validation :geocode_success

  belongs_to :property

  validates :street, :city, presence: true

  def to_s
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
