require 'rails_helper'

RSpec.describe Admin::PropertiesController, type: :controller do
  include Devise::Test::ControllerHelpers

  before do
    @admin_user = create(:admin_user)
    sign_in @admin_user
  end

  describe 'POST #create' do
    context 'avec des paramètres valides' do
      it 'crée une nouvelle propriété' do
        post :create, params: {
          property: {
            title_fr: 'Titre FR',
            title_en: 'Title EN',
            description_fr: 'Description FR',
            description_en: 'Description EN',
            price: '100000',
            bedrooms: '2',
            bathrooms: '1',
            area: '120',
            property_type: 'maisons_de_ville',
            status: 'location'
          }
        }

        expect(Property.count).to eq(1)
      end
    end

    context 'avec des paramètres invalides' do
      it 'ne crée pas une nouvelle propriété' do
        post :create, params: {
          property: {
            title_fr: '',
            price: '100000',
            bedrooms: '2',
            bathrooms: '1',
            area: '120',
            property_type: 'maisons_de_ville',
            status: 'location'
          }
        }

        expect(Property.count).to eq(0)
      end
    end
  end

  describe 'PATCH #update' do
    let!(:property) { create(:property) }

    context 'avec des paramètres valides' do
      it 'met à jour la propriété existante' do
        patch :update, params: {
          id: property.id,
          property: {
            title_fr: 'Nouveau Titre FR',
            title_en: 'New Title EN',
            description_fr: 'Nouvelle Description FR',
            description_en: 'New Description EN',
            price: '200000',
            bedrooms: '3',
            bathrooms: '2',
            area: '150',
            property_type: 'appartement',
            status: 'vente'
          }
        }

        property.reload
        expect(property.title['fr']).to eq('Nouveau Titre FR')
        expect(property.title['en']).to eq('New Title EN')
        expect(property.description['fr']).to eq('Nouvelle Description FR')
        expect(property.description['en']).to eq('New Description EN')
        expect(property.price).to eq(200000)
        expect(property.bedrooms).to eq(3)
        expect(property.bathrooms).to eq(2)
        expect(property.area).to eq(150)
        expect(property.property_type).to eq('appartement')
        expect(property.status).to eq('vente')
      end
    end

    context 'avec des paramètres invalides' do
      it 'ne met pas à jour la propriété' do
        patch :update, params: {
          id: property.id,
          property: {
            title_fr: '',
            title_en: 'New Title EN',
            description_fr: 'Nouvelle Description FR',
            description_en: 'New Description EN',
            price: '200000',
            bedrooms: '3',
            bathrooms: '2',
            area: '150',
            property_type: 'appartement',
            status: 'vente'
          }
        }

        property.reload
        expect(property.title['fr']).not_to eq('')
      end
    end
  end
end
