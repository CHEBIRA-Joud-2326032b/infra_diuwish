package config

import (
	"fmt"
	"log"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func DatabaseInit() *gorm.DB {
	dbHost := getEnvVar("DB_HOST", "")
	dbUser := getEnvVar("DB_USER", "")
	dbPassword := getEnvVar("DB_PASSWORD", "")
	dbName := getEnvVar("DB_NAME", "")
	dbPort := getEnvVar("DB_PORT", "")
	dbSsl := getEnvVar("DB_SSL", "")
	dbTimeZone := getEnvVar("DB_TIMEZONE", "")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		dbHost, dbUser, dbPassword, dbName, dbPort, dbSsl, dbTimeZone)

	var db *gorm.DB
	var err error

	for i := range 5 {
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			return db
		}

		fmt.Printf("En attente de la DB... tentative %d/5\n", i+1)
		time.Sleep(2 * time.Second)
	}

	log.Fatal("Impossible de se connecter à la DB après 5 tentatives : ", err)
	return nil
}
