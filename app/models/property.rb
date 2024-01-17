class Property < ApplicationRecord
  has_many :property_photos, dependent: :destroy
  accepts_nested_attributes_for :property_photos, allow_destroy: true

  enum status: { vente: 0, location: 1 }
  enum property_type: { maison: 0, appartement: 1, maisons_de_ville: 3, penthouses: 4,  plots: 5}
  enum city: { Abou_Dabi: 0, Al_Ain: 1, Ajman: 2, Charjah: 3, Khor_Fakkan: 4, Dubaï: 5, Foudjaïrah: 6, Oumm_al_Qaïwaïn: 7, Ras_el_Khaïmah: 8}

  validates :title, :description, :price, :address, :bedrooms, :bathrooms, :area, :property_type, :status, presence: true

  validate :address_must_contain_street_and_city

  scope :ordered_by_most_recent, -> { order(created_at: :desc) }

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

  def street=(value)
    self.address ||= {}
    self.address['street'] = value
  end

  def city=(value)
    self.address ||= {}
    self.address['city'] = value
  end

  private

  def address_must_contain_street_and_city
    if address.present?
      errors.add(:address, 'doit inclure la rue') unless address['street'].present?
      errors.add(:address, 'doit inclure la ville') unless address['city'].present?
    else
      errors.add(:address, 'doit être présent')
    end
  end
end
