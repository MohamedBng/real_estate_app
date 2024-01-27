require 'factory_bot_rails'

puts "Creating 10 properties..."


emirati_addresses = [
  { city: "Abou Dabi", street: "West Corniche Road" },
  { city: "Abou Dabi", street: "Sheikh Rashid Bin Saeed St" },
  { city: "Abou Dabi", street: "Al Ras Al Akhdar" },
  { city: "Charjah", street: "Al Meena Street" },
  { city: "Charjah", street: "Al Shuwaihean" },
  { city: "Dubaï", street: "1 Sheikh Mohammed bin Rashid Blvd" },
  { city: "Dubaï", street: "Financial Center Road" },
  { city: "Dubaï", street: "Palm Jumeirah" },
  { city: "Dubaï", street: "Dubai Miracle Garden" },
  { city: "Ajman", street: "Ajman Beach" },
  { city: "Ras el-Khaïmah", street: "Sheikh Muhammad Bin Salem Road" },
  { city: "Ras el-Khaïmah", street: "Al Jazirah Al Hamra" },
]

puts "Creating properties..."

emirati_addresses.each do |address_data|
  property = FactoryBot.create(:property, case_test: false)
  property.address.update!(city: address_data[:city], street: address_data[:street])
end

3.times { FactoryBot.create(:property, :for_sale, case_test: false) }

3.times { FactoryBot.create(:property, :for_rent, case_test: false) }

puts "Creating properties... Done!"

puts "Creating admin..."

AdminUser.create!(email: 'admin@example.com', first_name: "Moha", last_name: "Bengrich", password: 'password', password_confirmation: 'password') if Rails.env.development?
