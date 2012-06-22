class ChangeSizeOfUrlString < ActiveRecord::Migration
  def up
  	change_column :researches, :bookmarks, :text
  end

  def down
  	change_column :researches, :bookmarks, :string
  end
end
