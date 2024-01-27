class Property < ApplicationRecord
  has_many :property_photos, dependent: :destroy
  has_one :address, dependent: :destroy
  accepts_nested_attributes_for :property_photos, allow_destroy: true
  accepts_nested_attributes_for :address, allow_destroy: true

  enum status: { vente: 0, location: 1 }
  enum property_type: { maison: 0, appartement: 1, maisons_de_ville: 3, penthouses: 4,  plots: 5}

  validates :title, :description, :price, :bedrooms, :bathrooms, :area, :property_type, :status, presence: true

  validate :title_presence
  validate :description_presence

  scope :ordered_by_most_recent, -> { order(created_at: :desc) }
  scope :by_city, -> (city) {
    joins(:address).where('addresses.city ILIKE ?', "%#{city}%")
  }

  def self.ransackable_associations(auth_object = nil)
    super + ['property_photos']
  end

  def self.ransackable_attributes(auth_object = nil)
    ['city', 'property_type', 'status', 'title']
  end

  def title_fr=(value)
    self.title ||= {}
    self.title['fr'] = value
  end

  def title_en=(value)
    self.title ||= {}
    self.title['en'] = value
  end

  def description_fr=(value)
    self.description ||= {}
    self.description['fr'] = value
  end

  def description_en=(value)
    self.description ||= {}
    self.description['en'] = value
  end

  private

  def title_presence
    errors.add(:title, 'French title must be present') if title['fr'].blank?
    errors.add(:title, 'English title must be present') if title['en'].blank?
  end

  def description_presence
    errors.add(:description, 'French description must be present') if description['fr'].blank?
    errors.add(:description, 'English description must be present') if description['en'].blank?
  end
end
