require 'rails_helper'

RSpec.describe Property, type: :model do
  it { should have_many(:property_photos).dependent(:destroy) }

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:price) }
  it { should validate_presence_of(:address) }
  it { should validate_presence_of(:bedrooms) }
  it { should validate_presence_of(:bathrooms) }
  it { should validate_presence_of(:area) }
  it { should validate_presence_of(:property_type) }
  it { should validate_presence_of(:status) }

  it { should define_enum_for(:status).with_values(vente: 0, location: 1) }
  it { should define_enum_for(:property_type).with_values(maison: 0, appartement: 1, maisons_de_ville: 3, penthouses: 4,  plots: 5) }

  describe 'validations address' do
    it 'is not valid without a street in address' do
      property = Property.new(address: { city: 'Paris' })
      expect(property.valid?).to be false
      expect(property.errors[:address]).to include('doit inclure la rue')
    end

    it 'is not valid without a city in address' do
      property = Property.new(address: { street: '123 Rue de la Paix' })
      expect(property.valid?).to be false
      expect(property.errors[:address]).to include('doit inclure la ville')
    end

    it 'is valid with both street and city in address' do
      property = Property.new(address: { street: '123 Rue de la Paix', city: 'Paris' })
      property.valid?
      expect(property.errors[:address]).to be_empty
    end
  end
end
