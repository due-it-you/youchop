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

ActiveRecord::Schema[7.2].define(version: 2025_05_05_153044) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "beats", force: :cascade do |t|
    t.string "title", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_beats_on_user_id"
  end

  create_table "pad_timings", force: :cascade do |t|
    t.bigint "beat_id", null: false
    t.string "t_time", null: false
    t.string "y_time", null: false
    t.string "u_time", null: false
    t.string "g_time", null: false
    t.string "h_time", null: false
    t.string "j_time", null: false
    t.string "b_time", null: false
    t.string "n_time", null: false
    t.string "m_time", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["beat_id"], name: "index_pad_timings_on_beat_id"
  end

  create_table "sequencers", force: :cascade do |t|
    t.bigint "beat_id", null: false
    t.integer "bpm", null: false
    t.string "pads_assigned", null: false
    t.string "pad_active_index", null: false
    t.string "youtube_volume", null: false
    t.string "hihat_volume", null: false
    t.string "snare_volume", null: false
    t.string "kick_volume", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "hihats_active_index", default: "", null: false
    t.string "snares_active_index", default: "", null: false
    t.string "kicks_active_index", default: "", null: false
    t.index ["beat_id"], name: "index_sequencers_on_beat_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "youtubes", force: :cascade do |t|
    t.string "video_id", null: false
    t.bigint "beat_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "video_title", null: false
    t.index ["beat_id"], name: "index_youtubes_on_beat_id"
  end

  add_foreign_key "beats", "users"
  add_foreign_key "pad_timings", "beats"
  add_foreign_key "sequencers", "beats"
  add_foreign_key "youtubes", "beats"
end
