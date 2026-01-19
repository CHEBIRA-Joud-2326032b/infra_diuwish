package repository

import (
	"Diu-Wish/internal/models"
	"Diu-Wish/internal/utils"
	"context"

	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func UserRepositoryInit(db *gorm.DB) UserRepository {
	return UserRepository{db: db}
}

func (r *UserRepository) Save(user *models.User, ctx context.Context) error {

	err := r.db.WithContext(ctx).Create(&user).Error

	return utils.TransformDBError(err)
}

func (r *UserRepository) FindByEmail(email string, ctx context.Context) (*models.User, error) {
	var user models.User

	err := r.db.WithContext(ctx).Where("email = ?", email).First(&user).Error

	return &user, utils.TransformDBError(err)
}
