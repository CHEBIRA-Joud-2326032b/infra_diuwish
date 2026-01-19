package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func EnvInit() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Erreur chargement du fichier .env")
	}
}

func getEnvVar(key string, defaultValue string) string {
	envVar, isPresent := os.LookupEnv(key)
	if !isPresent {
		return defaultValue
	}

	return envVar
}
