# README


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :chats

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|integer|null: false, foreign_key: true|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :chats

## chatsテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false, foreign_key: true|
|image|image|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group