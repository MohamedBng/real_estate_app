require 'open-uri'

FactoryBot.define do
  factory :property_photo do
    association :property

    transient do
      use_fixture { true }
    end

    after(:build) do |property_photo, evaluator|
      if evaluator.use_fixture
        property_photo.file = Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/images/image.jpg'), 'image/jpeg')
      else
        image_url = "https://source.unsplash.com/random/800x600/?house"
        downloaded_image = URI.open(image_url)

        temp_file = Tempfile.new(['property_photo', '.jpg'])
        IO.copy_stream(downloaded_image, temp_file.path)

        property_photo.file = temp_file
      end
    end
  end
end

