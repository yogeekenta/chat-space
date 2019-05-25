# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

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
|name|string|null: false, foreign_key: true|
|email|string|null: false, foreign_key: true|

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

## chatsテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false, foreign_key: true|
|image|image|null: false, foreign_key: true|

### Association
- belongs_to :user