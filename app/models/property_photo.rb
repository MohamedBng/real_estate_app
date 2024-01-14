class PropertyPhoto < ApplicationRecord
  include ImageUploader::Attachment(:file)
  belongs_to :property
  acts_as_list scope: :property

  scope :ordered, -> { order(position: :asc) }

  def self.ransackable_attributes(auth_object = nil)
    ["created_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["property"]
  end
end
