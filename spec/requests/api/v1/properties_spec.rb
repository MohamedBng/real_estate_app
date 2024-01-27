require 'swagger_helper'

RSpec.describe 'Api::V1::Properties', type: :request do
  let!(:property) { create(:property) }
  let!(:id) { property.id }
  let(:json) { JSON.parse(response.body) }

  path '/api/v1/properties' do
    get('Get the list of properties') do
      tags 'Properties'
      consumes 'application/json'

      response(200, 'success') do
        run_test!

        it 'returns a property id' do |example|
          expect(json['properties'][0]['id']).to eq(property.id)
        end

        it 'returns a property city' do |example|
          expect(json['properties'][0]['city']).to eq(property.address.city)
        end

        it 'returns a property type' do |example|
          expect(json['properties'][0]['property_type']).to eq(property.property_type.humanize)
        end

        it 'returns a property status' do |example|
          expect(json['properties'][0]['status']).to eq(property.status.humanize)
        end

        it 'returns a property bedrooms count' do |example|
          expect(json['properties'][0]['bedrooms']).to eq(property.bedrooms)
        end

        it 'returns a property bathrooms count' do |example|
          expect(json['properties'][0]['bathrooms']).to eq(property.bathrooms)
        end
      end
    end
  end

  path '/api/v1/properties/{id}' do

    get('Show a property') do
      tags 'Properties'
      consumes "application/json"
      parameter name: :id, in: :path, type: :integer, description: "id"

      response(200, 'success') do
        run_test!

        it 'returns the correct property id' do |example|
          expect(json["property"]['id']).to eq(property.id)
        end

        it 'returns the correct title' do |example|
          expect(json["property"]['title']).to eq(property.title)
        end

        it 'returns the correct description' do |example|
          expect(json["property"]['description']).to eq(property.description)
        end

        it 'returns the correct price' do |example|
          expect(json["property"]['price']).to eq(property.price.to_f.to_s)
        end

        it 'returns the correct address' do |example|
          expect(json["property"]['address']).to eq(property.address.to_s)
        end

        it 'returns the correct property bedrooms count' do |example|
          expect(json["property"]['bedrooms']).to eq(property.bedrooms)
        end

        it 'returns the correct property bathrooms count' do |example|
          expect(json["property"]['bathrooms']).to eq(property.bathrooms)
        end

        it 'returns the correct property type' do |example|
          expect(json["property"]['property_type']).to eq(property.property_type)
        end

        it 'returns the correct property status' do |example|
          expect(json["property"]['status']).to eq(property.status)
        end
      end
    end
  end
end
