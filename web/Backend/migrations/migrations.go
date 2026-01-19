package migrations

import (
	"Diu-Wish/internal/models"

	"gorm.io/gorm"
)

func MigrateInit(db *gorm.DB) {
	db.AutoMigrate(&models.User{})
}
