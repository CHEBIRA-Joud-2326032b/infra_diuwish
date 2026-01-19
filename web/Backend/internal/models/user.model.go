package models

import "time"

type User struct {
	ID        int       `gorm:"primaryKey" json:"id"`
	LastName  string    `json:"lastname"`
	FirstName string    `json:"firstname"`
	Email     string    `gorm:"unique" json:"email"`
	Password  string    `json:"-"`
	Phone     string    `json:"phone"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type RegisterInput struct {
	LastName  string `json:"lastname" binding:"required"`
	FirstName string `json:"firstname" binding:"required"`
	Email     string `json:"email" binding:"required,email"`
	Password  string `json:"password" binding:"required,min=8"`
	Phone     string `json:"phone" binding:"required"`
}

type LoginInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
}
