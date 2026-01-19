package main

import (
	"Diu-Wish/cmd/api"
	"Diu-Wish/internal/config"
	"Diu-Wish/migrations"
)

func main() {
	config.EnvInit()
	db := config.DatabaseInit()

	migrations.MigrateInit(db)

	api.ApiRun(db)
}
