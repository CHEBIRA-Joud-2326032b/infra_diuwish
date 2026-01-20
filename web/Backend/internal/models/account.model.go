package models

import (
	"time"

	"gorm.io/gorm"
)

type Account struct {
	ID             int            `gorm:"primaryKey" json:"id"`
	Account_type   string         `json:"account_type"`
	Account_status string         `json:"account_status"`
	Currency       string         `json:"currency"`
	Balance        float64        `json:"balance"`
	UserID         int            `json:"user_id"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"deleted_at"`
}

type DepositInput struct {
	Amount float64 `json:"amount" binding:"required,gt=0"`
}
