class Property < ApplicationRecord
  has_many :property_photos, dependent: :destroy
  accepts_nested_attributes_for :property_photos, allow_destroy: true

  enum status: { vente: 0, location: 1 }
  enum property_type: { maison: 0, appartement: 1, maisons_de_ville: 3, penthouses: 4,  plots: 5}
  enum city: { Abou_Dabi: 0, Al_Ain: 1, Ajman: 2, Charjah: 3, Khor_Fakkan: 4, Dubaï: 5, Foudjaïrah: 6, Oumm_al_Qaïwaïn: 7, Ras_el_Khaïmah: 8}

  validates :title, :description, :price, :address, :bedrooms, :bathrooms, :area, :property_type, :status, presence: true

  scope :ordered_by_most_recent, -> { order(created_at: :desc) }
end
