require 'swagger_helper'

RSpec.describe 'Api::V1::Cities', type: :request do
  let(:json) { JSON.parse(response.body) }
  let!(:properties) { create_list(:property, 2) }
  let(:cities) { properties.map { |property| property.address.city }.uniq }

  path '/api/v1/cities' do
    get('Get the list of cities') do
      tags 'Cities'
      consumes 'application/json'

      response(200, 'success') do
        run_test!

        it 'returns a city name' do |example|
          expect(json['cities'][0]['name']).to eq(cities.first)
        end
      end
    end
  end
end
