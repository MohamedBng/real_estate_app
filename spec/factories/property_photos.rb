require 'open-uri'

FactoryBot.define do
  factory :property_photo do
    association :property

    after(:build) do |property_photo|
      image_url = "https://source.unsplash.com/random/800x600/?house"
      downloaded_image = URI.open(image_url)

      temp_file = Tempfile.new(['property_photo', '.jpg'])
      IO.copy_stream(downloaded_image, temp_file.path)

      property_photo.file = temp_file
    end
  end
end
