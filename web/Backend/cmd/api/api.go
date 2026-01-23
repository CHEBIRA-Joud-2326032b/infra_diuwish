package api

import (
	"Diu-Wish/internal/api/handlers"
	"Diu-Wish/internal/api/repository"
	"Diu-Wish/internal/api/routes"
	"Diu-Wish/internal/api/service"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func setupRouter(db *gorm.DB) *gin.Engine {
	router := gin.Default()

	// ------------Configuration CORS---------------
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowCredentials = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}

	router.Use(cors.New(config))
	// -----------------------------------------

	// ------------Account functions---------------
	accountRepository := repository.AccountRepositoryInit(db)
	accountService := service.AccountServiceInit(accountRepository)
	accountHandler := handlers.AccountHandlerInit(accountService)

	routes.SetupAccountRoutes(router, accountHandler)
	// -----------------------------------------

	// ------------User functions---------------
	userRepository := repository.UserRepositoryInit(db)
	userService := service.UserServiceInit(userRepository, accountService)
	userHandler := handlers.UserHandlerInit(userService)

	routes.SetupUserRoutes(router, userHandler)
	// -----------------------------------------

	return router
}

func ApiRun(db *gorm.DB) {
	router := setupRouter(db)

	fmt.Println("Serveur démarré sur http://localhost:8080")

	router.Run(":8080")
}
