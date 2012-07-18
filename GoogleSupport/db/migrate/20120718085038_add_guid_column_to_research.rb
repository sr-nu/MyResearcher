class AddGuidColumnToResearch < ActiveRecord::Migration
  def change
  	add_column :researches, :guid, :string
  end
end
# add guid column