class ImageUploader < Shrine
  plugin :validation_helpers
  plugin :determine_mime_type

  plugin :store_dimensions

  plugin :derivatives, create_on_promote: true

  Attacher.validate do
    validate_mime_type_inclusion ['image/jpeg', 'image/png', 'image/gif']
    validate_max_size 5*1024*1024 # 5 Mo
  end

  Attacher.derivatives do |original|
    magick = ImageProcessing::MiniMagick.source(original)

    {
      large:  magick.resize_to_limit!(800, 800),
      medium: magick.resize_to_limit!(500, 500),
      small:  magick.resize_to_limit!(300, 300),
    }
  end
end
