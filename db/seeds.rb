require 'factory_bot_rails'

puts "Creating 10 properties..."

5.times do
    FactoryBot.create(:property, :for_sale)
end

5.times do
    FactoryBot.create(:property, :for_rent)
end
