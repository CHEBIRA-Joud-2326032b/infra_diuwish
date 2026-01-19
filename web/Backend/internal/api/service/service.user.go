package service

import (
	"Diu-Wish/internal/api/repository"
	"Diu-Wish/internal/models"
	"context"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	repo *repository.UserRepository
}

func UserServiceInit(repo repository.UserRepository) UserService {
	return UserService{&repo}
}

func (s *UserService) Register(user *models.User, ctx context.Context) error {
	hashedPassword, err := hashPassword(user.Password)
	if err != nil {
		fmt.Println("Erreur lors de la récupération du password hashé : ", err)
		return err
	}

	user.Password = hashedPassword

	errRepo := s.repo.Save(user, ctx)
	if errRepo != nil {
		return errRepo
	}

	return nil
}

func (s *UserService) Authenticate(email string, password string, ctx context.Context) (*models.User, error) {

	user, errRepo := s.repo.FindByEmail(email, ctx)
	if errRepo != nil {
		return nil, errRepo
	}

	err := comparePassword(user.Password, password)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		fmt.Println("Erreur lors du hashage du password : ", err)
		return "", err
	}

	return string(hashedPassword), nil
}

func comparePassword(hashedPassword string, password string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		fmt.Println("Erreur lors de la comparaison des password : ", err)
		return err
	}

	return nil
}
