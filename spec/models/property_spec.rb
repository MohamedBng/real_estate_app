require 'rails_helper'

RSpec.describe Property, type: :model do
  it { should have_many(:property_photos).dependent(:destroy) }
  it { should have_one(:address).dependent(:destroy) }

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:price) }
  it { should validate_presence_of(:bedrooms) }
  it { should validate_presence_of(:bathrooms) }
  it { should validate_presence_of(:area) }
  it { should validate_presence_of(:property_type) }
  it { should validate_presence_of(:status) }

  it { should define_enum_for(:status).with_values(vente: 0, location: 1) }
  it { should define_enum_for(:property_type).with_values(maison: 0, appartement: 1, maisons_de_ville: 3, penthouses: 4,  plots: 5) }
end
