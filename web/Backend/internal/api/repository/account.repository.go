package repository

import (
	"Diu-Wish/internal/models"
	"context"
	"errors"

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
	query := r.db.WithContext(ctx).Model(&models.Account{}).Where("id = ?", accountID)

	if amount < 0 {
		query = query.Where("balance >= ?", -amount)
	}

	result := query.UpdateColumn("balance", gorm.Expr("balance + ?", amount))

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 && amount < 0 {
		return errors.New("fonds insuffisants")
	}

	return nil
}
