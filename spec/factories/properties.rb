FactoryBot.define do
  factory :property do
    title { { "fr" => "Villa " + Faker::Address.community + " " + Faker::Color.color_name.capitalize, "en" => "Villa " + Faker::Address.community + " " + Faker::Color.color_name.capitalize } }
    description { { "fr" => Faker::Lorem.paragraph(sentence_count: 10), "en" => Faker::Lorem.paragraph(sentence_count: 10) } }
    price { Faker::Commerce.price(range: 100000..1000000) }
    address { { "street" => Faker::Address.street_address, "city" => ["Abou_Dabi", "Al_Ain", "Ajman", "Charjah", "Khor_Fakkan", "Dubaï", "Foudjaïrah", "Oumm_al_Qaïwaïn", "Ras_el_Khaïmah"].sample } }
    bedrooms { Faker::Number.between(from: 1, to: 5) }
    bathrooms { Faker::Number.between(from: 1, to: 3) }
    area { Faker::Number.between(from: 20, to: 200) }
    property_type { ["maison", "appartement", "maisons_de_ville", "penthouses", "plots"].sample }
    status { ["vente", "location"].sample }

    trait :for_sale do
      status { "vente" }
    end

    trait :for_rent do
      status { "location" }
    end

    after(:build) do |property|
      5.times do |index|
        property_photo = build(:property_photo, property: property, position: index)
        property.property_photos << property_photo
      end
    end
  end
end
