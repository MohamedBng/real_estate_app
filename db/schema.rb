# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_01_08_203957) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "properties", force: :cascade do |t|
    t.jsonb "title", null: false
    t.jsonb "description", null: false
    t.decimal "price", null: false
    t.jsonb "address", null: false
    t.integer "bedrooms", null: false
    t.integer "bathrooms", null: false
    t.decimal "area", null: false
    t.integer "property_type", null: false
    t.integer "status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "property_photos", force: :cascade do |t|
    t.bigint "property_id", null: false
    t.text "file_data"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["property_id", "position"], name: "index_property_photos_on_property_id_and_position", unique: true
    t.index ["property_id"], name: "index_property_photos_on_property_id"
  end

end
