package repository

import (
	"Diu-Wish/internal/models"
	"context"

	"gorm.io/gorm"
)

type AccountRepository struct {
	db *gorm.DB
}

func AccountRepositoryInit(db *gorm.DB) *AccountRepository {
	return &AccountRepository{db}
}

func (r *AccountRepository) Save(account models.Account, ctx context.Context) error {
	err := r.db.WithContext(ctx).Create(&account).Error
	if err != nil {
		return err
	}

	return nil
}

func (r *AccountRepository) UpdateBalance(accountID int, amount float64, ctx context.Context) error {
	err := r.db.WithContext(ctx).Model(&models.Account{}).Where("id = ?", accountID).UpdateColumn("balance", gorm.Expr("balance + ?", amount)).Error
	if err != nil {
		return err
	}

	return nil
}
