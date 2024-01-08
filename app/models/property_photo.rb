class PropertyPhoto < ApplicationRecord
  include ImageUploader::Attachment(:file)
  belongs_to :property

  acts_as_list scope: :property

  scope :ordered, -> { order(position: :asc) }
end
