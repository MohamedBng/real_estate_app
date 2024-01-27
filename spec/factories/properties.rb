FactoryBot.define do
  factory :property do
    title { { "fr" => "Villa " + Faker::Address.community + " " + Faker::Color.color_name.capitalize, "en" => "Villa " + Faker::Address.community + " " + Faker::Color.color_name.capitalize } }
    description { { "fr" => Faker::Lorem.paragraph(sentence_count: 10), "en" => Faker::Lorem.paragraph(sentence_count: 10) } }
    price { Faker::Commerce.price(range: 100000..1000000) }
    bedrooms { Faker::Number.between(from: 1, to: 5) }
    bathrooms { Faker::Number.between(from: 1, to: 3) }
    area { Faker::Number.between(from: 20, to: 200) }
    property_type { ["maison", "appartement", "maisons_de_ville", "penthouses", "plots"].sample }
    status { ["vente", "location"].sample }
    address { build(:address) }

    trait :for_sale do
      status { "vente" }
    end

    trait :for_rent do
      status { "location" }
    end

    transient do
      case_test { true }
    end

    after(:build) do |property, evaluator|
      if evaluator.case_test
        property_photo = build(:property_photo, property: property, position: 1)
        property.property_photos << property_photo
      else
        5.times do |index|
          property_photo = build(:property_photo, property: property, position: index, use_fixture: false)
          property.property_photos << property_photo
        end
      end
    end
  end
end
