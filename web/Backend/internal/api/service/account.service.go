package service

import (
	"Diu-Wish/internal/api/repository"
	"Diu-Wish/internal/models"
	"context"
	"errors"
)

type AccountService struct {
	repo *repository.AccountRepository
}

func AccountServiceInit(repo *repository.AccountRepository) *AccountService {
	return &AccountService{repo}
}

func (s *AccountService) CreateDefaultAccount(userID int, ctx context.Context) error {
	newAccount := models.Account{
		UserID:         userID,
		Account_type:   "Courant",
		Balance:        0.0,
		Account_status: "Ouvert",
		Currency:       "EUR",
	}

	return s.repo.Save(newAccount, ctx)
}

func (s *AccountService) Deposit(accountID int, amount float64, ctx context.Context) error {
	if amount <= 0 {
		return errors.New("Le montant doit être positif")
	}

	errRepo := s.repo.UpdateBalance(accountID, amount, ctx)
	if errRepo != nil {
		return errRepo
	}

	return nil
}

func (s *AccountService) Withdraw(accountID int, amount float64, ctx context.Context) error {
	if amount <= 0 {
		return errors.New("Le montant doit être positif")
	}

	errRepo := s.repo.UpdateBalance(accountID, -amount, ctx)
	if errRepo != nil {
		return errRepo
	}

	return nil
}
