class AdminUser < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable

  validates :first_name, :last_name, presence: true

  def skip_password_validation
    self.password = nil
    self.password_confirmation = nil
  end

  def self.ransackable_attributes(auth_object = nil)
    ['id', 'first_name', 'last_name', 'email', 'created_at', 'updated_at']
  end
end
