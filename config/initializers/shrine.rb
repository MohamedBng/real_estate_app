require "shrine"
require "shrine/storage/file_system"

Shrine.storages = {
  cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"), # temporaire
  store: Shrine::Storage::FileSystem.new("public", prefix: "uploads/store"), # permanent
}

Shrine.plugin :activerecord
Shrine.plugin :cached_attachment_data # pour conserver les données de fichier uploadé en cache
Shrine.plugin :restore_cached_data # restaure les données de fichier uploadé du cache

if Rails.env.test?
  require "shrine/storage/memory"
  Shrine.storages = {
    cache: Shrine::Storage::Memory.new,
    store: Shrine::Storage::Memory.new,
  }
end
