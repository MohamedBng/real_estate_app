require 'rails_helper'

RSpec.describe Address, type: :model do
  before do
    Geocoder::Lookup::Test.add_stub(
      "Rue de Rivoli, Paris", [
        {
          'coordinates'  => [48.8566, 2.3522],
          'address'      => 'Rue de Rivoli, Paris, France',
          'city'         => 'Paris',
          'country'      => 'France',
          'country_code' => 'FR'
        }
      ]
    )

    Geocoder::Lookup::Test.add_stub("Adresse incorrecte, Paris", [])
  end

  it { should belong_to(:property) }
  it { should validate_presence_of(:street) }
  it { should validate_presence_of(:city) }
  it { should validate_presence_of(:latlon) }

  it "geocodes the address correctly" do
    address = Address.new(street: "Rue de Rivoli", city: "Paris")
    address.valid?
    expect(address.latlon['lat']).to eq(48.8566)
    expect(address.latlon['lon']).to eq(2.3522)
  end

  it "fails to geocode an incorrect address" do
    address = Address.new(street: "Adresse incorrecte", city: "Paris")
    address.valid?
    expect(address.latlon).to be_nil
  end

  it "adds an error if the address cannot be geocoded" do
    address = Address.new(street: "Adresse incorrecte", city: "Paris")
    expect(address.valid?).to be false
  end

  context 'update' do
    it 'adds an error if the address cannot be geocoded' do
      address = Address.new(street: "Rue de Rivoli", city: "Paris")
      address.update(street: "Adresse incorrecte", city: "Paris")

      expect(address.latlon).to be_nil
      expect(address.errors).to be_present
    end
  end
end
