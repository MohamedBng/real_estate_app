require 'factory_bot_rails'

puts "Creating 10 properties..."

5.times do
  FactoryBot.create(:property, :for_sale)
end

5.times do
  FactoryBot.create(:property, :for_rent)
end

puts "Creating 10 properties... Done!"

puts "Creating admin..."

AdminUser.create!(email: 'admin@example.com', first_name: "Moha", last_name: "Bengrich", password: 'password', password_confirmation: 'password') if Rails.env.development?
