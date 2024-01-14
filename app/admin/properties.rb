ActiveAdmin.register Property do
  actions :all

  config.per_page = [10, 50, 100]

  filter :title
  filter :status, as: :select, collection: Property.statuses.keys
  filter :property_type, as: :select, collection: Property.property_types.keys
  filter :city, as: :select, collection: Property.cities.keys

  index do
    selectable_column
    id_column
    column (I18n.locale == :fr ? :title_fr : :title_en) do |property|
      property.title[I18n.locale.to_s]
    end
    column :street do |property|
      property.address['street']
    end
    column :city do |property|
      property.address['city'].humanize
    end
    column :status do |property|
      property.status.humanize
    end
    column :property_type do |property|
      property.property_type.humanize
    end
    actions
  end

  show title: proc { |property| I18n.locale == :fr ? property.title['fr'] : property.title['en'] } do
    attributes_table do
      row :title_fr do |property|
        property.title['fr']
      end
      row :title_en do |property|
        property.title['en']
      end
      row :description_fr do |property|
        property.description['fr']
      end
      row :description_en do |property|
        property.description['en']
      end
      row :street do |property|
        property.address['street']
      end
      row :city do |property|
        property.address['city']
      end
      row :status
      row :property_type
      row :price
      row :bedrooms
      row :bathrooms
      row :area
      row :created_at
      row :updated_at
    end

    panel "Photos" do
      table_for property.property_photos.ordered do
        column :file do |photo|
          image_tag(photo.file_url(:small)) if photo.file.present?
        end
      end
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.attribute_names
    f.inputs do
      f.input :title_fr, label: 'Titre (Français)', as: :text, input_html: { name: "property[title_fr]", value: f.object.title&.[]('fr') }
      f.input :title_en, label: 'Titre (Anglais)', as: :text, input_html: { name: "property[title_en]", value: f.object.title&.[]('en') }
      f.input :description_fr, label: 'Description (Français)', as: :text , input_html: { value: f.object.description&.[]('fr') }
      f.input :description_en, label: 'Description (Anglais)', as: :text , input_html: { value: f.object.description&.[]('en') }
      f.input :street, label: 'Rue', input_html: { value: f.object.address&.[]('street') }
      f.input :city, as: :select, collection: Property.cities.keys, selected: f.object.address&.[]('city')
      f.input :price
      f.input :bedrooms
      f.input :bathrooms
      f.input :area
      f.input :property_type, as: :select, collection: Property.property_types.keys
      f.input :status, as: :select, collection: Property.statuses.keys
    end

    f.inputs 'Photos' do
      f.has_many :property_photos, allow_destroy: true, new_record: true, heading: 'Photos', sortable: :position, sortable_start: 1 do |photo|
        photo.input :file, as: :file, hint: photo.object.file.present? ? image_tag(photo.object.file_url(:small)) : content_tag(:span, 'Aucune photo pour le moment')
        photo.input :position, as: :hidden
      end
    end

    f.actions
  end

  breadcrumb do
    case params[:action]
    when 'edit'
      property = Property.find(params[:id])

      title = I18n.locale == :fr ? property.title['fr'] : property.title['en']

      [
        link_to('Admin', admin_root_path),
        link_to('Properties', admin_properties_path),
        title
      ]
    else
      [link_to('Admin', admin_root_path), 'Properties']
    end
  end

  permit_params :price, :bedrooms, :bathrooms, :area, :property_type, :status,
  :title_fr, :title_en, :description_fr, :description_en,
  :street, :city, :country, property_photos_attributes: [:id, :file, :position, :_destroy]

  controller do
    def create
      @property = Property.new(permitted_params.except(:title_fr, :title_en, :description_fr, :description_en, :street, :city, :country))
      set_custom_fields(@property, permitted_params)
      super
    end

    def edit
      @property = Property.find(params[:id])


      # Définissez le titre en fonction de la langue de l'application et des données de l'enregistrement
      @page_title = I18n.locale == :fr ? @property.title['fr'] : @property.title['en']
      render 'active_admin/resource/edit'
    end

    def update
      @property = Property.find(params[:id])
      set_custom_fields(@property, permitted_params)
      super
    end

    private

    def set_custom_fields(property, params)
      property.title = {
      'fr' => params[:title_fr],
      'en' => params[:title_en]
      }
      property.description = {
      'fr' => params[:description_fr],
      'en' => params[:description_en]
      }
      property.address = {
      'street' => params[:street],
      'city' => params[:city],
      'country' => params[:country]
      }
    end
  end
end
