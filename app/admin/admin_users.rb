ActiveAdmin.register AdminUser do
  config.per_page = [10, 50, 100]

  permit_params :first_name, :last_name, :email, :password, :password_confirmation

  index do
    selectable_column
    id_column
    column :first_name
    column :last_name
    column :email
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    actions
  end

  filter :first_name
  filter :last_name
  filter :email
  filter :current_sign_in_at
  filter :sign_in_count
  filter :created_at

  form do |f|
    f.semantic_errors *f.object.errors.attribute_names
    f.inputs do
      f.input :first_name
      f.input :last_name
      f.input :email
    end
    f.actions
  end
end
