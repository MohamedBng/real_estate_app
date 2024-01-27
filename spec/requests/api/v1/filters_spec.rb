# spec/requests/api/v1/filters_spec.rb
require 'swagger_helper'

RSpec.describe 'Api::V1::Filters', type: :request do
  let(:json) { JSON.parse(response.body) }
  let!(:properties) { create_list(:property, 2) }
  let(:cities) { properties.map { |property| property.address.city }.uniq }

  path '/api/v1/filters' do
    get('Get property filters') do
      tags 'Filters'
      consumes 'application/json'

      response(200, 'success') do
        run_test!

        it 'returns property statuses' do
          returned_property_statuses = json['property_statuses'].map { |status| status['title'] }
          expect(returned_property_statuses).to match_array(Property.statuses.keys.map(&:humanize))
        end

        it 'returns property types' do
          returned_property_types = json['property_types'].map { |type| type['title'] }
          expect(returned_property_types).to match_array(Property.property_types.keys.map(&:humanize))
        end

        it 'returns cities' do
          returned_cities = json['cities'].map { |city| city['name'] }
          expect(returned_cities).to match_array(cities)
        end
      end
    end
  end
end
